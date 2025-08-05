import { BottomNav } from "@/components/fotter";
import { NavHeader } from "@/components/topnav";

export default function AboutPranicHealing() {
  return (
    <><NavHeader /><div className="px-6 sm:px-12 md:px-20 lg:px-32 xl:px-48 py-8 text-center max-w-4xl mx-auto pt-[100px]">
      <h2 className="text-xl sm:text-xl font-medium text-black">
        Let’s know about
      </h2>
      <h1 className="text-3xl sm:text-3xl font-bold text-emerald-600 mb-4">
        Pranic Healing
      </h1>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
        Pranic healing is a holistic, non-touch therapy that uses the concept of life force
        energy, or prana, to balance and heal the body’s energy fields. Pranic healing is based
        on the idea that stress, trauma, or illness can cause the body’s energy fields to become
        imbalanced or blocked. Practitioners use no-touch techniques to cleanse these blockages
        and re-energize the affected areas.
      </p>
      <button className="bg-[#4ead91] text-white font-semibold text-sm sm:text-base px-6 py-2 rounded-md shadow-md hover:bg-emerald-600 transition">
        Know More
      </button>
      <BottomNav />
    </div></>

    
  )
}

