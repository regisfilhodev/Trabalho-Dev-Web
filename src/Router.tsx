import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { DefaultLayout } from './layouts/DefaultLayout'
import { PaymentScreen } from './pages/PaymentScreen'
import { PurchaseCompletedPage } from './pages/PurchaseCompletedPage'
import { ProtectedRoute } from './components/ProtectedRoute'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route 
          path="/payment" 
          element={
            <ProtectedRoute>
              <PaymentScreen />
            </ProtectedRoute>
          } 
        />
        <Route path="/purchase-completed" element={<PurchaseCompletedPage />} />
      </Route>
    </Routes>
  )
}
