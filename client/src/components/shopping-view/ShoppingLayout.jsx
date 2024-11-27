import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from './ShoppingHeader'
import HeroComponent from './HeroComponent'

const  ShoppingLayout = () => {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
      {/* common header */}
      {/* <ShoppingHeader/> */}
      <HeroComponent/>
      <main className='flex flex-col'>
          <Outlet/>
      </main>
    </div>
  )
}

export default ShoppingLayout