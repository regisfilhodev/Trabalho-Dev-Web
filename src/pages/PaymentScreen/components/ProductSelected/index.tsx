import { Minus, Plus, Trash } from 'phosphor-react'
import { ControlAmountProduct, ProductSelectedContainer } from './styles'
import { useProducts } from '../../../../hooks/useProducts'
import { Coffee } from '../../../../@types/globalTypes'
import { formatPriceWithType } from '../../../../util/format'

interface ProductSelectedProps {
  shoppingCartData: {
    coffeeId: string
    qtde: number
  }
}

export function ProductSelected({ shoppingCartData }: ProductSelectedProps) {
  const { coffeeList, handleSetShoppingCart, handleRemoveItemShoppingCart } =
    useProducts()

  const productCart = shoppingCartData

  // Encontrar o produto correspondente
  const product = coffeeList.find(
    (productItem: Coffee) => productItem.id === productCart.coffeeId
  )

  console.log('ProductSelected renderizando:', {
    productCart,
    product,
    coffeeListLength: coffeeList.length,
    availableIds: coffeeList.map(c => c.id),
    searchingForId: productCart.coffeeId
  })

  if (!product) {
    return (
      <ProductSelectedContainer>
        <div style={{ padding: '1rem', textAlign: 'center' }}>
          <p>Produto não encontrado (ID: {productCart.coffeeId})</p>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>
            IDs disponíveis: {coffeeList.map(c => c.id).join(', ')}
          </p>
        </div>
      </ProductSelectedContainer>
    )
  }

  return (
    <ProductSelectedContainer>
      <img src={product.coffee_image} alt={product.name} />
      <div>
        <div>
          <span>{product.name}</span>
          <div>
            <ControlAmountProduct>
              <button
                type="button"
                onClick={() =>
                  handleSetShoppingCart({
                    coffeeId: productCart.coffeeId,
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
                    coffeeId: productCart.coffeeId,
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
        <span>{formatPriceWithType(product.value)}</span>
      </div>
    </ProductSelectedContainer>
  )
}
