"use client"

import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useState } from "react"
import InstallModal from "@/components/install-modal"

export default function PricingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  const openInstallModal = () => {
    setIsModalOpen(true)
  }

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small workforce programs",
      price: billingCycle === "monthly" ? 49 : 490,
      period: billingCycle === "monthly" ? "/month" : "/year",
      savings: billingCycle === "annual" ? "Save $98/year" : null,
      features: [
        "Up to 50 participants",
        "Basic risk assessment",
        "Standard matching engine",
        "Email support",
        "Basic analytics dashboard",
        "1 program location",
      ],
      limitations: ["Advanced AI features", "Custom integrations", "Priority support"],
    },
    {
      name: "Professional",
      description: "For growing workforce development teams",
      price: billingCycle === "monthly" ? 149 : 1490,
      period: billingCycle === "monthly" ? "/month" : "/year",
      savings: billingCycle === "annual" ? "Save $298/year" : null,
      features: [
        "Up to 500 participants",
        "Advanced AI risk assessment",
        "Smart matching with ML",
        "Priority email & chat support",
        "Advanced analytics & reporting",
        "Up to 5 program locations",
        "Custom workflows",
        "API access",
        "Employer network management",
      ],
      limitations: ["White-label options", "Dedicated account manager"],
    },
    {
      name: "Enterprise",
      description: "For large-scale workforce programs",
      price: "Custom",
      period: "",
      savings: null,
      features: [
        "Unlimited participants",
        "Full AI suite with custom models",
        "Enterprise-grade matching",
        "24/7 dedicated support",
        "Custom analytics & BI integration",
        "Unlimited locations",
        "White-label platform",
        "Dedicated account manager",
        "Custom integrations",
        "SOC2 compliance",
        "SLA guarantees",
      ],
      limitations: [],
    },
  ]

  const faqs = [
    {
      question: "Can I change plans at any time?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments.",
    },
    {
      question: "What happens if I exceed my participant limit?",
      answer:
        "We'll notify you when you're approaching your limit. You can either upgrade your plan or we'll temporarily allow overages with additional per-participant charges.",
    },
    {
      question: "Do you offer discounts for non-profits?",
      answer:
        "Yes, we offer special pricing for qualified non-profit organizations. Contact our sales team to learn more about our non-profit discount program.",
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a 14-day free trial of our Professional plan. No credit card required to get started.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "All plans include email support. Professional plans add chat support, and Enterprise includes 24/7 phone support with a dedicated account manager.",
    },
    {
      question: "How does billing work?",
      answer:
        "We bill monthly or annually based on your chosen plan. Annual plans receive a 17% discount. All payments are processed securely and you'll receive detailed invoices.",
    },
  ]

  return (
    <div className="min-h-screen bg-black pt-20 text-white font-geist">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Wrapper */}
      <div className="max-w-[1200px] mx-auto relative px-6 md:px-8">
        {/* Hero Section */}
        <section className="pt-20 pb-16 font-geist">
          <div className="text-center mb-16">
            <h1
              className="mb-6 font-medium text-white"
              style={{
                fontFamily: "GeistSans, sans-serif",
                fontSize: "clamp(32px, 6vw, 52px)",
                fontWeight: 500,
                letterSpacing: "clamp(-1.5px, -0.04em, -2.08px)",
                lineHeight: "1.15",
                textAlign: "center",
              }}
            >
              Simple, Transparent Pricing
            </h1>
            <p
              className="text-gray-400 max-w-2xl mx-auto mb-12"
              style={{
                fontFamily: "GeistSans, sans-serif",
                fontSize: "clamp(16px, 3vw, 22px)",
                lineHeight: "1.4",
                textAlign: "center",
              }}
            >
              Choose the plan that fits your workforce development program. Scale as you grow.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-16">
              <span className={`text-sm ${billingCycle === "monthly" ? "text-white" : "text-white/60"}`}>Monthly</span>
              <button
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  billingCycle === "annual" ? "bg-white" : "bg-white/20"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${
                    billingCycle === "annual" ? "translate-x-7 bg-black" : "translate-x-1 bg-white"
                  }`}
                />
              </button>
              <span className={`text-sm ${billingCycle === "annual" ? "text-white" : "text-white/60"}`}>
                Annual <span className="text-green-400">(Save 17%)</span>
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="p-8">
                  <div className="mb-8">
                    <h3
                      className="text-gray-900 font-medium mb-3"
                      style={{
                        fontFamily: "GeistSans, sans-serif",
                        fontSize: "24px",
                        fontWeight: 600,
                        lineHeight: "1.3",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className="text-gray-600 mb-6"
                      style={{
                        fontFamily: "GeistSans, sans-serif",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "1.5",
                      }}
                    >
                      {plan.description}
                    </p>
                    <div className="flex items-baseline gap-2 mb-2">
                      {typeof plan.price === "number" ? (
                        <>
                          <span
                            className="text-gray-900 font-bold"
                            style={{
                              fontFamily: "GeistSans, sans-serif",
                              fontSize: "42px",
                              fontWeight: 700,
                              lineHeight: "1.1",
                            }}
                          >
                            ${plan.price}
                          </span>
                          <span
                            className="text-gray-600"
                            style={{
                              fontFamily: "GeistSans, sans-serif",
                              fontSize: "18px",
                              fontWeight: 400,
                            }}
                          >
                            {plan.period}
                          </span>
                        </>
                      ) : (
                        <span
                          className="text-gray-900 font-bold"
                          style={{
                            fontFamily: "GeistSans, sans-serif",
                            fontSize: "42px",
                            fontWeight: 700,
                            lineHeight: "1.1",
                          }}
                        >
                          {plan.price}
                        </span>
                      )}
                    </div>
                    {plan.savings && (
                      <p
                        className="text-green-600"
                        style={{
                          fontFamily: "GeistSans, sans-serif",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        {plan.savings}
                      </p>
                    )}
                  </div>

                  <Button
                    className="w-full mb-8 bg-black text-white hover:bg-gray-800 border-0"
                    onClick={openInstallModal}
                    style={{
                      fontFamily: "GeistSans, sans-serif",
                      fontSize: "16px",
                      fontWeight: 600,
                      letterSpacing: "0.32px",
                      height: "52px",
                    }}
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>

                  {/* Plan Details Accordion */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="features" className="border-gray-200">
                      <AccordionTrigger
                        className="text-gray-900 hover:text-gray-700"
                        style={{
                          fontFamily: "GeistSans, sans-serif",
                          fontSize: "16px",
                          fontWeight: 400,
                        }}
                      >
                        What's included
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <div className="space-y-4">
                          {plan.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-start gap-3">
                              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span
                                className="text-gray-700"
                                style={{
                                  fontFamily: "GeistSans, sans-serif",
                                  fontSize: "14px",
                                  fontWeight: 400,
                                  lineHeight: "1.5",
                                }}
                              >
                                {feature}
                              </span>
                            </div>
                          ))}
                          {plan.limitations.length > 0 && (
                            <>
                              <div className="border-t border-gray-200 pt-4 mt-4">
                                <p
                                  className="text-gray-500 mb-3"
                                  style={{
                                    fontFamily: "GeistSans, sans-serif",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                  }}
                                >
                                  Not included:
                                </p>
                                {plan.limitations.map((limitation, limitationIndex) => (
                                  <div key={limitationIndex} className="flex items-start gap-3 mb-2">
                                    <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                    <span
                                      className="text-gray-500"
                                      style={{
                                        fontFamily: "GeistSans, sans-serif",
                                        fontSize: "14px",
                                        fontWeight: 400,
                                        lineHeight: "1.5",
                                      }}
                                    >
                                      {limitation}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="text-center mb-16">
            <h2
              className="mb-6 font-medium text-white"
              style={{
                fontFamily: "GeistSans, sans-serif",
                fontSize: "clamp(32px, 6vw, 52px)",
                fontWeight: 500,
                letterSpacing: "clamp(-1.5px, -0.04em, -2.08px)",
                lineHeight: "1.15",
                textAlign: "center",
              }}
            >
              Frequently Asked Questions
            </h2>
            <p
              className="text-gray-400 max-w-2xl mx-auto"
              style={{
                fontFamily: "GeistSans, sans-serif",
                fontSize: "clamp(16px, 3vw, 22px)",
                lineHeight: "1.4",
                textAlign: "center",
              }}
            >
              Everything you need to know about our pricing and plans.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white border border-gray-200 rounded-xl px-8 py-2"
                >
                  <AccordionTrigger
                    className="text-gray-900 hover:text-gray-700 text-left"
                    style={{
                      fontFamily: "GeistSans, sans-serif",
                      fontSize: "18px",
                      fontWeight: 400,
                      lineHeight: "1.4",
                    }}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
                    <p
                      className="text-gray-600"
                      style={{
                        fontFamily: "GeistSans, sans-serif",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "1.6",
                      }}
                    >
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="text-center bg-white border border-gray-200 rounded-xl p-16">
            <h2
              className="mb-6 font-medium text-gray-900"
              style={{
                fontFamily: "GeistSans, sans-serif",
                fontSize: "clamp(32px, 6vw, 52px)",
                fontWeight: 500,
                letterSpacing: "clamp(-1.5px, -0.04em, -2.08px)",
                lineHeight: "1.15",
                textAlign: "center",
              }}
            >
              Ready To Get Started?
            </h2>
            <p
              className="text-gray-600 mb-10 max-w-2xl mx-auto"
              style={{
                fontFamily: "GeistSans, sans-serif",
                fontSize: "clamp(16px, 3vw, 22px)",
                lineHeight: "1.4",
                textAlign: "center",
              }}
            >
              Start your 14-day free trial today. No credit card required.
            </p>
            <Button
              className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg"
              onClick={openInstallModal}
              style={{
                fontFamily: "GeistSans, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                letterSpacing: "0.32px",
                height: "40px",
              }}
            >
              Sign Up
            </Button>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>

      {/* Install Modal */}
      <InstallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
