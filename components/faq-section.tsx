"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    question: "How does Casrin protect sensitive participant data?",
    answer:
      "All participant data is encrypted with TLS 1.2+ in transit and AES-256 at rest. We're SOC2 Type II compliant with zero data retention policies for sensitive information. Privacy Mode is enforced by default for all workforce development programs.",
  },
  {
    question: "Can Casrin integrate with our existing case management system?",
    answer:
      "Yes — Casrin offers API integrations with most major case management platforms. We support data import/export and real-time sync with systems like Salesforce, ServiceNow, and custom databases.",
  },
  {
    question: "How accurate is the AI matching for job placements?",
    answer:
      "Our AI matching achieves 85%+ placement success rates in pilot programs. The system learns from your program's specific outcomes and continuously improves matching accuracy over time.",
  },
  {
    question: "Do you work with justice-impacted individuals specifically?",
    answer:
      "Absolutely. Casrin was built specifically for workforce development programs serving justice-impacted populations. Our risk assessment tools and employer matching are designed with second-chance hiring in mind.",
  },
  {
    question: "What happens to participant data if we stop using Casrin?",
    answer:
      "You maintain full ownership of your data. We provide complete data export in standard formats, and all your information is permanently deleted from our systems within 30 days of account closure.",
  },
  {
    question: "Can multiple case managers access the same participant files?",
    answer:
      "Yes — with role-based permissions and audit trails. You control who can view, edit, or share participant information while maintaining complete compliance with privacy regulations.",
  },
]

interface FAQSectionProps {
  onOpenInstall?: () => void
}

export default function FAQSection({ onOpenInstall }: FAQSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2
          className="text-center mb-12 md:mb-16 font-medium"
          style={{
            fontFamily: "GeistSans, sans-serif",
            fontSize: "48px",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: "1.1",
            textAlign: "center",
          }}
        >
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-white/10 rounded-lg bg-white/5 overflow-hidden"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <span
                  className="text-left font-medium text-white"
                  style={{
                    fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                    fontSize: "18px",
                  }}
                >
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 pt-0">
                <p
                  className="text-white/80"
                  style={{
                    fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                    fontSize: "15px",
                    lineHeight: "1.5",
                  }}
                >
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Call to action */}
        {onOpenInstall && (
          <div className="mt-12 md:mt-16 text-center">
            <Button
              onClick={onOpenInstall}
              className="bg-white hover:bg-gray-100 text-black font-semibold py-3 px-6 rounded-lg"
              style={{
                fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                fontSize: "14px",
                fontWeight: "500",
                height: "48px",
              }}
            >
              Get Started
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
