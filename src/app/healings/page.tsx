"use client"

import { useState, useEffect } from "react"
import { Calendar, Send } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { HealingCard } from "@/components/healings/healing-card"
import { BottomNav } from "@/components/fotter"
import { NavHeader } from "@/components/topnav"

// Mock data for healings
const healings = [
  {
    healingId: "PH045",
    createdOn: { day: 12, month: "July", year: "2025" },
    startedOn: { day: 18, month: "July", year: "2025" },
    endedOn: { day: 24, month: "July", year: "2025" },
    sessions: 5,
    amount: 2500,
    healingFor: "Head Ache, Knee Pain, Cardiac Care...",
    status: "Completed" as const,
    completedSessions: 5,
    pendingSessions: 0,
    amountPaid: 2500,
    toPay: 0,
  },
  {
    healingId: "PH046",
    createdOn: { day: 15, month: "July", year: "2025" },
    startedOn: { day: 20, month: "July", year: "2025" },
    endedOn: null,
    sessions: 5,
    amount: 2500,
    healingFor: "Head Ache, Knee Pain, Cardiac Care...",
    status: "Ongoing" as const,
    completedSessions: 2,
    pendingSessions: 3,
    amountPaid: 1000,
    toPay: 1500,
  },
  {
    healingId: "PH047",
    createdOn: { day: 18, month: "July", year: "2025" },
    startedOn: null,
    endedOn: null,
    sessions: 5,
    amount: 2500,
    healingFor: "Head Ache, Knee Pain, Cardiac Care...",
    status: "Requested" as const,
    completedSessions: 0,
    pendingSessions: 5,
    amountPaid: 0,
    toPay: 2500,
  },
]

const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-xl shadow p-4 space-y-4">
    <div className="h-4 w-1/2 bg-gray-300 rounded" />
    <div className="h-3 w-full bg-gray-200 rounded" />
    <div className="h-3 w-full bg-gray-200 rounded" />
    <div className="h-3 w-1/3 bg-gray-200 rounded" />
  </div>
)

export default function HealingsPage() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const handleViewDetails = async (healingId: string) => {
    setIsNavigating(true)
    const healing = healings.find((h) => h.healingId === healingId)
    await new Promise((resolve) => setTimeout(resolve, 300))
    router.push(`/healing-details?healingId=${healingId}&status=${healing?.status || "Ongoing"}`)
  }

  const toggleMenu = () => setIsOpen(!isOpen)

  const renderTabContent = (status: "Requested" | "Ongoing" | "Completed", variant: string) => {
    const filtered = healings.filter((h) => h.status === status)
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4 p-4 flex-1"
      >
        {loading ? (
          Array.from({ length: 2 }).map((_, idx) => <SkeletonCard key={idx} />)
        ) : filtered.length === 0 ? (
          <div className="flex justify-center items-center h-40 text-gray-500">No {status.toLowerCase()} healings found</div>
        ) : (
          filtered.map((h, index) => (
            <motion.div
              key={h.healingId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <HealingCard healing={h} onViewDetails={() => handleViewDetails(h.healingId)} variant={variant} />
            </motion.div>
          ))
        )}
      </motion.div>
    )
  }

  return (
    <>
      <NavHeader />
      <div className="mt-[70px] pb-[80px] min-h-screen flex flex-col bg-gray-50">
        <AnimatePresence>
          {isNavigating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <div className="w-8 h-8 border-4 border-[#4ead91] border-t-transparent rounded-full animate-spin"></div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center px-4 py-3 border-b shadow-sm bg-white sticky top-0 z-20">
          <h1 className="text-xl font-semibold">Appointments</h1>
        </div>

        <Tabs defaultValue="ongoing" className="flex flex-col flex-1">
          <div className="sticky top-[52px] z-10 bg-white border-b">
            <TabsList className="grid grid-cols-3 h-12 p-0 rounded-none bg-white">
              <TabsTrigger value="request" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#4ead91] data-[state=active]:text-foreground data-[state=active]:font-medium">
                Request
              </TabsTrigger>
              <TabsTrigger value="ongoing" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#4ead91] data-[state=active]:text-foreground data-[state=active]:font-medium">
                Ongoing
              </TabsTrigger>
              <TabsTrigger value="completed" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#4ead91] data-[state=active]:text-foreground data-[state=active]:font-medium">
                Completed
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-auto">
            <TabsContent value="request" className="mt-0 flex flex-col h-full">
              {renderTabContent("Requested", "request")}
            </TabsContent>
            <TabsContent value="ongoing" className="mt-0 flex flex-col h-full">
              {renderTabContent("Ongoing", "ongoing")}
            </TabsContent>
            <TabsContent value="completed" className="mt-0 flex flex-col h-full">
              {renderTabContent("Completed", "completed")}
            </TabsContent>
          </div>
        </Tabs>

        <motion.button
          className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-[#4ead91] flex items-center justify-center shadow-lg z-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMenu}
        >
          <Calendar className="w-6 h-6 text-white" />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.button
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -60 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="fixed bottom-24 right-4 w-48 p-3 rounded-lg bg-gray-200 text-black flex items-center gap-2 shadow-lg z-40"
                onClick={() => {
                  router.push("/appointmentform")
                  setIsOpen(false)
                }}
              >
                <Calendar size={20} />
                Book for You
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -120 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="fixed bottom-24 right-4 w-48 p-3 rounded-lg bg-gray-200 text-black flex items-center gap-2 shadow-lg z-40"
                onClick={() => {
                  router.push("/appointment-for-others")
                  setIsOpen(false)
                }}
              >
                <Send size={20} />
                Book for Others
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </div>
      <BottomNav />
    </>
  )
}
