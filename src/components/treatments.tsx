import {
  Smartphone,
  Brain,
  Activity,
  Moon,
  Heart,
  Droplets,
  Zap,
  Leaf,
  Sun,
  Thermometer,
  Shield,
  Eye,
  Link,
} from "lucide-react";
import {CTASection } from "@/components/dashboard/booking-section"

const treatments = [
  { icon: Smartphone, label: "Diabetes" },
  { icon: Brain, label: "Head Ache" },
  { icon: Activity, label: "Knee Pain" },
  { icon: Moon, label: "Stress & Sleep" },
  { icon: Heart, label: "Heart Health" },
  { icon: Droplets, label: "General Cleansing" },
  { icon: Zap, label: "Energy Boost" },
  { icon: Leaf, label: "Allergies" },
  { icon: Sun, label: "Skin Conditions" },
  { icon: Thermometer, label: "Fever" },
  { icon: Eye, label: "Eye Health" },
  { icon: Shield, label: "Immune Support" },
];


export function TreatmentsScreen() {
  return (
    <div className="min-h-screen bg-gray-50 pt-[90px] pb-16">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-2xl text-center font-bold text-gray-900">
          Treatments
        </h1>
        <div className="mb-12">
          <h2 className="text-xl text-center font-semibold text-gray-800 mb-6">
            Conditions for which <br />
            <span className="text-[#4ead91] font-bold text-2xl">
              Pranic Healing Helps
            </span>
          </h2>
          <div className="grid grid-cols-3 gap-4 mt-2 text-white">
            {treatments.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#4ead91] rounded-full flex items-center justify-center mb-3 shadow-lg transition-transform hover:scale-105">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <span className="text-gray-800 font-medium text-center text-sm">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <CTASection/>
      </main>
    </div>
  );
}
