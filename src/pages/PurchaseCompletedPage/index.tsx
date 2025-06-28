import { MapPin, Timer, CurrencyDollar, CheckCircle } from 'phosphor-react'
import illustration from '../../assets/imgs/illustration.png'
import { PurchaseCompletedComponent } from './styles'
import { useProducts } from '../../hooks/useProducts'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const TYPE_PAYMENT = {
  creditCard: 'Cartão de Crédito',
  debitCard: 'Cartão de Débito',
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
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.25rem'
        }}>
          <CheckCircle size={32} weight="fill" color="#4CAF50" />
          <h3>Uhu! Pedido confirmado</h3>
        </div>
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
        
        {/* Botão para voltar à loja */}
        <div style={{
          marginTop: '2rem',
          textAlign: 'center'
        }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'linear-gradient(135deg, #8B5A3C 0%, #A0522D 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(139, 90, 60, 0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 90, 60, 0.4)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 90, 60, 0.3)'
            }}
          >
            🛒 Fazer Novo Pedido
          </button>
        </div>
      </div>
      <img src={illustration} alt="" />
    </PurchaseCompletedComponent>
  )
}
