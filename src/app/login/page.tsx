"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import logo from "@/assets/praniclogo.png"

export default function Login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate login process
    setTimeout(() => {
      // Set user as authenticated
      localStorage.setItem("userStatus", "1")
      localStorage.setItem("userEmail", formData.email)

      // Check if there's a redirect URL stored
      const redirectUrl = localStorage.getItem("redirectAfterLogin")

      if (redirectUrl) {
        // Clear the redirect URL and navigate to intended destination
        localStorage.removeItem("redirectAfterLogin")
        router.push(redirectUrl)
      } else {
        // Default redirect to dashboard
        router.push("/healings")
      }

      setIsLoading(false)
    }, 1500)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0095c6] to-[#4cb878] p-4">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-xl">
        {/* Logo Section */}
        <div className="relative h-48 flex items-center justify-center">
          <div className="w-40 h-40 flex items-center justify-center">
            <Image src={logo || "/placeholder.svg"} alt="pranic logo" className="object-contain" priority />
          </div>
          <div className="absolute bottom-0 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
              <path
                fill="#ffffff"
                fillOpacity="1"
                d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,197.3C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-8 pt-4">
          <div className="flex justify-center mb-6 rounded-full bg-gray-100 p-1">
            <button className="w-1/2 text-center py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-[#0095c6] to-[#4cb878] text-white shadow">
              Login
            </button>
            <Link
              href="/signup"
              className="w-1/2 text-center py-2 text-sm font-semibold rounded-full text-gray-600 hover:bg-gray-200 transition"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Login Form */}
        <div className="px-8 pb-12 flex flex-col">
          <form onSubmit={handleSubmit} className="w-full">
            {error && <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">{error}</div>}

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4cb878]"
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4cb878]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 accent-purple-500"
                />
                <label htmlFor="remember" className="ml-2 text-gray-400 text-sm">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-gray-400 text-sm">
                Forget password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-br from-[#0095c6] to-[#4cb878] text-white py-3 rounded-full font-medium mb-4 hover:opacity-90 transition-opacity ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
