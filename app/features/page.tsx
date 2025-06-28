"use client"

import { Users, BarChart, Shield, TrendingUp, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useState } from "react"
import InstallModal from "@/components/install-modal"

export default function FeaturesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openInstallModal = () => {
    setIsModalOpen(true)
  }

  const mainFeatures = [
    {
      title: "A comprehensive solution",
      description:
        "Our platform provides end-to-end workforce development tools designed for justice-impacted individuals and fair-chance employers.",
      icon: Users,
      image: "/images/backend-dashboard.jpg",
    },
    {
      title: "Ready for enterprise scale",
      description:
        "Battle-tested to handle large participant databases with thousands of candidates and support development teams of any size.",
      icon: TrendingUp,
      image: "/images/risk-evaluation-dashboard.jpg",
    },
    {
      title: "Committed to security",
      description:
        "SOC2 Type II certified, Enforced Privacy Mode, and Zero Data Retention to make sure your proprietary data stays safe.",
      icon: Shield,
      image: "/images/recent-placements.jpg",
    },
  ]

  const detailedFeatures = [
    {
      icon: BarChart,
      title: "Measure increased program effectiveness",
      description:
        "Understand how your participants progress through programs with detailed analytics and success tracking.",
      image: "/images/backend-dashboard.jpg",
    },
    {
      icon: Shield,
      title: "You're in control of how your data is used",
      description: "We protect your participant data with our Privacy Mode Guarantee.",
      image: "/images/risk-evaluation-dashboard.jpg",
    },
    {
      icon: Brain,
      title: "Powered by the industry's leading AI models",
      description: "Bring advanced matching algorithms and risk assessment directly into your workforce platform.",
      image: "/images/recent-placements.jpg",
    },
    {
      icon: Users,
      title: "Manage your participants in one place",
      description:
        "Yes, programs have access to comprehensive tracking and case management with real-time progress monitoring.",
      image: "/images/backend-dashboard.jpg",
    },
  ]

  const capabilityFeatures = [
    {
      title: "Finds Context",
      description:
        "Using advanced analytics, our platform can understand participant progress patterns. This reduces the need to manually track individual cases.",
      image: "/images/agentic-suggestions.jpg",
    },
    {
      title: "Runs Workflows",
      description:
        "Casrin can automatically process applications and schedule interviews. By default, you'll be asked to confirm all placements.",
      image: "/images/social-work-agents.jpg",
    },
    {
      title: "Loops on Success",
      description:
        "Casrin can detect placement issues automatically and apply interventions, reducing the need for manual case management.",
      image: "/images/complete-accuracy-chat.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-black pt-20 text-white font-geist">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Wrapper */}
      <div className="max-w-[1200px] mx-auto relative px-6 md:px-8">
        {/* Hero Section - Centered */}
        <section className="pt-20 pb-8 font-geist">
          <div className="text-center mb-12">
            <h1
              className="mb-4 font-medium text-white"
              style={{
                fontFamily: "GeistSans, sans-serif",
                fontSize: "48px",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: "1.1",
              }}
            >
              Build Workforce Programs Faster
            </h1>
            <p
              className="text-gray-400 max-w-2xl mx-auto"
              style={{
                fontFamily: "GeistSans, sans-serif",
                fontSize: "18px",
                lineHeight: "1.5",
              }}
            >
              Casrin is built for workforce development teams that want more out of their participant management
              experience.
            </p>
          </div>

          {/* Main Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {mainFeatures.map((feature, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="p-6">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                  <h3
                    className="text-gray-900 font-medium mb-4"
                    style={{
                      fontFamily: "GeistSans, sans-serif",
                      fontSize: "20px",
                      lineHeight: "1.3",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{
                      fontFamily: "GeistSans, sans-serif",
                      fontSize: "15px",
                      lineHeight: "1.5",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Full-size Image Break - Finds Context - Above first two detailed features */}
        <section className="py-8">
          <div className="w-full">
            <div className="w-full bg-black rounded-lg overflow-hidden shadow-2xl" style={{ aspectRatio: "16/9" }}>
              <img
                src="/images/agentic-suggestions.jpg"
                alt="AI-powered context finding and participant analytics"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Detailed Features Grid - First two features with improved spacing */}
        <section className="py-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {detailedFeatures.slice(0, 2).map((feature, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="p-6">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                  <h3
                    className="text-gray-900 font-medium mb-3"
                    style={{
                      fontFamily: "GeistSans, sans-serif",
                      fontSize: "18px",
                      lineHeight: "1.3",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{
                      fontFamily: "GeistSans, sans-serif",
                      fontSize: "15px",
                      lineHeight: "1.5",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Features Grid - Remaining features with improved spacing */}
        <section className="py-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {detailedFeatures.slice(2).map((feature, index) => (
              <div key={index + 2} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="p-6">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                  <h3
                    className="text-gray-900 font-medium mb-3"
                    style={{
                      fontFamily: "GeistSans, sans-serif",
                      fontSize: "18px",
                      lineHeight: "1.3",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{
                      fontFamily: "GeistSans, sans-serif",
                      fontSize: "15px",
                      lineHeight: "1.5",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Full-size Image Break - Runs Workflows */}
        <section className="py-8">
          <div className="w-full">
            <div className="w-full bg-black rounded-lg overflow-hidden shadow-2xl" style={{ aspectRatio: "16/9" }}>
              <img
                src="/images/social-work-agents.jpg"
                alt="Automated workflow management and social work agents"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Capability Features Section - All Three Bubbles */}
        <section className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {capabilityFeatures.map((feature, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="p-6">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                  <h3
                    className="text-gray-900 font-medium mb-3"
                    style={{
                      fontFamily: "GeistSans, sans-serif",
                      fontSize: "20px",
                      lineHeight: "1.3",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{
                      fontFamily: "GeistSans, sans-serif",
                      fontSize: "15px",
                      lineHeight: "1.5",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12">
          <div className="text-center bg-white border border-gray-200 rounded-xl p-12">
            <h2
              className="mb-4 font-medium text-gray-900"
              style={{
                fontFamily: "GeistSans, sans-serif",
                fontSize: "32px",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: "1.2",
              }}
            >
              Ready to transform your workforce program?
            </h2>
            <p
              className="text-gray-600 mb-8 max-w-2xl mx-auto"
              style={{
                fontFamily: "GeistSans, sans-serif",
                fontSize: "18px",
                lineHeight: "1.5",
              }}
            >
              Join thousands of workforce development professionals who trust Casrin for participant management and job
              placement.
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
