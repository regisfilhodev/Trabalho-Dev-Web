import { useEffect, useState } from 'react'
import { HeadTitleComponent } from '../../components/HeadTitleComponent'
import { useProducts } from '../../hooks/useProducts'
import { CardProduct } from './components/CardProduct'
import { PresentationComponent } from './components/PresentationComponent'
import { HomeContainer, ProductsContainer } from './styles'

export function Home() {
  const { coffeeList } = useProducts()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (coffeeList.length !== 0) {
      setLoading(false)
    }
  }, [coffeeList])
  return (
    <HomeContainer>
      <HeadTitleComponent title="Home" />
      <PresentationComponent />
      <h2>Nossos cafés</h2>
      <ProductsContainer>
        {!loading && coffeeList.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
        {loading &&
          <div className='containerLoader'>
            <span className="loader"></span>
            <span className="loader"></span>
            <span className="loader"></span>
          </div>
        }
      </ProductsContainer>
    </HomeContainer>
  )
}
