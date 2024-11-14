import React from 'react'

const AdminHeader = () => {
  return (
    <div className='flex justify-between items-center px-6 py-1'>
      <div>
        <h1>ADMIN DASHBOARD</h1>
      </div>

      <div>
        <button className='bg-black text-white px-5 py-2 rounded-xl'>Logout</button>
      </div>
    </div>
  )
}

export default AdminHeader