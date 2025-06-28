import styled from 'styled-components'

export const PaymentContainer = styled.form`
  display: flex;
  align-items: flex-start;
  justify-content: center;

  h1 {
    font-family: 'Baloo 2', sans-serif;
    font-size: 1.125rem;
    line-height: 1.3;
    font-weight: 700;
  }

  > div:first-child {
    width: 40rem;
    margin-right: 2rem;
    border-radius: 6px;
  }

  div:first-child > div {
    background: ${(props) => props.theme['gray-200']};
    border-radius: 6px;
    margin-top: 0.75rem;
  }

  > div:first-child > div:first-child {
    min-height: 23.25rem;
  }

  > div:first-child > div:last-child {
    min-height: 12.9375rem;
    margin-bottom: 2rem;
  }

  > div:last-child {
    width: 28rem;
  }

  > div:last-child > div {
    margin-top: 0.75rem;
    padding: 2.5rem;
    border-radius: 6px 44px 6px 44px;
    background: ${(props) => props.theme['gray-200']};
  }
  @media (max-width: 950px) {
    flex-direction: column;
    align-items: center;

    > div:first-child {
      width: 100%;
    }
    > div:last-child {
      width: 100%;
    }
  }
  @media (max-width: 550px) {
    > div:last-child > div {
      padding: 1rem;
    }
  }
`
export const TotalComponent = styled.div`
  display: flex;
  flex-direction: column;

  font-size: 0.875rem;
  line-height: 1.3;

  > div {
    display: inline-flex;
    justify-content: space-between;
    > span:last-child {
      font-size: 1rem;
    }
  }

  > div:nth-child(3) {
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    font-weight: 700;
    color: ${(props) => props.theme['gray-800']};

    > span {
      font-size: 1.25rem;
    }
  }
  > div + div {
    margin-top: 12px;
  }

  button {
    height: 2.875rem;
    background: ${(props) => props.theme['yellow-500']};
    color: ${(props) => props.theme.white};
    border: none;
    border-radius: 6px;

    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.6;

    transition: background ease-in 0.2s;

    &:hover {
      background: ${(props) => props.theme['yellow-700']};
    }
    @media (max-width: 550px) {
      margin-bottom: 0.7rem;
    }
  }
`
