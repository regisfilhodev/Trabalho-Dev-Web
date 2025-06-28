import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { useProducts } from '../../hooks/useProducts'

import { FormPayment } from './components/FormPayment'
import { ProductSelected } from './components/ProductSelected'

import { PaymentContainer, TotalComponent } from './styles'
import { formatPriceWithType } from '../../util/format'
import { useNavigate } from 'react-router-dom'

const shippingAddressFormValidationSchema = zod.object({
  cep: zod
    .string({
      required_error: 'O CEP é obrigatório',
      invalid_type_error: 'O CEP é obrigatório',
    })
    .min(1, 'Informe o cep')
    .max(10, 'Cep Invalido'),
  street: zod
    .string({
      required_error: 'A rua é obrigatória',
      invalid_type_error: 'A rua é obrigatória',
    })
    .min(1, 'Informe o cep'),
  numberHouse: zod
    .number({
      required_error: 'O numero é obrigatória',
      invalid_type_error: 'O numero é obrigatória',
    })
    .min(1, 'Numero invalido')
    .max(5000, 'Numero invalido')
    .int()
    .positive(),
  complement: zod
    .string({
      required_error: 'O conteudo deve ser em texto',
      invalid_type_error: 'O conteudo deve ser em texto',
    })
    .optional(),
  district: zod
    .string({
      required_error: 'O bairro é obrigatório',
      invalid_type_error: 'O bairro é obrigatório',
    })
    .min(1, 'Informe o bairro'),
  city: zod
    .string({
      required_error: 'O cidade é obrigatória',
      invalid_type_error: 'O cidade deve ser em texto',
    })
    .min(1, 'Informe a cidade'),
  uf: zod
    .string({
      required_error: 'O estado é obrigatório',
      invalid_type_error: 'O estado deve ser em texto',
    })
    .min(2, 'Informe o cep')
    .max(2, 'Cep Invalido'),
  payment: zod.enum(['creditCard', 'debitCard', 'money']),
})

export type ShippingAddressFormData = zod.infer<
  typeof shippingAddressFormValidationSchema
>

export function PaymentScreen() {
  const {
    coffeeList,
    shoppingCart,
    totalPayment,
    registerNewOrder,
    calcTotalPayment,
  } = useProducts()

  const shippingAddressForm = useForm<ShippingAddressFormData>({
    resolver: zodResolver(shippingAddressFormValidationSchema),
    defaultValues: {
      cep: '',
      street: '',
      complement: '',
      district: '',
      city: '',
      uf: '',
    },
  })

  const { handleSubmit, reset } = shippingAddressForm
  const navigate = useNavigate()

  useEffect(() => {
    console.log('PaymentScreen carregada')
    console.log('shoppingCart:', shoppingCart)
    console.log('coffeeList:', coffeeList)
    
    if (shoppingCart.length > 0 && coffeeList.length > 0) {
      calcTotalPayment()
    }
  }, [coffeeList, shoppingCart, calcTotalPayment])

  function handleRegisterNewOrder(data: ShippingAddressFormData) {
    console.log('Registrando pedido:', data)
    if (data) {
      registerNewOrder(data)
      reset()
    }
  }

  const frete = 3.5
  const totalWithFrete = totalPayment + frete

  const formatValue = (value: number) => formatPriceWithType(value)

  // Verificar se o carrinho está vazio
  if (shoppingCart.length === 0) {
    return (
      <div style={{ 
        padding: '4rem 2rem', 
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
        borderRadius: '8px',
        margin: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          background: '#fff',
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem',
            color: '#8B5A3C'
          }}>
            ☕
          </div>
          <h2 style={{
            color: '#2D3748',
            marginBottom: '1rem',
            fontSize: '1.5rem',
            fontWeight: '600'
          }}>
            Carrinho vazio
          </h2>
          <p style={{
            color: '#718096',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Parece que você ainda não adicionou nenhum café ao carrinho. 
            Que tal experimentar nossos deliciosos cafés?
          </p>
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
            🛒 Explorar Cafés
          </button>
        </div>
      </div>
    )
  }

  return (
    <PaymentContainer onSubmit={handleSubmit(handleRegisterNewOrder)} action="">
      <FormProvider {...shippingAddressForm}>
        <FormPayment />
      </FormProvider>
      <div>
        <h1>Cafés selecionados</h1>
        <div>
          {shoppingCart.map((product) => (
            <ProductSelected
              key={product.coffeeId}
              shoppingCartData={product}
            />
          ))}
          <TotalComponent>
            <div>
              <span>Total de itens</span>
              <span>{formatValue(totalPayment)}</span>
            </div>
            <div>
              <span>Entrega</span>
              <span>{formatValue(frete)}</span>
            </div>
            <div>
              <span>Total</span>
              <span>{formatValue(totalWithFrete)}</span>
            </div>
            <button type="submit">CONFIRMAR PEDIDO</button>
          </TotalComponent>
        </div>
      </div>
    </PaymentContainer>
  )
}
