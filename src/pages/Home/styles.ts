import styled from 'styled-components'

export const HomeContainer = styled.div`
  h2 {
    margin-top: 4rem;

    font-family: 'Baloo 2', sans-serif;
    font-size: 2rem;
  }
`
export const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  grid-row-gap: 1.25rem;
  grid-column-gap: 2rem;
  place-items: center;
  margin-top: 2.2rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    grid-row-gap: 1rem;
    grid-column-gap: 1rem;
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
    grid-row-gap: 3rem;
    grid-column-gap: 0.5rem;
  }
`
