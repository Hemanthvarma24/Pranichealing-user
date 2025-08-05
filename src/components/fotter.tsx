"use client"

import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Calendar, Stethoscope, User } from "lucide-react"

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const userStatus = localStorage.getItem("userStatus")
      setIsAuthenticated(userStatus === "1" || userStatus === "0")
    }

    checkAuth()
    const handleStorageChange = () => checkAuth()

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [pathname])

  const handleNavigation = (href: string, label: string) => {
    if (label === "Appointment") {
      const userStatus = localStorage.getItem("userStatus")
      const isAuth = userStatus === "1" || userStatus === "0"
      if (!isAuth) {
        localStorage.setItem("redirectAfterLogin", "/healings")
        router.push("/login")
        return
      }
    }

    router.push(href)
  }

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Home", isActive: () => pathname === "/" || pathname === "/dashboard" },
    { href: "/healings", icon: Calendar, label: "Appointment", isActive: () => pathname === "/healings" },
    { href: "/treatments", icon: Stethoscope, label: "Treatments", isActive: () => pathname === "/treatments" },
    { href: "/myaccount", icon: User, label: "Account", isActive: () => pathname === "/myaccount" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#4ead91] text-white px-6 py-2 rounded-t-2xl z-50 shadow-xl">
      <div className="flex justify-between items-center max-w-md mx-auto w-full">
        {navItems.map(({ href, icon: Icon, label, isActive }) => {
          const active = isActive()
          return (
            <button
              key={href}
              onClick={() => handleNavigation(href, label)}
              className="flex flex-col items-center text-xs relative"
            >
              <motion.div
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: active ? 1.1 : 1,
                  opacity: 1,
                  y: active ? -4 : 0,
                }}
                transition={{ duration: 0.3, type: "spring" }}
                className={`w-12 h-12 flex items-center justify-center transition-colors duration-300 ${
                  active ? "bg-white text-[#4ead91] rounded-full shadow-md" : "text-white"
                }`}
              >
                <Icon className="w-6 h-6" />
              </motion.div>
              <motion.span
                animate={{ opacity: active ? 1 : 0.8, scale: active ? 1.05 : 1 }}
                className={`mt-1 ${active ? "text-white font-semibold" : "text-white/80"}`}
              >
                {label}
              </motion.span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
