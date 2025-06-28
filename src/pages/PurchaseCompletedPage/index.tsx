import { MapPin, Timer, CurrencyDollar } from 'phosphor-react'
import illustration from '../../assets/imgs/illustration.png'
import { PurchaseCompletedComponent } from './styles'
import { useProducts } from '../../hooks/useProducts'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const TYPE_PAYMENT = {
  creditCard: 'Cartão de Crédito',
  debitCard: 'Cartão de Debito',
  money: 'Dinheiro',
} as const

export function PurchaseCompletedPage() {
  const { shoppingCart, address } = useProducts()

  const navigate = useNavigate()

  useEffect(() => {
    if (
      (shoppingCart.length > 0 &&
        location.pathname === '/purchase-completed') ||
      !address
    ) {
      navigate('/')
    }
  }, [location.pathname])

  if (!address) {
    return <div />
  }

  return (
    <PurchaseCompletedComponent>
      <div>
        <h3>Uhu! Pedido confirmado</h3>
        <span>Agora é só aguardar que logo o café chegará até você</span>
        <div>
          <div>
            <div>
              <MapPin weight="fill" />
            </div>
            <div>
              <span>
                Entrega em{' '}
                <strong>
                  Rua {address.street}, {address.numberHouse}
                </strong>
              </span>
              <span>
                {address.district} - {address.city}, {address.uf}
              </span>
            </div>
          </div>
          <div>
            <div>
              <Timer weight="fill" />
            </div>
            <div>
              <span>Previsão de entrega</span>
              <strong>20 min - 30 min</strong>
            </div>
          </div>
          <div>
            <div>
              <CurrencyDollar weight="fill" />
            </div>
            <div>
              <span>Pagamento na entrega</span>
              <strong>{TYPE_PAYMENT[address.payment]}</strong>
            </div>
          </div>
        </div>
      </div>
      <img src={illustration} alt="" />
    </PurchaseCompletedComponent>
  )
}
