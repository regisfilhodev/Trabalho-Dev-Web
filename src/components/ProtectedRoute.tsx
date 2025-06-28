import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { shoppingCart } = useProducts()
  const navigate = useNavigate()

  useEffect(() => {
    if (shoppingCart.length === 0) {
      // Redirecionar para home se carrinho estiver vazio
      navigate('/', { replace: true })
    }
  }, [shoppingCart.length, navigate])

  // Se carrinho estiver vazio, não renderizar nada (será redirecionado)
  if (shoppingCart.length === 0) {
    return null
  }

  return <>{children}</>
} 