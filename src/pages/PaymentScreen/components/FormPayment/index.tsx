import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import {
  ButtonTypePayment,
  FormContainer,
  HeaderForm,
  InputComponent,
} from './styles'
import {
  MapPinLine,
  CurrencyDollar,
  CreditCard,
  Bank,
  Money,
} from 'phosphor-react'
import axios from 'axios'

export function FormPayment() {
  const [typePaymentSelected, setTypePaymentSelected] = useState<string>('')
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext()

  const cepFilled = watch('cep')

  async function searchCepInfoLocation(text: string) {
    const cepSplitFormated = text.split('-')
    const cepFormated = cepSplitFormated.join('').toString()

    await axios
      .get(`https://viacep.com.br/ws/${cepFormated}/json`)
      .then((resp) => {
        const data = resp.data
        setValue('cep', data.cep)
        setValue('street', data.logradouro)
        setValue('district', data.bairro)
        setValue('city', data.localidade)
        setValue('uf', data.uf)
      })
  }

  useEffect(() => {
    if (cepFilled && cepFilled.length > 0) {
      searchCepInfoLocation(cepFilled)
    }
  }, [cepFilled])

  useEffect(() => {
    if (typePaymentSelected === 'creditCard') {
      setValue('payment', 'creditCard')
    }
    if (typePaymentSelected === 'debitCard') {
      setValue('payment', 'debitCard')
    }
    if (typePaymentSelected === 'money') {
      setValue('payment', 'money')
    }
  }, [typePaymentSelected])

  return (
    <FormContainer>
      <h1>Complete seu pedido</h1>
      <div>
        <HeaderForm color="yellow">
          <MapPinLine />
          <p>
            <span>Endereço de Entrega</span>
            <span>Informe o endereço onde deseja receber seu pedido</span>
          </p>
        </HeaderForm>
        <input id="cep" type="text" placeholder="CEP" {...register('cep')} />
        <ErrorMessage
          errors={errors}
          name="cep"
          render={({ message }) => <span>{message}</span>}
        />
        <input
          id="street"
          type="text"
          placeholder="Rua"
          {...register('street')}
        />
        <ErrorMessage
          errors={errors}
          name="street"
          render={({ message }) => <span>{message}</span>}
        />
        <div>
          <InputComponent>
            <input
              id="numberHouse"
              type="number"
              placeholder="Número"
              {...register('numberHouse', { valueAsNumber: true })}
            />
            <ErrorMessage
              errors={errors}
              name="numberHouse"
              render={({ message }) => <span>{message}</span>}
            />
          </InputComponent>
          <InputComponent>
            <input
              id="complement"
              type="text"
              placeholder="Complemento"
              {...register('complement')}
            />
            <ErrorMessage
              errors={errors}
              name="complement"
              render={({ message }) => <span>{message}</span>}
            />
          </InputComponent>
        </div>
        <div>
          <InputComponent>
            <input
              id="district"
              type="text"
              placeholder="Bairro"
              {...register('district')}
            />
            <ErrorMessage
              errors={errors}
              name="district"
              render={({ message }) => <span>{message}</span>}
            />
          </InputComponent>
          <InputComponent>
            <input
              id="city"
              type="text"
              placeholder="Cidade"
              {...register('city')}
            />
            <ErrorMessage
              errors={errors}
              name="city"
              render={({ message }) => <span>{message}</span>}
            />
          </InputComponent>
          <InputComponent>
            <input id="uf" type="text" placeholder="UF" {...register('uf')} />
            <ErrorMessage
              errors={errors}
              name="uf"
              render={({ message }) => <span>{message}</span>}
            />
          </InputComponent>
        </div>
      </div>
      <div>
        <HeaderForm color="purple">
          <CurrencyDollar />
          <p>
            <span>Pagamento</span>
            <span>
              O pagamento é feito na entrega. Escolha a forma que deseja pagar
            </span>
          </p>
        </HeaderForm>
        <div>
          <ButtonTypePayment
            type="button"
            typePaymentSelected={`${typePaymentSelected}`}
            typePayment="creditCard"
            id="payment"
            {...register('payment')}
            onClick={() => setTypePaymentSelected('creditCard')}
          >
            <CreditCard />
            CARTÃO DE CREDITO
          </ButtonTypePayment>
          <ButtonTypePayment
            type="button"
            typePaymentSelected={typePaymentSelected}
            typePayment="debitCard"
            {...register('payment')}
            onClick={() => setTypePaymentSelected('debitCard')}
          >
            <Bank />
            CARTÃO DE DEBITO
          </ButtonTypePayment>
          <ButtonTypePayment
            type="button"
            typePaymentSelected={typePaymentSelected}
            typePayment="money"
            {...register('payment')}
            onClick={() => setTypePaymentSelected('money')}
          >
            <Money />
            DINHEIRO
          </ButtonTypePayment>
        </div>
        <ErrorMessage
          errors={errors}
          name="payment"
          render={({ message }) => <span>{message}</span>}
        />
      </div>
    </FormContainer>
  )
}
