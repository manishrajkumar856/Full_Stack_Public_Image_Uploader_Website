import React from 'react'
import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm'

const LoginPage = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center bg-[#44424288] backdrop-blur-2xl absolute top-0 left-0'>
        <div className='w-full h-full  px-10 py-3 bg-red-200 flex justify-center items-center fixed z-100'>
          <LoginForm />
        </div>
    </div>
  )
}

export default LoginPage