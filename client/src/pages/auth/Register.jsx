import React from 'react'
import Forms from '../../components/Common/Forms'
import { ToastContainer } from 'react-toastify'

const Register = () => {
  return (
    <div>
        <ToastContainer />
      <Forms formType="signup"/>
      {/* <h1></h1> */}
    </div>
  )
}

export default Register