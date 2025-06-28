"use client"

import { Users, Target, BarChart, Shield, Search, Zap, Brain, CheckCircle, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useState } from "react"
import InstallModal from "@/components/install-modal"

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openInstallModal = () => {
    setIsModalOpen(true)
  }

  const testimonials = [
    {
      quote:
        "More than 85% of our participants now complete programs successfully, and they're achieving far better employment outcomes than traditional approaches.",
      author: "SARAH MARTINEZ",
      company: "Second Chance Alliance",
    },
    {
      quote:
        "We've seen our case managers use Casrin as they would a trusted colleague: pairing with the platform through data insights and automated workflows.",
      author: "MICHAEL CHEN",
      company: "Workforce Solutions",
    },
    {
      quote:
        "Traditional case management barely reached 40% efficiency with our team, but with Casrin we hit nearly 95% participant engagement right after implementation.",
      author: "JENNIFER RODRIGUEZ",
      company: "Community Reentry",
    },
    {
      quote:
        "Casrin has transformed the way our workforce teams operate and serve participants, with program completion growing from 60% to over 400 participants in just a few months.",
      author: "DAVID THOMPSON",
      company: "Urban Development",
    },
  ]

  const faqs = [
    {
      question: "How does Casrin secure participant data?",
      answer:
        "All participant data is encrypted with TLS 1.2 in transit and AES 256 at rest, with Privacy Mode enforced by default for workforce development programs ensuring zero data retention of sensitive information. We're SOC2 Type II compliant.",
    },
    {
      question: "Do you support on-premise or private cloud deployment?",
      answer:
        "While we run exclusively on AWS with enterprise-grade security measures and SOC2 Type II compliance, our cloud architecture is designed to match or exceed the performance and security benefits you'd expect from on-premise solutions.",
    },
    {
      question: "Are there volume discounts for large programs?",
      answer: "We currently do not offer volume-based pricing or discounts for workforce development programs.",
    },
    {
      question: "How does Casrin perform with large participant databases?",
      answer:
        "Casrin efficiently handles massive participant databases with hundreds of thousands of records through smart indexing and optimized data structures.",
    },
    {
      question: "Should I use the Enterprise or Professional plan?",
      answer:
        "If you're managing more than 250 participants in your organization, then Enterprise provides additional support and advanced features. Otherwise, our Professional plan offers the exact same core functionality.",
    },
    {
      question: "Can you provide security documentation?",
      answer:
        "Yes, comprehensive security documentation is available at our Trust Center and our dedicated security FAQ section.",
    },
  ]

  return (
    <div className="min-h-screen bg-black pt-20 text-white font-geist">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Wrapper */}
      <div className="max-w-[1920px] mx-auto relative px-6 md:px-8">
        {/* Hero Section */}
        <section className="pt-20 pb-8 font-geist text-white">
          <div className="text-center mb-12">
            <h1
              className="mb-6 font-medium"
              style={{
                fontFamily: "GeistSans, sans-serif",
                fontSize: "clamp(32px, 6vw, 52px)",
                fontWeight: 500,
                letterSpacing: "clamp(-1.5px, -0.04em, -2.08px)",
                lineHeight: "1.15",
                textAlign: "center",
              }}
            >
              Building Bridges To Opportunity
            </h1>
            <p
              className="max-w-3xl mx-auto text-gray-400 mb-8"
              style={{
                fontFamily: "GeistSans, sans-serif",
                fontSize: "clamp(16px, 3vw, 22px)",
                lineHeight: "1.4",
                textAlign: "center",
              }}
            >
              Casrin was founded on the belief that technology can break down barriers and create pathways to meaningful
              employment for justice-impacted individuals.
            </p>
          </div>
        </section>

        {/* Capabilities Section - Masonry Style Layout */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
              {/* Large card - spans 5 columns */}
              <div className="md:col-span-5 bg-white border border-gray-200 rounded-3xl p-8">
                <div className="mb-6">
                  <BarChart className="w-6 h-6 text-gray-700 mb-4" strokeWidth={1.5} />
                </div>
                <h3
                  className="text-gray-900 font-semibold mb-4"
                  style={{
                    fontFamily: "GeistSans, sans-serif",
                    fontSize: "22px",
                    lineHeight: "1.3",
                  }}
                >
                  Measure increased program effectiveness
                </h3>
                <p
                  className="text-gray-600"
                  style={{
                    fontFamily: "GeistSans, sans-serif",
                    fontSize: "15px",
                    lineHeight: "1.5",
                  }}
                >
                  Understand how your participants progress through programs with detailed analytics and success
                  tracking.
                </p>
              </div>

              {/* Medium card - spans 3 columns */}
              <div className="md:col-span-3 bg-white border border-gray-200 rounded-3xl p-6">
                <div className="mb-4">
                  <Shield className="w-6 h-6 text-gray-700 mb-4" strokeWidth={1.5} />
                </div>
                <h3
                  className="text-gray-900 font-semibold mb-3"
                  style={{
                    fontFamily: "GeistSans, sans-serif",
                    fontSize: "18px",
                    lineHeight: "1.3",
                  }}
                >
                  You're in control of how your data is used
                </h3>
                <p
                  className="text-gray-600"
                  style={{
                    fontFamily: "GeistSans, sans-serif",
                    fontSize: "14px",
                    lineHeight: "1.4",
                  }}
                >
                  We protect your participant data with our Privacy Mode Guarantee.
                </p>
              </div>

              {/* Medium card - spans 4 columns */}
              <div className="md:col-span-4 bg-white border border-gray-200 rounded-3xl p-6">
                <div className="mb-4">
                  <Zap className="w-6 h-6 text-gray-700 mb-4" strokeWidth={1.5} />
                </div>
                <h3
                  className="text-gray-900 font-semibold mb-3"
                  style={{
                    fontFamily: "GeistSans, sans-serif",
                    fontSize: "20px",
                    lineHeight: "1.3",
                  }}
                >
                  Powered by the industry's leading AI models
                </h3>
                <p
                  className="text-gray-600"
                  style={{
                    fontFamily: "GeistSans, sans-serif",
                    fontSize: "14px",
                    lineHeight: "1.4",
                  }}
                >
                  Bring advanced matching algorithms and risk assessment directly into your workforce platform.
                </p>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
              {/* Medium card - spans 3 columns */}
              <div className="md:col-span-3 bg-white border border-gray-200 rounded-3xl p-6">
                <div className="mb-4">
                  <Users className="w-6 h-6 text-gray-700 mb-4" strokeWidth={1.5} />
                </div>
                <h3
                  className="text-gray-900 font-semibold mb-3"
                  style={{
                    fontFamily: "GeistSans, sans-serif",
                    fontSize: "18px",
                    lineHeight: "1.3",
                  }}
                >
                  Manage your participants in one place
                </h3>
                <p
                  className="text-gray-600"
                  style={{
                    fontFamily: "GeistSans, sans-serif",
                    fontSize: "14px",
                    lineHeight: "1.4",
                  }}
                >
                  Yes, programs have access to comprehensive tracking and case management with real-time progress
                  monitoring.
                </p>
              </div>

              {/* Large card - spans 6 columns */}
              <div className="md:col-span-6 bg-white border border-gray-200 rounded-3xl p-8">
                <div className="mb-6">
                  <Search className="w-6 h-6 text-gray-700 mb-4" strokeWidth={1.5} />
                </div>
                <h3
                  className="text-gray-900 font-semibold mb-4"
                  style={{
                    fontFamily: "GeistSans, sans-serif",
                    fontSize: "22px",
                    lineHeight: "1.3",
                  }}
                >
                  Context-aware across your participant base
                </h3>
                <p
                  className="text-gray-600"
                  style={{
                    fontFamily: "GeistSans, sans-serif",
                    fontSize: "15px",
                    lineHeight: "1.5",
                  }}
                >
                  Large-scale indexing to get the most out of complex participant databases.
                </p>
              </div>

              {/* Small card - spans 3 columns */}
              <div className="md:col-span-3 bg-white border border-gray-200 rounded-3xl p-6">
                <div className="mb-4">
                  <Target className="w-6 h-6 text-gray-700 mb-4" strokeWidth={1.5} />
                </div>
                <h3
                  className="text-gray-900 font-semibold mb-3"
                  style={{
                    fontFamily: "GeistSans, sans-serif",
                    fontSize: "18px",
                    lineHeight: "1.3",
                  }}
                >
                  Smart job matching
                </h3>
                <p
                  className="text-gray-600"
                  style={{
                    fontFamily: "GeistSans, sans-serif",
                    fontSize: "14px",
                    lineHeight: "1.4",
                  }}
                >
                  Advanced algorithms to match participants with suitable employment opportunities automatically.
                </p>
              </div>
            </div>

            {/* Third Row - Additional Features */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Wide card - spans 4 columns */}
              <div className="md:col-span-4 bg-white border border-gray-200 rounded-3xl p-6">
                <div className="mb-4">
                  <Brain className="w-6 h-6 text-gray-700 mb-4" strokeWidth={1.5} />
                </div>
                <h3
                  className="text-gray-900 font-semibold mb-3"
                  style={{
                    fontFamily: "GeistSans, sans-serif",
                    fontSize: "20px",
                    lineHeight: "1.3",
                  }}
                >
                  AI-powered risk assessment
                </h3>
                <p
                  className="text-gray-600"
                  style={{
                    fontFamily: "GeistSans, sans-serif",
                    fontSize: "14px",
                    lineHeight: "1.4",
                  }}
                >
                  Advanced algorithms evaluate participant readiness and match them with appropriate program tracks.
                </p>
              </div>

              {/* Medium card - spans 5 columns */}
              <div className="md:col-span-5 bg-white border border-gray-200 rounded-3xl p-8">
                <div className="mb-6">
                  <CheckCircle className="w-6 h-6 text-gray-700 mb-4" strokeWidth={1.5} />
                </div>
                <h3
                  className="text-gray-900 font-semibold mb-4"
                  style={{
                    fontFamily: "GeistSans, sans-serif",
                    fontSize: "22px",
                    lineHeight: "1.3",
                  }}
                >
                  Automated compliance tracking
                </h3>
                <p
                  className="text-gray-600"
                  style={{
                    fontFamily: "GeistSans, sans-serif",
                    fontSize: "15px",
                    lineHeight: "1.5",
                  }}
                >
                  Stay compliant with federal and state requirements through automated reporting and documentation
                  management.
                </p>
              </div>

              {/* Small card - spans 3 columns */}
              <div className="md:col-span-3 bg-white border border-gray-200 rounded-3xl p-6">
                <div className="mb-4">
                  <Award className="w-6 h-6 text-gray-700 mb-4" strokeWidth={1.5} />
                </div>
                <h3
                  className="text-gray-900 font-semibold mb-3"
                  style={{
                    fontFamily: "GeistSans, sans-serif",
                    fontSize: "18px",
                    lineHeight: "1.3",
                  }}
                >
                  Success metrics
                </h3>
                <p
                  className="text-gray-600"
                  style={{
                    fontFamily: "GeistSans, sans-serif",
                    fontSize: "14px",
                    lineHeight: "1.4",
                  }}
                >
                  Track program effectiveness with detailed success metrics and outcome reporting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* First Image Break - Matches content width */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/backend-dashboard.jpg"
                alt="Casrin Analytics Dashboard showing comprehensive workforce development metrics"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section - Varied Layout */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-lg transition-all duration-300"
                >
                  <div className="mb-6">
                    <div className="text-gray-900 text-3xl mb-4 font-serif">"</div>
                    <p
                      className="text-gray-900 mb-6"
                      style={{
                        fontFamily: "GeistSans, sans-serif",
                        fontSize: "16px",
                        lineHeight: "1.6",
                      }}
                    >
                      {testimonial.quote}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className="text-gray-900 font-medium"
                        style={{
                          fontFamily: "GeistSans, sans-serif",
                          fontSize: "12px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {testimonial.author}
                      </p>
                    </div>
                    <div className="text-gray-900 font-bold text-sm">{testimonial.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Second Image Break - Matches content width */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/risk-evaluation-dashboard.jpg"
                alt="AI-Powered Risk Assessment Dashboard for participant evaluation"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section - Masonry Style */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <h3
                    className="text-gray-900 font-semibold mb-4"
                    style={{
                      fontFamily: "GeistSans, sans-serif",
                      fontSize: "18px",
                      lineHeight: "1.3",
                    }}
                  >
                    {faq.question}
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{
                      fontFamily: "GeistSans, sans-serif",
                      fontSize: "14px",
                      lineHeight: "1.5",
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
            <h2
              className="mb-6 font-medium"
              style={{
                fontFamily: "GeistSans, sans-serif",
                fontSize: "clamp(32px, 6vw, 52px)",
                fontWeight: 500,
                letterSpacing: "clamp(-1.5px, -0.04em, -2.08px)",
                lineHeight: "1.15",
                textAlign: "center",
              }}
            >
              Join Our Mission
            </h2>
            <p
              className="max-w-2xl mx-auto text-gray-400 mb-8"
              style={{
                fontFamily: "GeistSans, sans-serif",
                fontSize: "clamp(16px, 3vw, 22px)",
                lineHeight: "1.4",
                textAlign: "center",
              }}
            >
              Ready to transform your workforce development program and create lasting change in your community?
            </p>
            <Button
              className="bg-white hover:bg-gray-100 text-black px-6 py-2 rounded-lg shadow-lg"
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
