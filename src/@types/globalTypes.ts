import { ShippingAddressFormData } from '../pages/PaymentScreen'

export interface Coffee {
  id: string
  name: string
  type: string[]
  coffee_image: string
  description: string
  value: number
}
export interface ProductItemOrdered {
  productId: number
  name: string
  qtde: number
  value: number
  frete: number
  total: number
  localDestination: ShippingAddressFormData
}
