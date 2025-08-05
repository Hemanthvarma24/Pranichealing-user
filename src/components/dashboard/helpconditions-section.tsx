import {
  Smartphone,
  Brain,
  Activity,
  Moon,
  Heart,
  Droplets,
} from "lucide-react";
import Link from "next/link";

export function ConditionsSection() {
  return (
    <div className="px-6 py-8 bg-[#d5ede5] mb-6 text-center">
      <h2 className="text-lg font-medium text-gray-800">
        Conditions for which <br />
        <span className="text-emerald-600 font-semibold text-xl">
          Pranic Healing Helps
        </span>
      </h2>
      <div className="grid grid-cols-3 gap-6 mt-6 text-white">
        {[
          { icon: <Smartphone className="w-10 h-10" />, label: "Diabetes" },
          { icon: <Brain className="w-10 h-10" />, label: "Head Ache" },
          { icon: <Activity className="w-10 h-10" />, label: "Knee Pain" },
          { icon: <Moon className="w-10 h-10" />, label: "Stress & Sleep" },
          { icon: <Heart className="w-10 h-10" />, label: "Heart Health" },
          {
            icon: <Droplets className="w-10 h-10" />,
            label: "General Cleansing",
          },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-20 h-20 bg-[#4ead91] rounded-full flex items-center justify-center mb-2">
              {item.icon}
            </div>
            <span className="text-gray-800 font-medium text-sm">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <Link href="/treatments">
        <button className="mt-6 px-6 py-2 bg-[#4ead91] text-white rounded-lg font-medium text-sm shadow-md">
          View All
        </button>
      </Link>
    </div>
  );
}
