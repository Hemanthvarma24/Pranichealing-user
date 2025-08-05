"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Header } from "@/components/dashboard/header";
import { HeroCarousel } from "@/components/dashboard/hero-slider";
import { FounderSection } from "@/components/dashboard/about-section";
import { PurposeSection } from "@/components/dashboard/purpose-section";
import { FAQSection } from "@/components/dashboard/faq-section";
import { ConditionsSection } from "@/components/dashboard/helpconditions-section";
import { CoursesSection } from "@/components/dashboard/courses-section";
import { CTASection } from "@/components/dashboard/booking-section";
import HealthBlogSection from "@/components/dashboard/health-blog-section";
import { BottomNav } from "@/components/fotter";
import { Founder } from "@/components/dashboard/founder";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Adjust time if needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-screen min-h-screen ">
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="fixed top-0 left-0 z-50 w-screen h-screen bg-white flex items-center justify-center"
          >
            {/* Spinning Circle Loader */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
            />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.8 } },
            }}
            className="max-w-7xl mx-auto"
          >
            <Header />
            <main className="pb-24 md:pb-16">
              <motion.div
                className="md:grid md:grid-cols-12 md:gap-9"
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.2 }}
              >
                <motion.div className="md:col-span-12" variants={fadeUp}>
                  <HeroCarousel />
                </motion.div>
                <motion.div className="md:col-span-12" variants={fadeUp}>
                  <FounderSection />
                </motion.div>
                <motion.div className="md:col-span-12" variants={fadeUp}>
                  <Founder />
                </motion.div>
                <motion.div className="md:col-span-12" variants={fadeUp}>
                  <PurposeSection />
                </motion.div>
                <motion.div className="md:col-span-12" variants={fadeUp}>
                <CTASection />
                </motion.div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <ConditionsSection />
                <CoursesSection />
                <HealthBlogSection />
               <FAQSection />
              </motion.div>
            </main>

            <motion.div variants={fadeUp}>
              <BottomNav />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
