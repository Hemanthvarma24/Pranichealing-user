"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import img from "@/assets/doctorone.png";
import img2 from "@/assets/doctortwo.png";
import img3 from "@/assets/doctorone.png";

const slides = [
  {
    title: "Pranic Healing for your Mind, Body & Soul",
    text: "Take a healing for your mental wellness, health problems & good energy",
    image: img,
  },
  {
    title: "Energy Healing for a Healthier You",
    text: "Discover the balance and harmony within your body using Pranic techniques",
    image: img2,
  },
  {
    title: "Wellness from Within",
    text: "Boost your vitality, reduce stress, and heal naturally",
    image: img3,
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    stopAutoSlide();
    slideInterval.current = setTimeout(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
  };

  const stopAutoSlide = () => {
    if (slideInterval.current) clearTimeout(slideInterval.current);
  };

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, [current]);

  const handleManualSelect = (index: number) => {
    if (index === current) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      goToPrev();
    } else if (info.offset.x < -threshold) {
      goToNext();
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
      zIndex: 0,
    }),
  };

  return (
    <div className="relative w-full flex flex-col items-center px-4 py-4 sm:py-6">
      <div className="relative w-full max-w-3xl overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 80, damping: 20 },
              opacity: { duration: 0.6, ease: "easeInOut" },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="bg-[#4ead91] text-white rounded-2xl p-6 flex flex-row items-center gap-6 cursor-grab active:cursor-grabbing select-none"
          >
            <div className="flex-1 text-left pointer-events-none">
              <h2 className="text-lg font-semibold mb-2">
                {slides[current].title}
              </h2>
              <p className="text-xs opacity-90">{slides[current].text}</p>
            </div>
            <div className="relative w-32 h-32 flex-shrink-0 pointer-events-none">
              <div className="absolute inset-0 bg-white rounded-full p-2 shadow-lg">
                <Image
                  src={slides[current].image}
                  alt="Healing Master"
                  width={128}
                  height={128}
                  className="rounded-full"
                  draggable={false}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex mt-3 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleManualSelect(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-emerald-500 scale-110"
                : "bg-gray-400 opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
