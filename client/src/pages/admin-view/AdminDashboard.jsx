import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react'
import Charts from '../../components/admin-view/Charts';

const AdminDashboard = () => {

  const [users,setusers]=useState([]);
  const getusers=async()=>{
    const usersdata= await axios.get("http://localhost:3000/admin");

    setusers(usersdata.data.users);
    console.log(usersdata.data.users);
    
  }
  useEffect(()=>{
    getusers();
  },[])

  return (
    <div>

      <div className='grid grid-cols-3 w-full text-white gap-3 items-center'>
          <div className='col-span-1 bg-blue-600'>
            <div className='h-[200px] w-[250px] rounded-full flex'>
                  <h1>Total Users</h1>
            </div>
          </div>
          <div className='col-span-1 bg-black'>
            <div className='h-[200px] w-[250px] rounded-full flex'>
                  <h1>Total Users</h1>
            </div>
          </div>
          <div className='col-span-1 bg-black'>
            <div className='h-[200px] w-[250px] rounded-full flex'>
                  <h1>Total Users</h1>
            </div>
          </div>      
      </div>

      <div>

        <h1 className='text-4xl'>Users List</h1>
        <table>
          {
            users.map((user, index)=>{
              return(
                <tr key={index}>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.createdAt}</td>
                <td><button>Delete</button></td>
              </tr>
              )
})
          }
        </table>
      </div>
      <Charts/>
    </div>
  )
}

export default AdminDashboard