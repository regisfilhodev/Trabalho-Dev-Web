import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { Router } from './Router'

import { ProductsProvider } from './context/ProductsContext'

import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <HelmetProvider>
        <BrowserRouter>
          <ProductsProvider>
            <Router />
          </ProductsProvider>
        </BrowserRouter>
      </HelmetProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
