"use client"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HealingSummaryCard } from "./healing-summary-card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface Healing {
  healingId: string
  date: string
  time: string
  healer: string
  sessions: number
  name: string // Added name property
}

interface HealingDetailsProps {
  healing: Healing
  onBack: () => void
}

// Mock data for the detailed view
const healingSessions = [
  {
    id: "1",
    date: "2023-07-12",
    time: "10:00 AM",
    coordinator: "Dr. Sarah Wilson",
    name: "John Doe",
    sessions: 1,
    amount: "1,500",
  },
  {
    id: "2",
    date: "2023-07-19",
    time: "11:00 AM",
    coordinator: "Dr. Michael Chen",
    name: "John Doe",
    sessions: 1,
    amount: "1,500",
  },
  {
    id: "3",
    date: "2023-07-26",
    time: "10:30 AM",
    coordinator: "Dr. Sarah Wilson",
    name: "John Doe",
    sessions: 1,
    amount: "1,500",
  },
]

export function HealingDetails({ healing, onBack }: HealingDetailsProps) {
  const totalAmount = (healing.sessions * 1500).toLocaleString()

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b">
        <button onClick={onBack} className="flex items-center">
          <ChevronLeft className="h-6 w-6 text-[#4ead91]" />
        </button>
        <h1 className="text-xl font-semibold">Healing Details</h1>
      </div>

      <div className="p-4">
        <HealingSummaryCard
          healingId={`ID-${healing.healingId}`}
          name={healing.name}
          sessions={healing.sessions}
          totalAmount={totalAmount}
        />

        <Tabs defaultValue="sessions" className="w-full mt-6">
          <TabsList className="w-full justify-start h-12 p-0 border-b rounded-none">
            <TabsTrigger
              value="sessions"
              className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#4ead91] data-[state=active]:text-foreground"
            >
              Sessions
            </TabsTrigger>
            <TabsTrigger
              value="info"
              className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#4ead91] data-[state=active]:text-foreground"
            >
              Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sessions" className="mt-6">
            <div className="space-y-6">
              {healingSessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="info" className="mt-6">
            <div className="p-4 space-y-4">
              <InfoItem label="Name" value={healing.name} />
              <InfoItem label="Email" value="johndoe@example.com" />
              <InfoItem label="Phone" value="+19 94567 8900" />
              <InfoItem label="Address" value="123 Main St, City, Country" />
              <InfoItem label="Date of Birth" value="January 1, 1990" />
              <InfoItem label="Gender" value="Male" />
              <InfoItem label="Emergency Contact" value="87654 93210" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center border-b border-gray-200 py-2">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  )
}

interface SessionCardProps {
  session: {
    id: string
    date: string
    time: string
    coordinator: string
    name: string
    sessions: number
    amount: string
  }
}

function SessionCard({ session }: SessionCardProps) {
  const [open, setOpen] = useState(false)

  // Parse the date string
  const parsedDate = new Date(session.date)
  const month = parsedDate.toLocaleString("default", { month: "short" })
  const day = parsedDate.getDate()
  const weekday = parsedDate.toLocaleString("default", { weekday: "short" })

  return (
    <>
      <div className="w-full border rounded-lg shadow-sm p-4">
        {/* Top row with Healing ID */}
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-900">Session ID: {session.id}</span>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-3 gap-4 items-center">
          {/* Left column for Date */}
          <div className="flex flex-col items-center bg-gray-100 p-5 rounded-lg">
            <span className="text-sm uppercase text-gray-500">{month}</span>
            <p className="text-3xl font-bold text-[#4ead91]">{day}</p>
            <span className="text-sm text-gray-600">{weekday}</span>
          </div>

          {/* Middle section - 2x2 grid */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs text-gray-500">Coordinator</span>
              <p className="text-sm font-medium text-gray-900">{session.coordinator}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-500">Name</span>
              <p className="text-sm font-medium text-gray-900">{session.name}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-500">No.of Sessions</span>
              <p className="text-base font-semibold text-gray-900">{session.sessions}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-500">Amount</span>
              <p className="text-base font-semibold text-[#4ead91]">₹{session.amount}</p>
            </div>
          </div>
        </div>

        {/* Bottom Left Button */}
        <div className="mt-4">
          <Button
            variant="outline"
            className="w-full border-[#4ead91] text-[#4ead91] hover:bg-[#4ead91] hover:text-white transition-colors"
            onClick={() => setOpen(true)}
          >
            Pay Now
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md rounded-lg shadow-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800">Session Payment</DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Confirm your payment for this healing session.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Session ID:</span>
              <span className="font-medium text-gray-900">{session.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date:</span>
              <span className="font-medium text-gray-900">
                {session.date} at {session.time}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Coordinator:</span>
              <span className="font-medium text-gray-900">{session.coordinator}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Name:</span>
              <span className="font-medium text-gray-900">{session.name}</span>
            </div>
            <div className="flex justify-between text-base font-semibold">
              <span className="text-gray-500">Amount:</span>
              <span className="text-[#4ead91]">₹{session.amount}</span>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#4ead91] text-white hover:bg-[#3d9c80]">Confirm Payment</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

