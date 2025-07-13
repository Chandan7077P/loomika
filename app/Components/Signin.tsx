import { SignInButton } from '@clerk/nextjs'
import React from 'react'

const Signin = () => {
  return (
    <SignInButton mode='modal'>
      <button className='text-sm font-semibold '>Login</button>
    </SignInButton>
  )
}

export default Signin
