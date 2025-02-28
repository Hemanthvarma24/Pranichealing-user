import { Button } from "@/components/ui/button"
import { HealingsList } from "@/components/healings/healings-list"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { BottomNav } from "@/components/fotter"
import { NavHeader } from "@/components/topnav.tsx"

export default function HealingsPage() {
  return (
    <>
      <NavHeader />
      <div className="max-w-md mx-auto min-h-screen pt-[80px] pb-16">
        <header className="sticky top-0 z-10 bg-white p-4 flex items-center gap-2 pl-4">
          <Link
            href="/myaccount"
            className="p-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-semibold">Healings</h1>
        </header>

        <div className="p-4">
          <HealingsList />
        </div>

        <div className="p-4 sticky bottom-16 bg-white">
          <Button className="w-full bg-[#4ead91] text-white hover:bg-[#3d9c80] font-medium">Book Appointment</Button>
        </div>
        <BottomNav />
      </div>
    </>
  )
}

