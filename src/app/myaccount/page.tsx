"use client";

import Link from "next/link";
import {
  BookOpen,
  ChevronRight,
  CreditCard,
  FileQuestion,
  HelpCircle,
  Info,
  PenTool,
  Share2,
  Shield,
  LogOut,
} from "lucide-react";
import { BottomNav } from "@/components/fotter";
import ProfileCard from "./profilecard";
import { NavHeader } from "@/components/topnav";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AccountSettings() {
  const router = useRouter();

  const menuItems = [
    { icon: CreditCard, label: "Payment History", href: "/myaccount/payment-history" },
    { icon: BookOpen, label: "Courses & Events", href: "/myaccount/courses" },
    { icon: FileQuestion, label: "FAQ", href: "/myaccount/faq" },
    { icon: PenTool, label: "Blog", href: "/myaccount/blog" },
    { icon: Info, label: "About Pranic Healing", href: "/myaccount/about-pranic-healing" },
    { icon: HelpCircle, label: "Support", href: "/myaccount/support" },
    { icon: Shield, label: "Policies", href: "/myaccount/policies" },
    { icon: Share2, label: "Share", href: "/share" },
  ];

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <>
      <NavHeader />

      <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 pb-24 pt-[70px]">
        <div className="container mx-auto max-w-md p-4">
          <ProfileCard />
        </div>

        <div className="container mx-auto max-w-md p-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid gap-4 bg-white rounded-2xl shadow-2xl p-4"
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  href={item.href}
                  className="flex items-center justify-between rounded-xl px-4 py-3 transition-all hover:bg-gray-100 active:scale-[0.97]"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-emerald-100 p-2">
                      <item.icon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <span className="text-base font-medium text-gray-800">{item.label}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              </motion.div>
            ))}

            {/* Logout Option */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * menuItems.length }}
            >
              <button
                onClick={handleLogout}
                className="flex items-center justify-between rounded-xl px-4 py-3 transition-all hover:bg-red-50 active:scale-[0.97] w-full"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-red-100 p-2">
                    <LogOut className="h-6 w-6 text-red-600" />
                  </div>
                  <span className="text-base font-medium text-red-700">Logout</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <BottomNav />
    </>
  );
}
