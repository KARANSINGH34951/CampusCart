import React from 'react'
import Forms from '../../components/Common/forms'
import { ToastContainer } from 'react-toastify'

const Register = () => {
  return (
    <div>
        <ToastContainer />
      <Forms formType="signup"/>
    </div>
  )
}

export default Register