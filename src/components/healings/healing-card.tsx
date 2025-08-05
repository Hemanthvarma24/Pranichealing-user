"use client"

import { Card } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

interface Healing {
  healingId: string
  createdOn: {
    day: number
    month: string
    year: string
  }
  startedOn: {
    day: number
    month: string
    year: string
  } | null
  endedOn: {
    day: number
    month: string
    year: string
  } | null
  sessions: number
  amount: number
  healingFor: string
  status: "Requested" | "Ongoing" | "Completed"
}

interface HealingCardProps {
  healing: Healing
  onViewDetails: (healingId: string) => void
  variant?: "request" | "ongoing" | "completed"
}

export function HealingCard({ healing, onViewDetails, variant = "ongoing" }: HealingCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-[#4ead91]"
      case "Ongoing":
        return "bg-orange-400"
      case "Requested":
        return "bg-blue-400"
      default:
        return "bg-gray-400"
    }
  }

  // Request card shows minimal information
  if (variant === "request") {
    return (
      <Card className="w-full rounded-xl border border-gray-200 overflow-hidden p-4 shadow-sm">
        <div className="flex justify-between items-start mb-3">
          <div className="text-[#4ead91] font-medium">{healing.healingId}</div>
          <div className={`text-xs text-white px-3 py-1 rounded-full ${getStatusColor(healing.status)}`}>
            {healing.status}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center">
            <div className="text-xs text-gray-500">Created on</div>
            <div className="text-2xl font-bold">{healing.createdOn.day}</div>
            <div className="text-xs text-gray-500">{`${healing.createdOn.month} ${healing.createdOn.year}`}</div>
          </div>

          <div className="flex flex-col">
            <div className="text-xs text-gray-500">No. of Sessions</div>
            <div className="text-lg font-medium text-[#4ead91]">{healing.sessions.toString().padStart(2, "0")}</div>
          </div>

          <div className="flex flex-col">
            <div className="text-xs text-gray-500">Amount</div>
            <div className="text-lg font-medium text-[#4ead91]">₹{healing.amount.toLocaleString()}</div>
          </div>
        </div>
      </Card>
    )
  }

  // Ongoing and completed cards show full information
  return (
    <Card
      className="w-full rounded-xl border border-gray-200 overflow-hidden p-4 shadow-sm cursor-pointer"
      onClick={() => onViewDetails(healing.healingId)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="text-[#4ead91] font-medium">{healing.healingId}</div>
        <div className={`text-xs text-white px-3 py-1 rounded-full ${getStatusColor(healing.status)}`}>
          {healing.status}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="flex flex-col items-center">
          <div className="text-xs text-gray-500">Created on</div>
          <div className="text-2xl font-bold">{healing.createdOn.day}</div>
          <div className="text-xs text-gray-500">{`${healing.createdOn.month} ${healing.createdOn.year}`}</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-xs text-gray-500">Started on</div>
          {healing.startedOn ? (
            <>
              <div className="text-2xl font-bold">{healing.startedOn.day}</div>
              <div className="text-xs text-gray-500">{`${healing.startedOn.month} ${healing.startedOn.year}`}</div>
            </>
          ) : (
            <div className="text-2xl font-bold mt-1">NA</div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <div className="text-xs text-gray-500">Ended on</div>
          {healing.endedOn ? (
            <>
              <div className="text-2xl font-bold">{healing.endedOn.day}</div>
              <div className="text-xs text-gray-500">{`${healing.endedOn.month} ${healing.endedOn.year}`}</div>
            </>
          ) : (
            <div className="text-2xl font-bold mt-1">NA</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col">
          <div className="text-xs text-gray-500">No. of Sessions</div>
          <div className="text-lg font-medium text-[#4ead91]">{healing.sessions.toString().padStart(2, "0")}</div>
        </div>

        <div className="flex flex-col">
          <div className="text-xs text-gray-500">Amount</div>
          <div className="text-lg font-medium text-[#4ead91]">₹{healing.amount.toLocaleString()}</div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <div className="text-xs text-gray-500">Healing For</div>
            <div className="text-xs max-w-[100px] line-clamp-2">{healing.healingFor}</div>
          </div>
          <ChevronRight className="h-6 w-6 text-[#4ead91]" />
        </div>
      </div>
    </Card>
  )
}
