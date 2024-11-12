import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='flex min-h-screen w-full justify-center'>
      {/* admin sidebar */}
      <h1>admin page</h1>
      <div className='flex m-10 '>
        {/* admin header*/}
              <main>
                  <Outlet/>
              </main>
      </div>
    </div>
  )
}

export default AdminLayout