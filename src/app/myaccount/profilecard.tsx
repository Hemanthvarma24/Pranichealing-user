"use client";

import { useState } from "react";
import { Pencil, X } from "lucide-react";
import Image from "next/image";
import profile from "@/assets/patient2.jpg";

export default function ProfileCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-md mx-auto py-4">
      {/* Profile Card */}
      <div className="relative flex items-center justify-between rounded-2xl bg-[#4ead91] p-5 shadow-lg">
        <div className="relative h-20 w-20 rounded-full border-4 border-white overflow-hidden">
          <Image src={profile} alt="Profile" className="h-full w-full object-cover" />
        </div>
        <div className="flex-grow pl-4 text-white">
          <div className="text-2xl font-bold">Nayeem Raj</div>
          <div className="text-lg text-emerald-50">+91 8090706543</div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
        >
          <Pencil className="h-6 w-6 text-emerald-600" />
        </button>
      </div>

      {/* Full-Screen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl w-96 p-6 shadow-xl relative">
            <button
              className="absolute top-3 right-3 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Profile</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  placeholder="******"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2 accent-emerald-500" />
                <label htmlFor="remember" className="text-gray-700">Remember Password</label>
              </div>

              <button className="w-full bg-[#4ead91] text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-[#3d8d79] transition">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
