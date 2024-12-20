import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/auth-slice'
import { useNavigate } from 'react-router-dom'


const AdminHeader = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handlelogout=async ()=>{
    const loggedIn=await axios.get("https://campuscart-campus-cart.up.railway.app/auth/logout")
    console.log(loggedIn); 
    dispatch(logout())
    navigate("/") 
  }  
  return (
    <div className='flex justify-between items-center px-6 py-1'>
      <div>
        <h1>ADMIN DASHBOARD</h1>
      </div>

      <div>
        <button className='bg-black text-white px-5 py-2 rounded-xl' onClick={handlelogout}>Logout</button>
      </div>
    </div>
  )
}

export default AdminHeader