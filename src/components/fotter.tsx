import { Home, Calendar, User, Stethoscope } from "lucide-react";
import Link from "next/link";

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#4ead91] text-white px-6 py-4 rounded-t-2xl z-50 shadow-lg">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <Link href="/" className="flex flex-col items-center">
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/appointment" className="flex flex-col items-center">
          <Calendar className="w-6 h-6" />
          <span className="text-xs mt-1">Appointment</span>
        </Link>
        <Link href="/treatments" className="flex flex-col items-center">
          <Stethoscope className="w-6 h-6" />
          <span className="text-xs mt-1">Treatments</span>
        </Link>
        <Link href="/myaccount" className="flex flex-col items-center">
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">My Account</span>
        </Link>
      </div>
    </nav>
  );
}
