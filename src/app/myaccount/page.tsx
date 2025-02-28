import Link from "next/link";
import {
  BookOpen,
  ChevronRight,
  CreditCard,
  FileQuestion,
  HelpCircle,
  Info,
  Share2,
  Shield,
} from "lucide-react";
import { BottomNav } from "@/components/fotter";
import ProfileCard from "./profilecard";
import { NavHeader } from "@/components/topnav.tsx"; // Import the NavHeader component

export default function AccountSettings() {
  const menuItems = [
    { icon: BookOpen, label: "Healings", href: "/myaccount/healings" },
    { icon: CreditCard, label: "Payment History", href: "/myaccount/payment-history" },
    { icon: BookOpen, label: "Courses", href: "/myaccount/courses" },
    { icon: FileQuestion, label: "FAQ", href: "/myaccount/faq" },
    { icon: Info, label: "About Pranic Healing", href: "/myaccount/about-pranic-healing" },
    { icon: HelpCircle, label: "Support", href: "/myaccount/support" },
    { icon: Shield, label: "Policies", href: "/myaccount/policies" },
    { icon: Share2, label: "Share", href: "/share" },
  ];

  return (
    <>
      {/* Top Navigation Header */}
      <NavHeader /> 

      <div className="min-h-screen bg-gray-100 pb-20 pt-[60px]"> {/* Adjust padding to prevent overlap */}
        
        {/* Profile Card */}
        <div className="container mx-auto max-w-md p-4">
          <ProfileCard />
        </div>

        {/* Menu Items */}
        <div className="container mx-auto max-w-md p-4">
          <div className="grid gap-4 bg-white rounded-lg shadow-md p-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between rounded-lg px-4 py-3 transition hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-emerald-100 p-2">
                    <item.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <span className="text-lg font-medium text-gray-700">
                    {item.label}
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </>
  );
}
