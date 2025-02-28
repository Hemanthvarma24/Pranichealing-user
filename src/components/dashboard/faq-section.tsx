import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  return (
    <div className="px-6 md:px-10 lg:px-20 mb-10 max-w-3xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
          FAQ about <br className="md:hidden" />
          <span className="text-emerald-600">Pranic Healing</span>
        </h2>
        <button className="text-sm md:text-base text-black pt-2 md:pt-0 font-medium">
          View All
        </button>
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
    </div>
  )
}

// FAQ Data
const faqData = [
  {
    question: "What is Pranic Healing?",
    answer: "Pranic healing is a holistic, non-touch therapy that uses the concept of life force energy, or prana, to balance and heal the body's energy fields.",
  },
  {
    question: "How Pranic Healing Works?",
    answer: "Pranic Healing works by cleansing and energizing the affected areas with prana or life energy to accelerate the body's natural healing mechanism.",
  },
  {
    question: "Is there any restriction to practice Pranic Healing?",
    answer: "No, Pranic Healing can be practiced by anyone willing to learn. There are no age, gender, or religious restrictions.",
  },
  {
    question: "What is required to get into Pranic Healing?",
    answer: "A basic understanding of energy and an openness to learn are key requirements. Many people start with foundational courses offered by certified instructors.",
  },
]
