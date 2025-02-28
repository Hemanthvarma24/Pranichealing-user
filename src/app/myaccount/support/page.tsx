import { BottomNav } from "@/components/fotter";
import { NavHeader } from "@/components/topnav.tsx";

export default function Support() {
  return (
    <>
      <NavHeader />
      <div className="max-w-lg mx-auto p-6  rounded-2xl  pt-[100px]">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Support
        </h1>
        <p className="text-center text-gray-600 mb-4">
          If you have any inquiries about Pranic Healing, feel free to reach
          out.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4ead91]"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Mobile Number
            </label>
            <input
              type="tel"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4ead91]"
              placeholder="Enter your mobile number"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4ead91]"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Message</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4ead91]"
              rows={4}
              placeholder="Write your message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#4ead91] text-white p-3 rounded-lg font-medium hover:bg-[#3c8b74] transition"
          >
            Submit
          </button>
        </form>
        <BottomNav />
      </div>
    </>
  );
}
