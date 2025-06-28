import styled from 'styled-components'

export const LayoutContainer = styled.div`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;

  padding: 0.8rem 2.5rem;

  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    padding: 0.8rem 1rem;
  }
  @media (max-width: 480px) {
    padding: 0.8rem 0.5rem;
  }
`
