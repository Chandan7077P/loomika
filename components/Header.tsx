import React from 'react'
import Container from './Container'
import Logo from './Logo'
import HeaderMenu from './HeaderMenu'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import FavouriteButton from './FavouriteButton'
import Signin from './Signin'
import MobileMenu from './MobileMenu'

const Header = () => {
  return (
    <header className='bg-white py-5 border-b border-b-black/20'>
      <Container className='flex items-center justify-between'>
        <div className='w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0'>
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className='flex items-center gap-5 ml-auto'>
          <SearchBar />
          <FavouriteButton />
          <CartIcon />
          <Signin />
        </div>
      </Container>
    </header>
  )
}

export default Header
