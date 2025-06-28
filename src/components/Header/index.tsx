import axios from 'axios'
import { useEffect, useState } from 'react'
import logoWritted from '../../assets/imgs/logo-coffee-delivery-writted.svg'
import { CartButtom, HeaderContainer, LocationContainer } from './styles'
import { MapPin, ShoppingCart } from 'phosphor-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'

interface LocationType {
  lat: number
  lon: number
}

interface AddressType {
  city: number
  state: number
}

export function Header() {
  const { shoppingCart } = useProducts()
  const [location, setLocation] = useState<LocationType | null>(null)
  const [addressLocation, setAddressLocation] = useState<AddressType | null>(
    null,
  )
  const navigate = useNavigate()

  async function getPermisionAndLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords
      setLocation({
        lat: latitude,
        lon: longitude,
      })
    })
  }

  async function getAddress() {
    if (location) {
      await axios
        .get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lon}
          `,
        )
        .then((res: any) => {
          const { town, state } = res.data.address

          setAddressLocation({
            city: town,
            state,
          })
        })
        .catch(() => setAddressLocation((state) => state))
    }
  }

  useEffect(() => {
    getPermisionAndLocation()
  }, [])

  useEffect(() => {
    if (location) {
      getAddress()
    }
  }, [location])

  function handleShoppingCartLink() {
    if (shoppingCart.length > 0) {
      navigate('/payment')
    }
  }

  return (
    <HeaderContainer>
      <NavLink to="/">
        <img src={logoWritted} alt="" />
      </NavLink>
      <div>
        {!!addressLocation && (
          <LocationContainer>
            <MapPin size={22} weight="fill" />
            <span>{addressLocation.city}, </span>
            <span>{addressLocation.state}</span>
          </LocationContainer>
        )}

        <CartButtom onClick={handleShoppingCartLink}>
          <ShoppingCart size={22} weight="fill" />
        </CartButtom>
        {shoppingCart.length > 0 && (
          <div>
            <span>{shoppingCart.length}</span>
          </div>
        )}
      </div>
    </HeaderContainer>
  )
}
