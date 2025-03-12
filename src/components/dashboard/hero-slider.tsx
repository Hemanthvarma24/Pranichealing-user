"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import img from "@/assets/doctorone.png";

const slides = [
  {
    title: "Pranic Healing for your Mind, Body & Soul",
    text: "Take a healing for your mental wellness, health problems & good energy",
    image: img,
  },
  {
    title: "Pranic Healing for your Mind, Body & Soul",
    text: "Take a healing for your mental wellness, health problems & good energy",
    image: img,
  },
  {
    title: "Pranic Healing for your Mind, Body & Soul",
    text: "Take a healing for your mental wellness, health problems & good energy",
    image: img,
  }
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full flex flex-col items-center px-4 py-6 sm:py-12">
      <div className="relative w-full max-w-3xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-[#4ead91] text-white rounded-2xl p-6 flex flex-row items-center gap-6"
          >
            <div className="flex-1 text-left">
              <h2 className="text-lg font-semibold mb-2">{slides[current].title}</h2>
              <p className="text-xs opacity-90">{slides[current].text}</p>
            </div>
            <div className="relative w-32 h-32 flex-shrink-0">
              <div className="absolute inset-0 bg-white rounded-full p-2 shadow-lg">
                <Image
                  src={slides[current].image}
                  alt="Healing Master"
                  width={128}
                  height={128}
                  className="rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex mt-3 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? "bg-emerald-500 scale-110" : "bg-gray-400 opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
