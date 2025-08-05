"use client";

import { useEffect, useState } from "react";
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
} from "lucide-react";

import { CTASection } from "@/components/dashboard/booking-section";
import { BottomNav } from "@/components/fotter";
import { NavHeader } from "@/components/topnav";
import { motion, AnimatePresence } from "framer-motion";

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

export default function TreatmentsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col mt-8 mb-12">
      <NavHeader />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl text-center font-bold text-gray-900 mt-4"
        >
          Treatments
        </motion.h1>

        <section className="mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl text-center font-semibold text-gray-800 mb-6"
          >
            Conditions for which <br />
            <span className="text-[#4ead91] font-bold text-2xl">
              Pranic Healing Helps
            </span>
          </motion.h2>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.05 },
              },
            }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 mt-4"
          >
            <AnimatePresence>
              {loading
                ? Array.from({ length: 12 }).map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center animate-pulse"
                    >
                      <div className="w-16 h-16 bg-gray-300 rounded-full mb-2" />
                      <div className="w-12 h-4 bg-gray-300 rounded" />
                    </motion.div>
                  ))
                : treatments.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="group flex flex-col items-center cursor-pointer transition-all duration-300"
                      >
                        <div className="relative w-16 h-16 bg-[#4ead91] rounded-full flex items-center justify-center shadow-xl mb-2 group-hover:shadow-[#4ead91]/70 group-hover:shadow-2xl transition-all duration-300">
                          <Icon className="w-8 h-8 text-white" />
                          <span className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white animate-pulse" />
                        </div>
                        <span className="text-center text-sm font-medium text-gray-800 group-hover:text-[#4ead91] transition-colors duration-300">
                          {item.label}
                        </span>
                      </motion.div>
                    );
                  })}
            </AnimatePresence>
          </motion.div>
        </section>

        <CTASection />
      </main>

      <BottomNav />
    </div>
  );
}
