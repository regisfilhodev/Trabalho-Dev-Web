import styled from 'styled-components'

export const CardContainer = styled.div`
  height: 20rem;
  max-width: 16rem;

  div:first-child {
    flex: 1;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 7.5rem;
      height: 7.5rem;
      z-index: 2;
      margin-top: 5rem;
      position: absolute;
    }
  }

  > div:last-child {
    max-height: 19.375rem;
    z-index: 1;
    height: 100%;
    max-width: 100%;

    padding: 4.5rem 1.5rem 1.25rem;
    flex-wrap: wrap;
    border-radius: 6px 36px 6px 36px;
    background: ${(props) => props.theme['gray-200']};

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  @media (max-width: 530px) {
    height: 18rem;
    max-width: 14rem;
    > div:last-child {
      padding: 6rem 0.8rem 0.8rem;
    }
  }
  @media (max-width: 480px) {
    height: 18rem;
    max-width: 13rem;
    > div:last-child {
      padding: 5rem 0.7rem 0.7rem;
    }
  }
`

export const InfoProduct = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.3;
  > label {
    display: inline-block;
    flex-wrap: wrap;
    margin-bottom: 1rem;

    > span {
      padding: 4px 8px;
      border-radius: 100px;

      background: ${(props) => props.theme['yellow-300']};
      color: ${(props) => props.theme['yellow-700']};

      font-size: 0.625rem;
      font-weight: 700;
    }
  }
  > h4 {
    font-family: 'Baloo 2', sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme['gray-800']};
  }
  > p {
    font-size: 0.875rem;
    text-align: center;
    color: ${(props) => props.theme['gray-600']};
  }
`
export const SelectProduct = styled.div`
  max-width: 13.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  small {
    font-size: 0.875rem;

    span {
      font-size: 1.5rem;
      font-family: 'Baloo 2', sans-serif;
      font-weight: 700;
      line-height: 1.3;
    }
  }
  @media (max-width: 480px) {
    small {
      font-size: 0.6rem;
      span {
        font-size: 1rem;
      }
    }
  }
`
export const ControlAmountProduct = styled.div`
  display: inline-flex;
  justify-content: space-between;

  > div {
    max-width: 4.5rem;
    margin-right: 0.5rem;
    border-radius: 6px;
    background: ${(props) => props.theme['gray-400']};

    > button {
      width: 1.97rem;
      background: ${(props) => props.theme['gray-400']};
      color: ${(props) => props.theme['purple-500']};

      border: none;

      display: inline-flex;
      justify-content: center;

      &:hover {
        color: ${(props) => props.theme['purple-700']};
      }
    }
  }

  > button {
    height: 2.375rem;
    width: 2.375rem;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${(props) => props.theme['purple-700']};
    color: ${(props) => props.theme['gray-100']};

    border: none;
    border-radius: 6px;

    transition: background ease-in 0.2s;

    &:hover {
      background: ${(props) => props.theme['purple-500']};
    }
  }
  @media (max-width: 480px) {
    > div {
      > button {
        width: 1.8rem;
      }
    }
    > button {
      height: 1.8rem;
      width: 1.8rem;
      svg {
        height: 14px;
        width: 14px;
      }
    }
  }
`
