import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div>
      <div className='flex justify-center '>
       <h1> WELCOME TO THE CAMPUS-CART</h1>
       <h2>FAST,EFFECTIVE,CREATIVE</h2>
      <h2>--Just order--</h2>
      </div>

      <div className='flex'>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout