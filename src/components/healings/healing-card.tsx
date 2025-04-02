"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Healing {
  healingId: string
  date: string
  time: string
  healer: string
  sessions: number
}

interface HealingCardProps {
  healing: Healing
  onViewDetails: (healingId: string) => void
}

export function HealingCard({ healing, onViewDetails }: HealingCardProps) {
  // Parse the date string
  const parsedDate = new Date(healing.date)
  const month = parsedDate.toLocaleString("default", { month: "long" }).toUpperCase()
  const day = parsedDate.getDate()
  const weekday = parsedDate.toLocaleString("default", { weekday: "short" }).toUpperCase()

  return (
    <Card className="w-full shadow-sm rounded-lg border-gray-200 overflow-hidden">
      <div className="p-4">
        <div className="text-sm text-gray-600 mb-2">ID-{healing.healingId}</div>

        <div className="grid grid-cols-3 gap-4">
          {/* Date column */}
          <div className="flex flex-col items-center">
            <div className="text-sm text-gray-500">{month}</div>
            <div className="text-3xl font-bold text-[#4ead91]">{day}</div>
            <div className="text-sm text-gray-500">{weekday}</div>
          </div>

          {/* Middle column */}
          <div className="flex flex-col justify-center">
            <div className="text-xs text-gray-500">Timing</div>
            <div className="text-sm font-semibold">{healing.time}</div>
           
          </div>

          {/* Right column */}
          <div className="flex flex-col items-end justify-center">
            <Button
              variant="outline"
              size="sm"
              className="text-[#4ead91] border-[#4ead91] hover:bg-[#4ead91] hover:text-white"
              onClick={() => onViewDetails(healing.healingId)}
            >
             View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

