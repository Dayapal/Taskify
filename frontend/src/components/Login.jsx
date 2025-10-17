import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'


const Login = ({setToken}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:4002/user/login', {
        email,
        password
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      })
      toast.success(data.message || "Login successfully")
        localStorage.setItem('jwt', data.user.token)
      setToken(data.user.token) // <-- update state so App re-renders
      console.log(data)
    
      console.log(data)
      setEmail("");
      setPassword("");
      navigate('/')

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.errors || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login Page</h2>
        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-5">
          Create a new account?{' '}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
