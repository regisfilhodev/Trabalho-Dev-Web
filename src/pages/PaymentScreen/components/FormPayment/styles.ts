import styled, { css } from 'styled-components'

export const ICON_COLOR = {
  yellow: 'yellow-700',
  purple: 'purple-500',
} as const

interface TypeProps {
  typePaymentSelected: string
  typePayment: 'creditCard' | 'debitCard' | 'money'
}

export interface ColorIconProps {
  color: keyof typeof ICON_COLOR
}

export const FormContainer = styled.div`
  width: 100%;
  margin: 0 auto;

  > div {
    padding: 2.5rem;
  }

  input::placeholder {
    color: ${(props) => props.theme['gray-600']};
  }

  input {
    height: 2.625rem;
    width: 100%;
    margin-bottom: 5px;
    padding: 12px;
    border-radius: 4px;

    background: ${(props) => props.theme['gray-300']};
    border: 2px solid ${(props) => props.theme['gray-400']};

    &:focus {
      border: 2px solid ${(props) => props.theme['yellow-700']};
    }
  }

  > div > div {
    display: flex;
    flex-direction: row;
  }

  > div > div > div + div {
    margin-left: 12px;
  }

  > div > div:nth-child(5) > div:last-child,
  > div > div:nth-child(6) > div:last-child {
    width: 100%;

    input {
      width: 100%;
    }
  }

  > div > div:nth-child(4) > div:last-child,
  > div > div:nth-child(7) > div:last-child {
    width: 100%;
    display: flex;
    flex-direction: column;

    input {
      width: 100%;
    }
  }

  span {
    font-size: 0.8rem;
  }

  > div > span + input,
  > div > input + input {
    margin-top: 16px;
  }

  > div > input + span {
    color: #db1313;
  }

  > div:last-child > div:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;

    gap: 12px;
    margin-bottom: 10px;
  }

  > div:last-child > span {
    color: #db1313;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  > div > span {
    margin: 5px;
  }
  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  @media (min-width: 550px) {
    input:first-child {
      width: 12.5rem;
    }
  }
  @media (max-width: 550px) {
    > div > div:not(:first-child, :nth-child(2)) {
      flex-direction: column;
    }
    > div > div > div + div {
      margin-left: 0;
    }
    > input {
      width: 100%;
    }
    > div:last-child > div:last-child {
      display: flex;
      flex-direction: column;
    }
  }
`

export const InputComponent = styled.div`
  display: block;
  width: min-content;

  margin-top: 16px;
  span {
    color: #db1313;
  }
  input {
    width: 100%;
  }
  > span {
    margin: 5px;
  }
  @media (max-width: 550px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`

export const HeaderForm = styled.div<ColorIconProps>`
  display: flex;
  padding-bottom: 2rem;
  color: ${(props) => props.theme['gray-800']};

  svg {
    color: ${(props) => props.theme[ICON_COLOR[props.color]]};
    font-size: 1.25rem;
    margin-right: 8px;
  }

  p {
    display: flex;
    flex-direction: column;
    line-height: 1.3;

    span:first-child {
      font-size: 1rem;
    }
    span:last-child {
      font-size: 0.875rem;
    }
  }
`

export const ButtonTypePayment = styled.button<TypeProps>`
  height: 3.1875rem;
  width: 100%;
  padding: 1rem;

  background: ${(props) => props.theme['gray-400']};
  border: none;
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  font-size: 0.75rem;
  text-transform: uppercase;
  line-height: 1.6;

  svg {
    margin-right: 12px;
    width: 18px;
    height: 18px;
    color: ${(props) => props.theme['purple-500']};
  }

  span {
    margin-top: 10px;
    border: 1px solid red;
  }
  transition: background ease 0.1s;

  &:hover {
    background: ${(props) => props.theme['gray-500']};
  }

  ${({ typePayment, typePaymentSelected }) =>
    typePaymentSelected === typePayment &&
    css`
      background: ${(props) => props.theme['purple-300']};
      border: 1px solid ${(props) => props.theme['purple-500']};
      &:hover {
        background: ${(props) => props.theme['purple-300']};
      }
    `};
`
