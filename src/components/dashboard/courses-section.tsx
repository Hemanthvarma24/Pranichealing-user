"use client"

import { useState } from "react";
import Image from "next/image";
import whatsup from "@/assets/whatsapp.png";
import heal from "@/assets/heal.png";

export function CoursesSection() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="px-6 py-8 max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg md:text-2xl font-semibold leading-tight">
          Upcoming <br className="md:hidden" />
          <span className="text-3xl text-emerald-600">Courses</span>
        </h2>
        <button
          className="text-sm text-black pt-4 font-medium"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "View Less" : "View All"}
        </button>
      </div>

      <div className="relative w-full rounded-xl border border-gray-300 p-6 shadow-md flex flex-col">
        {/* WhatsApp Icon with Contact Link */}
        <a
          href="https://wa.me/917382020254"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center rounded-full shadow-md bg-white"
        >
          <Image src={whatsup} alt="WhatsApp" width={24} height={24} className="w-6 h-6" />
        </a>

        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center">
            <Image src={heal} alt="Healing Icon" width={32} height={32} className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              Basic Pranic Healing Course
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Location: <span className="text-emerald-600">Tanjore</span> |
              Date: <span className="text-emerald-600">05 Jan 2025</span> |
              Time: <span className="text-emerald-600">10 AM - 6 PM</span>
            </p>
            <p className="text-sm text-gray-800 font-semibold mt-2">Eligibility:</p>
            <p className="text-sm text-gray-600">Anybody above 16 Years of age</p>
            <p className="text-sm text-gray-600">General public male/ female</p>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center border-t border-gray-200 pt-4">
          <button className="border border-emerald-500 text-emerald-600 font-medium px-6 py-2 rounded-lg text-sm">
            Register Now
          </button>
          <div className="text-right">
            <p className="text-xs text-gray-500">Course Fees</p>
            <p className="text-xl font-bold text-gray-900">
              5,000 <span className="text-sm font-semibold">INR</span>
            </p>
          </div>
        </div>
      </div>

      {showMore && (
        <div className="mt-4 p-6 border border-gray-300 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">Advanced Pranic Healing Course</h3>
          <p className="text-sm text-gray-600 mt-1">
            Location: <span className="text-emerald-600">Chennai</span> |
            Date: <span className="text-emerald-600">12 Feb 2025</span> |
            Time: <span className="text-emerald-600">9 AM - 5 PM</span>
          </p>
          <p className="text-sm text-gray-800 font-semibold mt-2">Eligibility:</p>
          <p className="text-sm text-gray-600">Completion of Basic Pranic Healing</p>
          <p className="text-sm text-gray-600">For advanced healing techniques</p>
        </div>
      )}
    </section>
  );
}
