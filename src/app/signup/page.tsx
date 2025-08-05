"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import logo from "@/assets/praniclogo.png"

export default function Signup() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [countryCode, setCountryCode] = useState("+91")

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    dob: "",
    age: "",
    country: "",
    state: "",
    city: "",
    username: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === "dob") {
      const age = calculateAge(value)
      setFormData((prev) => ({ ...prev, dob: value, age }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    if (name === "password" || name === "confirmPassword") {
      setPasswordError("")
    }
  }

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age.toString()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    setIsSubmitting(true)

    // Simulate registration process
    setTimeout(() => {
      const fullPhoneNumber = countryCode + formData.phoneNumber

      // Set user as authenticated after successful registration
      localStorage.setItem("userStatus", "1")
      localStorage.setItem("userEmail", formData.email)
      localStorage.setItem("userName", formData.name)
      localStorage.setItem("userPhoneNumber", fullPhoneNumber)

      // Check if there's a redirect URL stored
      const redirectUrl = localStorage.getItem("redirectAfterLogin")

      if (redirectUrl) {
        // Clear the redirect URL and navigate to intended destination
        localStorage.removeItem("redirectAfterLogin")
        router.push(redirectUrl)
      } else {
        // Default redirect to dashboard
        router.push("/dashboard")
      }

      setIsSubmitting(false)
    }, 1500)
  }

  const maxDob = new Date()
  maxDob.setDate(maxDob.getDate() - 1)
  const maxDate = maxDob.toISOString().split("T")[0]

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0095c6] to-[#4cb878] p-4">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-xl animate-fade-in p-6 space-y-6">
        <div className="flex justify-center">
          <div className="w-32 h-16 flex items-center justify-center">
            <Image src={logo || "/placeholder.svg"} alt="pranic logo" className="object-contain" priority />
          </div>
        </div>

        <h2 className="text-gray-700 text-xl font-semibold text-center">Registration</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Info Section */}
          <h3 className="text-sm font-semibold text-gray-600">Personal Info</h3>
          <InputField
            name="name"
            label="Name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />

          {/* Mobile Number with Country Code */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-700">
              Mobile Number
            </label>
            <div className="flex">
              <select
                name="countryCode"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                aria-label="Select country code"
                required
                className="w-24 px-2 py-2 border border-gray-300 rounded-l-md bg-white text-gray-900 text-sm shadow-sm
        focus:outline-none focus:ring-2 focus:ring-[#4ead91] focus:border-[#4ead91] transition"
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+61">+61</option>
                <option value="+81">+81</option>
              </select>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your mobile number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="flex-grow px-3 py-2 border border-gray-300 rounded-r-md text-gray-900 text-sm placeholder-gray-400 shadow-sm
        focus:outline-none focus:ring-2 focus:ring-[#4ead91] focus:border-[#4ead91] transition"
              />
            </div>
          </div>

          <InputField
            name="email"
            type="email"
            label="Email Id"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="flex gap-4">
            <InputField
              name="dob"
              label="Date of Birth"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              max={maxDate}
            />
            <InputField name="age" label="Age" value={formData.age} readOnly />
          </div>

          {/* Location Section */}
          <h3 className="text-sm font-semibold text-gray-600">Location</h3>
          <InputField
            name="country"
            label="Country"
            placeholder="Enter your country"
            value={formData.country}
            onChange={handleChange}
          />
          <InputField
            name="state"
            label="State"
            placeholder="Enter your state"
            value={formData.state}
            onChange={handleChange}
          />
          <InputField
            name="city"
            label="City"
            placeholder="Enter your city"
            value={formData.city}
            onChange={handleChange}
          />

          {/* Create Account Section */}
          <h3 className="text-sm font-semibold text-gray-600">Create Account</h3>
          <InputField
            name="username"
            label="Username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
          />
          <PasswordField
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            show={showPassword}
            setShow={setShowPassword}
          />
          <PasswordField
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            show={showConfirmPassword}
            setShow={setShowConfirmPassword}
          />

          {passwordError && <div className="text-red-500 text-sm">{passwordError}</div>}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-br from-[#0095c6] to-[#4cb878] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Creating Account..." : "Submit"}
          </button>
        </form>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-6 rounded-full bg-gray-100 p-1">
          <Link
            href="/login"
            className="w-1/2 text-center py-2 text-sm font-semibold rounded-full text-gray-600 hover:bg-gray-200 transition"
          >
            Login
          </Link>
          <button className="w-1/2 text-center py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-[#0095c6] to-[#4cb878] text-white shadow">
            Register
          </button>
        </div>
      </div>
    </main>
  )
}

// Reusable Input Field
function InputField({
  name,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  readOnly = false,
  max,
}: {
  name: string
  label: string
  placeholder?: string
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  readOnly?: boolean
  max?: string
}) {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        max={max}
        readOnly={readOnly}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4ead91] focus:border-transparent text-sm text-gray-800 placeholder-gray-400"
        required={!readOnly}
      />
    </div>
  )
}

// Reusable Password Field
function PasswordField({
  name,
  label,
  placeholder,
  value,
  onChange,
  show,
  setShow,
}: {
  name: string
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  show: boolean
  setShow: (val: boolean) => void
}) {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4ead91] focus:border-transparent text-sm text-gray-800 placeholder-gray-400"
          required
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute top-2 right-3 text-gray-400"
          tabIndex={-1}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  )
}
