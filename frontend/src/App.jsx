import React from 'react'
import Home from './components/Home'
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import PageNotFound from './components/PageNotFound'
import { Toaster } from 'react-hot-toast'

function App() {
  const token = localStorage.getItem('jwt')
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000, // 👈 5 seconds before toast disappears
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            fontSize: '15px',
          },
          success: {
            style: {
              background: '#16a34a', // green
              color: '#fff',
            },
          },
          error: {
            style: {
              background: '#dc2626', // red
              color: '#fff',
            },
          },
        }}
      />
      <Routes>
        <Route path='/' element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
