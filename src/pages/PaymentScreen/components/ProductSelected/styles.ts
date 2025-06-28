import styled from 'styled-components'

export const ProductSelectedContainer = styled.div`
  width: 100%;
  margin-bottom: 4rem;

  display: flex;
  align-items: center;
  flex-direction: row;

  > img {
    width: 4rem;
    height: 4rem;
    margin-right: 1.25rem;
  }

  > div {
    width: 100%;
    display: inline-flex;

    justify-content: space-between;

    font-size: 1rem;
    line-height: 1.3;

    > span {
      min-width: fit-content;
      font-weight: 700;
    }
  }

  > div > div {
    max-height: 5rem;
    width: 100%;

    display: flex;
    align-items: flex-start;
    flex-direction: column;

    > div {
      display: inline-flex;
    }

    > div > button {
      height: 2rem;
      padding: 0 8px;

      display: flex;
      align-items: center;
      justify-content: center;

      background: ${(props) => props.theme['gray-400']};
      color: ${(props) => props.theme['gray-700']};

      border: none;
      border-radius: 6px;

      font-size: 0.75rem;
      line-height: 1.6;

      transition: filter ease 0.2s;

      svg {
        margin-right: 4px;
        color: ${(props) => props.theme['purple-500']};
      }
      &:hover {
        filter: brightness(0.95);
      }
    }
  }
  @media (max-width: 380px) {
    margin-top: 1rem;
    > img {
      width: 2.5rem;
      height: 2.5rem;
      margin-right: 0.5rem;
    }
  }
`
export const ControlAmountProduct = styled.div`
  height: 2rem;
  max-width: 4.5rem;
  margin-right: 0.5rem;
  border-radius: 6px;
  background: ${(props) => props.theme['gray-400']};

  display: flex;
  justify-content: center;
  align-items: center;

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
`
