// import { useEffect } from 'react'
// import { useState } from 'react'
// import { io } from 'socket.io-client'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import AdminPage from './components/AdminPage'

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<HomePage />}
        />
        <Route
          path='/admin'
          element={<AdminPage />}
        />
        <Route
          path='/login'
          element={<LoginPage />}
        />
        {/* <Route
        path='/register'
        element={<RegisterPage />}
      /> */}
      </Routes>
      <Toaster
        position='top-center'
        reverseOrder={false}
      />
    </>
  )
}
export default App
