import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { NavHeader } from "@/components/topnav";

export default function PoliciesPage() {
  const policyItems = [
    { label: "Privacy Policy", href: "/myaccount/policies/privacy" },
    { label: "Terms & Conditions", href: "/myaccount/policies/terms" },
    { label: "Payment Policy", href: "/myaccount/policies/payment" },
  ];

  return (
    <>
      <NavHeader />
      <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100 pt-[100px]">
        {/* Header with Back Button */}
        <div className="flex items-center w-full max-w-md">
          <Link
            href="/myaccount"
            className="p-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h2 className="text-xl font-semibold ml-4 text-gray-800">
            Help & Support
          </h2>
        </div>

        {/* Policies Box */}
        <div className="mt-8 w-full max-w-md p-5 border bg-white rounded-xl shadow-lg">
          {policyItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-100 transition duration-200"
            >
              <span className="text-md font-medium text-gray-700">
                {item.label}
              </span>
              <ChevronRight className="h-5 w-5 text-emerald-600" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
