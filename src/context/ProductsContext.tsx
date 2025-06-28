import { createContext, ReactNode, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { Coffee } from '../@types/globalTypes'
import { ShippingAddressFormData } from '../pages/PaymentScreen'
import { api } from '../service/api'

interface ShoppingCart {
  coffeeId: string
  qtde: number
  typeOperation?: 'add' | 'remove'
}
interface ShoppingCartFormated {
  id: string
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
    try {
      console.log('🔄 Carregando produtos da API...')
      const response = await api.get('/coffees')
      if (response.data && response.data.coffees) {
        setCoffeeList(response.data.coffees)
        console.log('✅ Produtos carregados do banco:', response.data.coffees.length, 'cafés')
        console.log('📋 IDs dos produtos:', response.data.coffees.map((c: any) => c.id))
      } else {
        console.error('❌ Resposta da API não contém dados válidos:', response.data)
        setCoffeeList([])
      }
    } catch (error) {
      console.error('❌ Erro ao carregar produtos:', error)
      setCoffeeList([])
    }
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
        // Comparação direta de strings
        if (productCartRegister.coffeeId === product.id) {
          listProductsInCart = [
            ...listProductsInCart,
            {
              id: product.id,
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

  async function getCoffeeById(id: string): Promise<Coffee | null> {
    try {
      const response = await api.get(`/coffees/${id}`)
      return response.data.coffee
    } catch (error) {
      console.error('Erro ao buscar produto por ID:', error)
      return null
    }
  }

  async function registerNewOrder(data: ShippingAddressFormData) {
    console.log('🔄 Registrando novo pedido...')
    
    if (!productOrder) {
      console.error('❌ Nenhum produto no carrinho')
      return
    }

    const orderData = {
      destination: {
        cep: data.cep,
        street: data.street,
        numberHouse: data.numberHouse,
        complement: data.complement,
        district: data.district,
        city: data.city,
        uf: data.uf,
      },
      payment: data.payment,
      total: productOrder.total,
      items: productOrder.finalShoppingList.map((item) => ({
        quantity: item.qtde,
        value: item.value,
        productId: item.id
      }))
    }

    try {
      console.log('📦 Dados do pedido:', orderData)
      await api.post('/orders', orderData)
      
      console.log('✅ Pedido registrado com sucesso!')
      console.log('🧹 Limpando carrinho...')
      
      // Limpar carrinho
      localStorage.setItem(
        '@coffee-delivery:shopping-cart-coffee-1.0.0',
        JSON.stringify([]),
      )
      setShoppingCart([])
      setAddress(data)
      
      console.log('🎉 Redirecionando para confirmação...')
      navigate('/purchase-completed')
    } catch (error) {
      console.error('❌ Erro ao registrar pedido:', error)
      alert('Erro ao registrar pedido. Tente novamente.')
    }
  }

  useEffect(() => {
    getProductList()
  }, [])

  // Limpar carrinho quando produtos são carregados (para evitar IDs desatualizados)
  useEffect(() => {
    if (coffeeList.length > 0) {
      // Verificar se há itens no carrinho com IDs que não existem mais
      const validIds = coffeeList.map(coffee => coffee.id)
      const currentCart = JSON.parse(localStorage.getItem('@coffee-delivery:shopping-cart-coffee-1.0.0') || '[]')
      
      // Tentar migrar IDs antigos (numéricos) para novos IDs CUID
      const migratedCart = currentCart.map((item: any) => {
        // Se o ID é numérico, tentar mapear para o ID CUID correspondente
        if (/^\d+$/.test(item.coffeeId)) {
          const numericId = parseInt(item.coffeeId) - 1 // IDs antigos começavam em 1
          if (numericId >= 0 && numericId < coffeeList.length) {
            console.log(`🔄 Migrando ID ${item.coffeeId} para ${coffeeList[numericId].id}`)
            return { ...item, coffeeId: coffeeList[numericId].id }
          }
        }
        return item
      })
      
      const hasInvalidItems = migratedCart.some((item: any) => !validIds.includes(item.coffeeId))
      
      if (hasInvalidItems) {
        console.log('❌ Carrinho contém IDs inválidos, limpando...')
        setShoppingCart([])
        localStorage.setItem(
          '@coffee-delivery:shopping-cart-coffee-1.0.0',
          JSON.stringify([])
        )
      } else if (JSON.stringify(currentCart) !== JSON.stringify(migratedCart)) {
        console.log('✅ IDs migrados com sucesso:', migratedCart)
        setShoppingCart(migratedCart)
        localStorage.setItem(
          '@coffee-delivery:shopping-cart-coffee-1.0.0',
          JSON.stringify(migratedCart)
        )
      }
    }
  }, [coffeeList]) // Removido shoppingCart da dependência para evitar loop

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
