import React from 'react'
import LoginPage from '../pages/LoginPage'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import DataContaxt from '../contaxtApi/DataContaxt'

const App = () => {
  return (
    <DataContaxt>
      <Header />
      <Outlet />
    </DataContaxt>
  )
}

export default App