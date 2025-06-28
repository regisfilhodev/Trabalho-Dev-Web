import styled from 'styled-components'

export const PresentationContainer = styled.div`
  display: flex;
  justify-content: space-between;

  > div:first-child {
    display: flex;
    flex-direction: column;

    align-items: space-between;

    h1 {
      font-family: 'Baloo 2', sans-serif;
      font-size: 3rem;
      font-weight: 800;
      line-height: 1.3;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.25rem;
      line-height: 1.3;
      margin-bottom: 4.125rem;
    }
  }
  img {
    width: 29.75rem;
    object-fit: contain;
  }

  @media (max-width: 1100px) {
    img {
      width: 0;
      height: 0;
      overflow: hidden;
    }
  }
`
export const PresentationBackground = styled.div`
  width: 100%;
  height: 530px;

  position: absolute;
  left: 0;
  margin-top: -4rem;

  background-image: url('/src/assets/imgs/background-presentation.png');
  background-size: contain;

  filter: blur(4px);

  @media (max-width: 1080px) {
    height: 400px;
  }
  @media (max-width: 480px) {
    height: 530px;
  }
  @media (max-width: 400px) {
    height: 430px;
  }
  @media (max-width: 365px) {
    height: 530px;
  }
`

export const PresentationItems = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.2rem;

  > div {
    display: inline-flex;
    align-items: center;

    span {
      margin-left: 4px;
      line-height: 1.3;
    }
  }

  div + div {
    margin: 1rem 0.5rem 0.5rem 0;
  }

  > div > span {
    align-self: center;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));

    div {
      span {
        margin-left: 8px;
        font-size: 1.2rem;
      }
    }
  }
`
