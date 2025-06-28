import { createContext, ReactNode, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { api } from '../service/api'
import { useNavigate } from 'react-router-dom'
import { Coffee } from '../@types/globalTypes'
import { ShippingAddressFormData } from '../pages/PaymentScreen'

interface ShoppingCart {
  coffeeId: number
  qtde: number
  typeOperation?: 'add' | 'remove'
}
interface ShoppingCartFormated {
  id: number
  name: string
  coffee_image: string
  qtde: number
  value: number
}
interface FinalShoppingList {
  finalShoppingList: ShoppingCartFormated[]
  total: number
}
interface ProductsContextData {
  coffeeList: Coffee[]
  shoppingCart: ShoppingCart[]
  totalPayment: number
  address: ShippingAddressFormData | null
  handleSetShoppingCart: (product: ShoppingCart) => void
  handleRemoveItemShoppingCart: (product: ShoppingCart) => void
  calcTotalPayment: () => void
  setTotalPayment: (totalPayment: number) => void
  setTotalPurchase: (value: number, qtde: number) => void
  registerNewOrder: (data: ShippingAddressFormData) => void
}

interface ProductsProviderProps {
  children: ReactNode
}

export const ProductsContext = createContext({} as ProductsContextData)

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [coffeeList, setCoffeeList] = useState<Coffee[]>([])
  const [totalPayment, setTotalPayment] = useState<number>(0)
  const [address, setAddress] = useState<ShippingAddressFormData | null>(null)
  const [productOrder, setProductOrder] = useState<FinalShoppingList | null>(
    null,
  )
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart[]>(() => {
    const storagedCart = localStorage.getItem(
      '@coffee-delivery:shopping-cart-coffee-1.0.0',
    )

    if (storagedCart) {
      return JSON.parse(storagedCart)
    }

    return []
  })

  const navigate = useNavigate()

  useEffect(() => {
    const stateJSON = JSON.stringify(shoppingCart)

    localStorage.setItem(
      '@coffee-delivery:shopping-cart-coffee-1.0.0',
      stateJSON,
    )
  }, [shoppingCart])

  async function getProductList() {
    const response = await api.get(`/products`)
    setCoffeeList(response.data)
    console.log(response)
  }
  function handleSetShoppingCart(product: ShoppingCart) {
    const checkItem = shoppingCart.find(
      (productItem) => productItem.coffeeId === product.coffeeId,
    )

    if (checkItem !== undefined) {
      const productFiltredList: ShoppingCart[] = shoppingCart.filter(
        (productItem) => productItem.coffeeId !== product.coffeeId,
      )

      setShoppingCart([
        ...productFiltredList,
        {
          coffeeId: product.coffeeId,
          qtde:
            product.typeOperation === 'remove'
              ? checkItem.qtde - product.qtde
              : checkItem.qtde + product.qtde,
        },
      ])
    } else {
      setShoppingCart((state) => [...state, product])
    }
  }

  function handleRemoveItemShoppingCart(product: ShoppingCart) {
    const checkItem = shoppingCart.find(
      (productItem) => productItem.coffeeId === product.coffeeId,
    )
    if (checkItem !== undefined) {
      const productFiltredList: ShoppingCart[] = shoppingCart.filter(
        (productItem) => productItem.coffeeId !== product.coffeeId,
      )

      setShoppingCart(productFiltredList)
    }
  }
  function setTotalPurchase({ value, qtde }: any) {
    setTotalPayment((state: number) => {
      return state + value * qtde
    })
  }

  function calcTotalPayment() {
    let listProductsInCart: ShoppingCartFormated[] = []

    for (const i in coffeeList) {
      const product = coffeeList[i]
      for (const j in shoppingCart) {
        const productCartRegister = shoppingCart[j]
        if (Number(productCartRegister.coffeeId) === Number(product.id)) {
          listProductsInCart = [
            ...listProductsInCart,
            {
              id: Number(product.id),
              name: product.name,
              coffee_image: product.coffee_image,
              value: product.value,
              qtde: productCartRegister.qtde,
            },
          ]
        }
      }
    }

    const total = listProductsInCart.reduce((acumulador, valorAtual) => {
      const unitProduct = valorAtual.value * valorAtual.qtde
      return acumulador + unitProduct
    }, 0)

    setProductOrder({
      finalShoppingList: listProductsInCart,
      total,
    })
    setTotalPayment(total)
  }

  async function registerNewOrder(data: ShippingAddressFormData) {
    const formatedData = {
      id: uuidv4(),
      destination: {
        cep: data.cep,
        street: data.street,
        numberHouse: data.numberHouse,
        complement: data.complement,
        district: data.district,
        city: data.city,
        uf: data.uf,
      },
      productOrder,
      payment: data.payment,
    }

    await api.post('/shoppingRegistred', formatedData)
    localStorage.setItem(
      '@coffee-delivery:shopping-cart-coffee-1.0.0',
      JSON.stringify([]),
    )
    setShoppingCart([])
    setAddress(data)
    navigate('/purchase-completed')
  }

  useEffect(() => {
    getProductList()
  }, [])

  return (
    <ProductsContext.Provider
      value={{
        coffeeList,
        shoppingCart,
        totalPayment,
        address,
        handleSetShoppingCart,
        handleRemoveItemShoppingCart,
        registerNewOrder,
        calcTotalPayment,
        setTotalPayment,
        setTotalPurchase,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
