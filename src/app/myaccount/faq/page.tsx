"use client";

import { BottomNav } from "@/components/fotter";
import { NavHeader } from "@/components/topnav";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <><NavHeader /><div className="container px-4 md:px-12 lg:px-24 py-6 max-w-3xl mx-auto mb-16 pt-[100px]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-semibold leading-tight text-left md:text-left">
          FAQ about <span className="text-emerald-600"> Pranic Healing</span>
        </h2>
      </div>

      {/* Accordion Section */}
      <Accordion type="single" collapsible className="space-y-4">
        {faqData.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index + 1}`}
            className="border rounded-lg shadow-sm data-[state=open]:border-emerald-600"
          >
            <AccordionTrigger className="p-4 md:p-5 font-medium text-left text-black hide-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 md:px-5 pb-4 md:pb-5 text-gray-600">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <BottomNav />
    </div></>
  );
}

// FAQ Data
const faqData = [
  {
    question: "What is Pranic Healing?",
    answer:
      "Pranic Healing is a holistic, non-touch therapy that uses the concept of life force energy, or prana, to balance and heal the body's energy fields.",
  },
  {
    question: "How does Pranic Healing Work?",
    answer:
      "Pranic Healing works by cleansing and energizing the affected areas with prana or life energy to accelerate the body's natural healing mechanism.",
  },
  {
    question: "Is there any restriction to practice Pranic Healing?",
    answer:
      "No, Pranic Healing can be practiced by anyone willing to learn. There are no age, gender, or religious restrictions.",
  },
  {
    question: "What is required to get into Pranic Healing?",
    answer:
      "A basic understanding of energy and an openness to learn are key requirements. Many people start with foundational courses offered by certified instructors.",
  },
  {
    question: "Can Pranic Healing replace medical treatment?",
    answer:
      "No, Pranic Healing is meant to complement medical treatment, not replace it. Always consult a healthcare professional for serious medical conditions.",
  },
  {
    question: "Are there any side effects of Pranic Healing?",
    answer:
      "Pranic Healing is generally safe and has no known side effects when practiced correctly. However, it should be done under proper guidance.",
  },
  {
    question: "How long does it take to see results from Pranic Healing?",
    answer:
      "The effectiveness of Pranic Healing varies from person to person. Some may experience immediate relief, while others may require multiple sessions.",
  },
  {
    question: "Is Pranic Healing scientifically proven?",
    answer:
      "There are ongoing studies on the effects of Pranic Healing. While many practitioners report benefits, scientific validation is still an evolving field.",
  },
];
