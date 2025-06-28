import styled from 'styled-components'

export const PurchaseCompletedComponent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: row;

  > div {
    h3 {
      color: ${(props) => props.theme['yellow-700']};
      font-family: 'Baloo 2', sans-serif;
      font-size: 2rem;
      font-weight: 800;
      line-height: 1.3;
    }

    > span {
      font-size: 1.25rem;
      line-height: 1.3;
    }

    > div {
      margin-top: 2.5rem;

      display: flex;
      align-items: space-between;
      flex-direction: column;

      border-radius: 6px 36px;
      border: 1px solid transparent;
      background:
        linear-gradient(
            ${(props) => props.theme['gray-100']},
            ${(props) => props.theme['gray-100']}
          )
          padding-box,
        linear-gradient(
            to right,
            ${(props) => props.theme['yellow-500']},
            ${(props) => props.theme['purple-500']}
          )
          border-box;

      padding: 2.5rem;
    }

    > div > div {
      display: inline-flex;
      align-items: center;
    }

    > div > div + div {
      margin-top: 2rem;
    }

    > div > div > div:first-child {
      width: 2rem;
      height: 2rem;
      margin-right: 0.75rem;

      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 999px;

      background: ${(props) => props.theme['purple-500']};
      color: ${(props) => props.theme['gray-100']};

      svg {
        width: 1rem;
        height: 1rem;
      }
    }

    > div > div > div:last-child {
      display: flex;
      flex-direction: column;
    }

    > div > div:nth-child(2) > div:first-child {
      background: ${(props) => props.theme['yellow-500']};
    }

    > div > div:nth-child(3) > div:first-child {
      background: ${(props) => props.theme['yellow-700']};
    }
  }

  img {
    margin-bottom: -1rem;
    display: flex;
    align-self: flex-end;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    margin-bottom: 0;

    img {
      margin-top: 1.25rem;
      align-self: center;
      width: 32rem;
      height: auto;
    }
  }

  @media (max-width: 480px) {
    img {
      width: 20rem;
      height: auto;
    }
  }
`
