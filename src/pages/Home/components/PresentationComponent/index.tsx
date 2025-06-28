import { PresentationIcon } from '../PresentationIcon'
import {
  PresentationBackground,
  PresentationContainer,
  PresentationItems,
} from './styles'
import { Coffee, Package, ShoppingCart, Timer } from 'phosphor-react'

export function PresentationComponent() {
  return (
    <>
      <PresentationBackground />
      <PresentationContainer>
        <div>
          <h1>Encontre o café perfeito para qualquer hora do dia</h1>
          <p>
            Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
            hora
          </p>
          <PresentationItems>
            <div>
              <PresentationIcon backgroundColor="yellowDark">
                <ShoppingCart size={18} weight="fill" />
              </PresentationIcon>
              <span>Compra simples e segura</span>
            </div>
            <div>
              <PresentationIcon backgroundColor="gray">
                <Package size={18} weight="fill" />
              </PresentationIcon>
              <span>Embalagem mantém o café intacto</span>
            </div>
            <div>
              <PresentationIcon backgroundColor="yellow">
                <Timer size={18} weight="fill" />
              </PresentationIcon>
              <span>Entrega rápida e rastreada</span>
            </div>
            <div>
              <PresentationIcon backgroundColor="purple">
                <Coffee size={18} weight="fill" />
              </PresentationIcon>
              <span>O café chega fresquinho até você</span>
            </div>
          </PresentationItems>
        </div>
        <img src="https://i.ibb.co/sVLNBdJ/main-coffee-image.png" alt="" />
      </PresentationContainer>
    </>
  )
}
