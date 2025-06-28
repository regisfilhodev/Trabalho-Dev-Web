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
    } else {
      // Feedback visual quando carrinho está vazio
      const cartButton = document.querySelector('[data-cart-button]') as HTMLElement
      if (cartButton) {
        cartButton.style.transform = 'scale(0.95)'
        cartButton.style.backgroundColor = '#ff6b6b'
        setTimeout(() => {
          cartButton.style.transform = 'scale(1)'
          cartButton.style.backgroundColor = ''
        }, 200)
      }
      
      // Mostrar tooltip temporário
      const tooltip = document.createElement('div')
      tooltip.textContent = 'Adicione produtos ao carrinho primeiro!'
      tooltip.style.cssText = `
        position: absolute;
        top: 100%;
        right: 0;
        background: #2d3748;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 1000;
        margin-top: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        animation: fadeIn 0.3s ease;
      `
      
      const cartContainer = document.querySelector('[data-cart-container]')
      if (cartContainer) {
        cartContainer.style.position = 'relative'
        cartContainer.appendChild(tooltip)
        
        setTimeout(() => {
          tooltip.remove()
        }, 3000)
      }
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

        <CartButtom onClick={handleShoppingCartLink} data-cart-button>
          <ShoppingCart size={22} weight="fill" />
        </CartButtom>
        {shoppingCart.length > 0 && (
          <div data-cart-container>
            <span>{shoppingCart.length}</span>
          </div>
        )}
      </div>
    </HeaderContainer>
  )
}
