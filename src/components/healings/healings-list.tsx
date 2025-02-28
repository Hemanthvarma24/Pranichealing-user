"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HealingCard } from "./healing-card"
import { HealingSummaryCard } from "./healing-summary-card"

const healings = [
  {
    healingId: "PH045-1",
    date: "12 July",
    time: "10:00 AM",
    coordinator: "Dr. Sarah Wilson",
    name: "John Doe",
    sessions: 3,
    amount: "1,500",
  },
  {
    healingId: "PH045-2",
    date: "19 July",
    time: "11:00 AM",
    coordinator: "Dr. Michael Chen",
    name: "Jane Smith",
    sessions: 5,
    amount: "2,500",
  },
  {
    healingId: "PH045-3",
    date: "26 July",
    time: "10:30 AM",
    coordinator: "Dr. Sarah Wilson",
    name: "Robert Johnson",
    sessions: 4,
    amount: "2,000",
  },
]

export function HealingsList() {
  return (
    <div className="w-full">
      <HealingSummaryCard healingId="ID-PH045" sessions={12} totalAmount="6,000" />

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
            {healings.map((healing) => (
              <HealingCard key={healing.healingId} {...healing} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="info" className="mt-6">
          <div className="p-4 space-y-4">
            <InfoItem label="Name" value="John Doe" />
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

