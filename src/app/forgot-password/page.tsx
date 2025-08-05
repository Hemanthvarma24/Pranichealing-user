"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import logo from "@/assets/praniclogo.png"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate password reset request
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-400 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-xl">
        <div className="relative h-36 flex items-center justify-center">
          <Link
            href="/login"
            className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white"
          >
            <ChevronLeft size={20} />
          </Link>

          <div className="w-32 h-32 flex items-center justify-center">
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

        <div className="px-8 pt-2 pb-8 flex flex-col">
          <h2 className="text-gray-700 text-2xl font-medium mb-4 text-center">Forgot Password</h2>

          {!isSubmitted ? (
            <>
              <p className="text-gray-500 text-sm text-center mb-6">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-6">
                  <div className="bg-gray-100 rounded-xl px-4 py-3">
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent outline-none text-gray-600 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-full font-medium mb-4 hover:opacity-90 transition-opacity ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">Check Your Email</h3>
              <p className="text-gray-500 mb-6">
                We've sent a password reset link to
                <br />
                <span className="font-medium">{email}</span>
              </p>
              <Link href="/login" className="text-purple-600 font-medium">
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
