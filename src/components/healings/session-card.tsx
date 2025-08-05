"use client"

import { ChevronRight } from "lucide-react"

interface HealingSession {
  id: string
  date: string
  time: string
  amount: number
  status: "Completed" | "Pending"
}

interface SessionCardProps {
  session: HealingSession
  onViewSession: () => void
}

export function SessionCard({ session, onViewSession }: SessionCardProps) {
  // Format date for display
  const dateParts = session.date.split("-")
  const day = Number.parseInt(dateParts[2], 10)
  const month = new Date(`${dateParts[0]}-${dateParts[1]}-01`).toLocaleString("default", { month: "long" })
  const year = dateParts[0]

  return (
    <div
      className="w-full rounded-2xl overflow-hidden p-4 border border-gray-200 bg-white shadow-sm mb-4 cursor-pointer"
      onClick={onViewSession}
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-[#3CBFAD] font-semibold text-lg">{session.id}</span>
        <span
          className={`text-sm px-4 py-1 rounded-full font-medium ${
            session.status === "Completed" ? "bg-[#3CBFAD]/20 text-[#3CBFAD]" : "bg-orange-400/20 text-orange-500"
          }`}
        >
          {session.status}
        </span>
      </div>

      <div className="grid grid-cols-3 text-left text-sm text-gray-500 gap-2">
        <div>
          <div>Date</div>
          <div className="text-2xl font-bold text-black leading-tight">{day}</div>
          <div className="text-xs">
            {month} {year}
          </div>
        </div>
        <div>
          <div>Time</div>
          <div className="text-base font-semibold text-black">{session.time}</div>
        </div>
        <div>
          <div>Amount</div>
          <div className="text-xl font-bold text-black">₹{session.amount}</div>
        </div>
      </div>

      <div className=" flex justify-end items-center">
        <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
          <ChevronRight className="h-5 w-5 text-black" />
        </div>
      </div>
    </div>
  )
}
