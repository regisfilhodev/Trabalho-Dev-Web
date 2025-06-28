import { useEffect, useState } from 'react'
import { HeadTitleComponent } from '../../components/HeadTitleComponent'
import { useProducts } from '../../hooks/useProducts'
import { CardProduct } from './components/CardProduct'
import { PresentationComponent } from './components/PresentationComponent'
import { HomeContainer, ProductsContainer } from './styles'

export function Home() {
  const { coffeeList } = useProducts()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (coffeeList.length > 0) {
        setLoading(false)
        setError(false)
      } else {
        setLoading(false)
        setError(true)
      }
    }, 2000) // Aguarda 2 segundos para carregar

    return () => clearTimeout(timer)
  }, [coffeeList])

  return (
    <HomeContainer>
      <HeadTitleComponent title="Home" />
      <PresentationComponent />
      <h2>Nossos cafés</h2>
      <ProductsContainer>
        {!loading && !error && coffeeList.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
        {loading &&
          <div className='containerLoader'>
            <span className="loader"></span>
            <span className="loader"></span>
            <span className="loader"></span>
          </div>
        }
        {error && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Erro ao carregar os cafés. Tente recarregar a página.</p>
            <button onClick={() => window.location.reload()}>
              Recarregar
            </button>
          </div>
        )}
      </ProductsContainer>
    </HomeContainer>
  )
}
