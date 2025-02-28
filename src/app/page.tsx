import { Header } from "@/components/dashboard/header"
import { HeroCarousel } from "@/components/dashboard/hero-slider"
import { FounderSection } from "@/components/dashboard/about-section"
import { PurposeSection } from "@/components/dashboard/purpose-section"
import { FAQSection } from "@/components/dashboard/faq-section"
import { ConditionsSection } from "@/components/dashboard/helpconditions-section"
import { CoursesSection } from "@/components/dashboard/courses-section"
import { CTASection } from "@/components/dashboard/booking-section"
import { BottomNav } from "@/components/fotter"
import {Founder} from "@/components/dashboard/founder"

export default function home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="pb-24 md:pb-16">
          <div className="md:grid md:grid-cols-12 md:gap-9">
            <div className="md:col-span-12">
              <HeroCarousel/>
              <FounderSection />
              <Founder/>
              <PurposeSection />
            </div>
            <div className="md:col-span-12">
              <FAQSection />
            </div>
          </div>
          <ConditionsSection />
          <CoursesSection />
          <CTASection />
        </main>
      </div>
      <div>
        <BottomNav />
      </div>
    </div>
  )
}

