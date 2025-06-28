import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: none;
  }

  html {
  @media (max-width: 1080px) {
    font-size: 93.75%; //15px
  }
  @media (max-width: 720px) {
    font-size: 87.5%; //14px
  }
  @media (max-width: 450px) {
    font-size: 75%; //12px
  }
}

  body {
    background: ${(props) => props.theme["gray-100"]};
    color: ${(props) => props.theme["gray-700"]};
    -webkit-font-smoothing: antialiased;
    padding: 1rem;

    @media (max-width: 480px) {
      padding: 0.5rem;
    }
  }

  body,
  input,
  textarea,
  button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }
  .containerLoader{
    max-width: 300px;
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    .loader {
      width: 45px;
      height: 50px;
      display: inline-block;
      position: relative;
      border: 4px solid #222;
      box-sizing: border-box;
      animation: fill 3s linear infinite alternate;
      color: rgba(87, 39, 39, 0.9);
      border-radius: 0 0 4px 4px;
    }
    .loader::after {
      content: '';  
      box-sizing: border-box;
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border: 4px solid #222;
      width: 16px;
      height: 30px;
      border-radius: 0 4px 4px 0;
    }


    @keyframes fill {
      0% {
        box-shadow: 0 0  inset;
      }
      100% {
        box-shadow: 0 -48px inset;
      }
    } 

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }


`;
