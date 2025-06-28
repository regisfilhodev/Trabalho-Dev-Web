import styled from 'styled-components'

export const HeaderContainer = styled.header`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 5.875rem;

  div {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
  }
  > div > div:nth-child(2),
  > div > div:nth-child(3) {
    position: absolute;
    top: 1.4rem;
    margin-right: -9px;

    font-size: 0.75rem;
    font-weight: 700;
    border-radius: 999px;

    height: 20px;
    width: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${(props) => props.theme['yellow-700']};
    color: ${(props) => props.theme['gray-100']};

    @media (max-width: 480px) {
      top: 0.8rem;
      margin-right: -8px;
    }
  }
`

export const LocationContainer = styled.div`
  min-width: 100px;
  height: 38px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-right: 10px;
  padding: 10px 8px;
  font-size: 0.9rem;

  background: ${(props) => props.theme['purple-300']};
  color: ${(props) => props.theme['purple-700']};
  border: none;
  border-radius: 8px;

  span + span {
    margin-left: 10px;
  }
  > svg {
    color: ${(props) => props.theme['purple-500']};
    margin-right: 4px;
  }
`

export const CartButtom = styled.button`
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${(props) => props.theme['yellow-300']};
  color: ${(props) => props.theme['yellow-700']};

  border: none;
  border-radius: 8px;
`
