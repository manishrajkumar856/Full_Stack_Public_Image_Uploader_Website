import React, { useContext } from 'react'
import { DataContaxtProvider } from '../contaxtApi/DataContaxt'

const LogoutContainer = () => {
   const {logoutUser} =  useContext(DataContaxtProvider);
  return (
    <div className='absolute top-15  right-0 bg-[#e2acacc4] px-5 py-5 rounded-2xl backdrop-blur-2xl'>
        <h3 className='whitespace-nowrap text-[0.8em] mb-3 font-semibold'>Logout User</h3>
        <button onClick={logoutUser} className='active:scale-95 bg-[#68b4ee] px-5 py-2 rounded-2xl text-[0.7em] text-[#ffff]'>Logout</button>
    </div>
  )
}

export default LogoutContainer