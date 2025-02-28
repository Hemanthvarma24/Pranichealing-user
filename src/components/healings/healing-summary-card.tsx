"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface HealingSummaryCardProps {
  healingId: string
  sessions: number
  totalAmount: string
}

export function HealingSummaryCard({ healingId, sessions, totalAmount }: HealingSummaryCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Card className="w-full border border-gray-200 shadow-md rounded-xl p-4">
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 grid-rows-2 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-500">Healing ID</div>
              <div className="text-base font-medium text-gray-900">{healingId}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-500">No. of Sessions</div>
              <div className="text-base font-medium text-gray-900">{sessions}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-500">Total Amount</div>
              <div className="text-lg font-semibold text-[#4ead91]">₹{totalAmount}</div>
            </div>
            <div className="flex justify-center items-center">
              <Button
                variant="outline"
                size="sm"
                className="text-[#4ead91] border-[#4ead91] hover:bg-[#4ead91] hover:text-white"
                onClick={() => setOpen(true)}
              >
                Make Payment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md rounded-lg shadow-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800">Payment Details</DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Confirm your payment for the healing sessions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Healing ID:</span>
              <span className="font-medium text-gray-900">{healingId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">No. of Sessions:</span>
              <span className="font-medium text-gray-900">{sessions}</span>
            </div>
            <div className="flex justify-between text-base font-semibold">
              <span className="text-gray-500">Total Amount:</span>
              <span className="text-[#4ead91]">₹{totalAmount}</span>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
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
