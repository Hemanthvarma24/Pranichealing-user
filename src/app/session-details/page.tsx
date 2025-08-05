"use client"

import { useState, useEffect, Suspense } from "react"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { BottomNav } from "@/components/fotter"
import { NavHeader } from "@/components/topnav"

// Session data with feedback information
const sessions = {
  HDCH001: {
    id: "HDCH001",
    date: "2023-07-18",
    time: "05.00 PM",
    amount: 500,
    status: "Completed" as const,
    healingId: "PH046",
    healingStatus: "Ongoing" as const,
    feedback: "The session was very helpful. I felt immediate relief after the treatment.",
    rating: 8,
  },
  HDCH002: {
    id: "HDCH002",
    date: "2023-07-20",
    time: "05.00 PM",
    amount: 500,
    status: "Pending" as const,
    healingId: "PH046",
    healingStatus: "Ongoing" as const,
    feedback: "",
    rating: null,
  },
  HDCH003: {
    id: "HDCH003",
    date: "2023-07-22",
    time: "05.00 PM",
    amount: 500,
    status: "Pending" as const,
    healingId: "PH046",
    healingStatus: "Ongoing" as const,
    feedback: "",
    rating: null,
  },
  HDCH004: {
    id: "HDCH004",
    date: "2023-07-24",
    time: "05.00 PM",
    amount: 500,
    status: "Completed" as const,
    healingId: "PH045",
    healingStatus: "Completed" as const,
    feedback:
      "The headache treatment was very effective. My pain level decreased from 8/10 to 3/10 after the session. The specialist was very knowledgeable and provided helpful advice for managing my symptoms at home.",
    rating: 9,
  },
  HDCH005: {
    id: "HDCH005",
    date: "2023-07-26",
    time: "05.00 PM",
    amount: 500,
    status: "Completed" as const,
    healingId: "PH045",
    healingStatus: "Completed" as const,
    feedback:
      "Another excellent session. The therapist focused on pressure points that helped relieve my back pain significantly.",
    rating: 10,
  },
}

// Healing ID → Name map
const healingNames: Record<string, string> = {
  PH046: "Headache",
  PH045: "Back Pain",
  // Add more mappings here
}

// Loading component
function SessionDetailsLoading() {
  return (
    <div className="flex flex-col h-full bg-gray-50 min-h-screen mt-16">
      <div className="flex items-center gap-3 px-4 py-3 border-b shadow-sm bg-white sticky top-0 z-10">
        <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-3" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="h-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}

// Main component that uses useSearchParams
function SessionDetailsContent() {
  const [scale, setScale] = useState<string>("")
  const [comment, setComment] = useState<string>("")
  const [savedComment, setSavedComment] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [hasCommented, setHasCommented] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  const sessionId = searchParams.get("sessionId") || "HDCH001"
  const session = sessions[sessionId as keyof typeof sessions]

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 600)

    // Initialize feedback state if session has existing feedback
    if (session.feedback) {
      setSavedComment(session.feedback)
      setHasCommented(true)
      if (session.rating) {
        setScale(session.rating.toString())
      }
    }

    return () => clearTimeout(timer)
  }, [session])

  const healingName = healingNames[session.healingId] || "Healing"
  const isSessionCompleted = session.status === "Completed"

  const handleSubmitComment = () => {
    setSavedComment(comment)
    setHasCommented(true)
    setIsDialogOpen(false)
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 min-h-screen mt-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 px-4 py-3 border-b shadow-sm bg-white sticky top-0 z-10"
      >
        <ChevronLeft className="h-6 w-6 text-[#4ead91] cursor-pointer" onClick={handleBack} />
        <h1 className="text-xl font-semibold">Session Info</h1>
      </motion.div>

      <div className="p-4 space-y-4 overflow-y-auto pb-20">
        {/* Session Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-[#4ead91] font-medium text-lg">{session.id}</span>
            <span
              className={`text-sm px-4 py-1 rounded-full ${
                isSessionCompleted ? "bg-[#4ead91] text-white" : "bg-orange-400 text-white"
              }`}
            >
              {session.status}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <div className="text-sm text-gray-500">Date</div>
              <div className="text-sm font-medium">{session.date}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Time</div>
              <div className="text-sm font-medium">{session.time}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Amount</div>
              <div className="text-sm font-medium">₹{session.amount}</div>
            </div>
          </div>
        </motion.div>

        {/* Feedback Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="h-full flex flex-col shadow-md border border-gray-200 bg-white">
            <div className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{healingName}</h2>
                  <p className="text-sm text-gray-500">
                    {isSessionCompleted ? "Your session feedback" : "Share about your session experience"}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-4 flex-1 space-y-4">
              {/* Only show rating input for ongoing sessions that haven't been rated yet */}
              {!isSessionCompleted && !hasCommented && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Rate Your session (1-10)</h3>
                  <select
                    value={scale}
                    onChange={(e) => setScale(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  >
                    <option value="" disabled>
                      Select scale
                    </option>
                    {[...Array(10)].map((_, i) => {
                      const value = i + 1
                      return (
                        <option key={value} value={value.toString()}>
                          {value}
                        </option>
                      )
                    })}
                  </select>
                </motion.div>
              )}

              {/* Show rating if it exists */}
              {(hasCommented || isSessionCompleted) && session.rating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Your Rating</h3>
                  <div className="flex items-center gap-1">
                    <div className="bg-[#4ead91] text-white px-2 py-1 rounded text-sm font-medium">
                      {session.rating}/10
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Show feedback if it exists */}
              {(savedComment || isSessionCompleted) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Feedback</h3>
                  <p className="text-sm bg-gray-100 text-gray-600 p-3 mb-6 rounded-md">
                    {isSessionCompleted ? session.feedback : savedComment}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Only show add comment button for ongoing sessions without feedback */}
            {!isSessionCompleted && !hasCommented && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-4"
              >
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="w-full text-white transition-all duration-200 bg-[#4ead91] hover:bg-[#3d9c80] hover:scale-105"
                >
                  Add comment
                </Button>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>

      {/* Comment Dialog */}
      <AnimatePresence>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md rounded-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <DialogHeader>
                <DialogTitle>Describe Your Session</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <textarea
                  placeholder={`Describe your ${healingName.toLowerCase()} symptoms, triggers, duration, and any relief methods that worked...`}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full min-h-[100px] border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-[#4ead91] focus:border-transparent transition-all"
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitComment}
                  className="text-white bg-[#4ead91] hover:bg-[#3d9c80] transition-colors"
                  disabled={!comment.trim()}
                >
                  Submit
                </Button>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      </AnimatePresence>
    </div>
  )
}

// Main export component with Suspense boundary
export default function SessionDetailsPage() {
  return (
    <>
      <NavHeader />
      <Suspense fallback={<SessionDetailsLoading />}>
        <SessionDetailsContent />
      </Suspense>
      <BottomNav />
    </>
  )
}