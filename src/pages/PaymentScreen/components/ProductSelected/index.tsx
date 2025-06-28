import { Minus, Plus, Trash } from 'phosphor-react'
import { ControlAmountProduct, ProductSelectedContainer } from './styles'
import { useProducts } from '../../../../hooks/useProducts'
import { Coffee } from '../../../../@types/globalTypes'
import { formatPriceWithType } from '../../../../util/format'

interface ProductSelectedProps {
  shoppingCartData: {
    coffeeId: number
    qtde: number
  }
}

export function ProductSelected(shoppingCartData: ProductSelectedProps) {
  const { coffeeList, handleSetShoppingCart, handleRemoveItemShoppingCart } =
    useProducts()

  const productCart = shoppingCartData.shoppingCartData

  const product = coffeeList.filter(
    (productItem: Coffee) =>
      Number(productItem.id) === productCart.coffeeId && {
        id: productItem.id,
        name: productItem.name,
        coffee_image: productItem.coffee_image,
        value: productItem.value,
        qtde: productCart.qtde,
      },
  )

  return (
    <ProductSelectedContainer>
      {!!product && product.length > 0 && (
        <>
          <img src={product[0].coffee_image} alt="" />
          <div>
            <div>
              <span>{product[0].name}</span>
              <div>
                <ControlAmountProduct>
                  <button
                    type="button"
                    onClick={() =>
                      handleSetShoppingCart({
                        coffeeId: Number(productCart.coffeeId),
                        qtde: 1,
                        typeOperation: 'remove',
                      })
                    }
                  >
                    <Minus />
                  </button>
                  <span>{productCart.qtde}</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleSetShoppingCart({
                        coffeeId: Number(productCart.coffeeId),
                        qtde: 1,
                        typeOperation: 'add',
                      })
                    }
                  >
                    <Plus />
                  </button>
                </ControlAmountProduct>
                <button
                  onClick={() => handleRemoveItemShoppingCart(productCart)}
                >
                  <Trash size={16} />
                  REMOVER
                </button>
              </div>
            </div>
            <span>{formatPriceWithType(product[0].value)}</span>
          </div>
        </>
      )}
    </ProductSelectedContainer>
  )
}
