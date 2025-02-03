import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Input } from "../components/Input"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { toast } from "react-hot-toast"
import { Eye, EyeOff } from "lucide-react"
import type React from "react" // Added import for React

export const Signup = () => {
  const usernameRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      navigate("/dashboard")
    }
  }, [navigate])

  async function signup(e: React.FormEvent) {
    e.preventDefault()
    const username = usernameRef.current?.value
    const password = passwordRef.current?.value

    if (!username || !password) {
      toast.error("Please fill in all fields")
      return
    }

    try {
      await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        username,
        password,
      })

      toast.success("Account created successfully!")
      navigate("/signin")
    } catch (error) {
      toast.error("Error creating account. Username might be taken.")
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center min-h-[90vh] w-[90%] mx-auto"
      >
        <motion.div
          className="bg-gray-800 p-10 rounded-lg shadow-2xl w-96"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Sign Up</h1>
          <form onSubmit={signup} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">
                Username
              </label>
              <Input
                id="username"
                placeholder="Enter your username"
                ref={usernameRef}
                className="w-full bg-gray-700 text-white"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="Enter your password"
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-gray-700 text-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <button 
                      onClick={() => { navigate('/signin')}} 
                      className="relative mt-2 ml-2 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden md:text-lg font-semibold rounded-lg group 
                              bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 
                              hover:from-pink-500 hover:via-purple-500 hover:to-purple-600 
                              transition-all duration-300 ease-in-out 
                              transform hover:scale-105
                              shadow-lg hover:shadow-xl"
                  >
                      <span className="relative px-2 py-1 transition-all ease-in duration-200 
                                    rounded-md bg-gray-800
                                    group-hover:bg-opacity-0 
                                    flex items-center gap-2 text-white">
                          Sign Up
                      </span>
                  </button>
            </div>
          </form>
          <p className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Sign In
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

