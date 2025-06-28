import { Minus, Plus, ShoppingCart } from 'phosphor-react'
import {
  CardContainer,
  ControlAmountProduct,
  InfoProduct,
  SelectProduct,
} from './styles'
import { Coffee } from '../../../../@types/globalTypes'
import { useState } from 'react'
import { useProducts } from '../../../../hooks/useProducts'
import { formatPriceWithoutType } from '../../../../util/format'

interface CardProductProps {
  product: Coffee
}

export function CardProduct({ product }: CardProductProps) {
  const { handleSetShoppingCart } = useProducts()
  const [qtde, setQtde] = useState<number>(1)

  function handleSetQtdeProduct(typeOperation: 'add' | 'remove') {
    if (typeOperation === 'add') {
      setQtde((state) => state + 1)
    }
    if (typeOperation === 'remove') {
      if (qtde > 1) setQtde((state) => state - 1)
    }
  }

  return (
    <CardContainer>
      <div>
        <img src={product.coffee_image} alt="" />
      </div>
      <div>
        <InfoProduct>
          <label>
            {[...product.type].map((typeName: string) => (
              <span key={typeName}>{typeName.toString().toUpperCase()}</span>
            ))}
          </label>
          <h4>{product.name}</h4>
          <p>{product.description}</p>
        </InfoProduct>
        <SelectProduct>
          <small>
            R$ <span>{formatPriceWithoutType(product.value)}</span>
          </small>
          <ControlAmountProduct>
            <div>
              <button onClick={() => handleSetQtdeProduct('remove')}>
                <Minus />
              </button>
              <span>{qtde}</span>
              <button onClick={() => handleSetQtdeProduct('add')}>
                <Plus />
              </button>
            </div>
            <button
              onClick={() =>
                handleSetShoppingCart({ coffeeId: product.id, qtde })
              }
            >
              <ShoppingCart size={18} weight="fill" />
            </button>
          </ControlAmountProduct>
        </SelectProduct>
      </div>
    </CardContainer>
  )
}
