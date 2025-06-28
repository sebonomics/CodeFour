"use client"

import { MapPin, Clock, DollarSign, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useState } from "react"
import InstallModal from "@/components/install-modal"

export default function CareersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openInstallModal = () => {
    setIsModalOpen(true)
  }

  const openPositions = [
    {
      title: "Senior Full-Stack Engineer",
      department: "Engineering",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      salary: "$140k - $180k",
      description:
        "Build and scale our workforce development platform. Work with React, Node.js, and modern cloud infrastructure.",
      requirements: [
        "5+ years of full-stack development experience",
        "Experience with React, Node.js, and cloud platforms",
        "Passion for social impact and second-chance hiring",
        "Strong communication and collaboration skills",
      ],
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      salary: "$120k - $160k",
      description:
        "Drive product strategy and roadmap for our workforce development tools. Work closely with customers and stakeholders.",
      requirements: [
        "3+ years of product management experience",
        "Experience with B2B SaaS products",
        "Understanding of workforce development or social services",
        "Data-driven approach to product decisions",
      ],
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      salary: "$80k - $110k",
      description:
        "Help workforce development programs succeed with our platform. Provide training, support, and strategic guidance.",
      requirements: [
        "2+ years in customer success or account management",
        "Experience with workforce development or social services",
        "Excellent communication and problem-solving skills",
        "Passion for helping others succeed",
      ],
    },
    {
      title: "Data Scientist",
      department: "Engineering",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      salary: "$130k - $170k",
      description:
        "Build AI/ML models for participant matching and risk assessment. Analyze program outcomes and effectiveness.",
      requirements: [
        "PhD or Masters in Data Science, Statistics, or related field",
        "Experience with Python, SQL, and ML frameworks",
        "Interest in social impact and criminal justice reform",
        "Strong analytical and communication skills",
      ],
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      salary: "$100k - $140k",
      description:
        "Design intuitive interfaces for workforce development professionals. Focus on accessibility and user experience.",
      requirements: [
        "3+ years of UX/UI design experience",
        "Portfolio demonstrating B2B product design",
        "Experience with Figma and design systems",
        "Understanding of accessibility principles",
      ],
    },
    {
      title: "Sales Development Representative",
      department: "Sales",
      location: "Remote",
      type: "Full-time",
      salary: "$60k - $80k + commission",
      description:
        "Generate leads and build relationships with workforce development organizations. Help expand our impact.",
      requirements: [
        "1+ years of sales or business development experience",
        "Interest in social impact and nonprofit sector",
        "Strong communication and relationship-building skills",
        "Self-motivated and goal-oriented",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-black pt-20 text-white font-geist">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Wrapper */}
      <div className="max-w-[1920px] mx-auto relative px-6 md:px-8">
        {/* Open Positions */}
        <section className="pt-20 pb-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
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
                Open Positions
              </h2>
              <p
                className="max-w-3xl mx-auto text-gray-400"
                style={{
                  fontFamily: "GeistSans, sans-serif",
                  fontSize: "clamp(16px, 3vw, 22px)",
                  lineHeight: "1.4",
                  textAlign: "center",
                }}
              >
                Join our growing team and help us scale our impact.
              </p>
            </div>

            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h3
                          className="text-white font-medium"
                          style={{
                            fontFamily: "GeistSans, sans-serif",
                            fontSize: "20px",
                            lineHeight: "1.3",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {position.title}
                        </h3>
                        <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm">
                          {position.department}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mb-4 text-white/70">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{position.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{position.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          <span className="text-sm">{position.salary}</span>
                        </div>
                      </div>

                      <p
                        className="text-gray-400 mb-4"
                        style={{
                          fontFamily: "GeistSans, sans-serif",
                          fontSize: "15px",
                          lineHeight: "1.5",
                        }}
                      >
                        {position.description}
                      </p>

                      <div>
                        <h4
                          className="text-white font-medium mb-2"
                          style={{
                            fontFamily: "GeistSans, sans-serif",
                            fontSize: "16px",
                          }}
                        >
                          Requirements:
                        </h4>
                        <ul className="space-y-1">
                          {position.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-white/60 rounded-full mt-2 flex-shrink-0" />
                              <span
                                className="text-gray-400 text-sm"
                                style={{
                                  fontFamily: "GeistSans, sans-serif",
                                  lineHeight: "1.5",
                                }}
                              >
                                {req}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <Button
                        className="bg-white hover:bg-gray-100 text-black font-mono text-sm font-semibold tracking-wider py-3 px-6 rounded-lg"
                        onClick={() =>
                          window.open("mailto:careers@casrin.dev?subject=Application for " + position.title, "_blank")
                        }
                        style={{
                          fontFamily: "GeistSans, sans-serif",
                          letterSpacing: "0.32px",
                          height: "48px",
                        }}
                      >
                        <Briefcase className="mr-2 h-4 w-4" />
                        Apply
                      </Button>
                    </div>
                  </div>
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
              Don't See The Right Role?
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
              We're always looking for passionate people who want to make a difference. Send us your resume and tell us
              how you'd like to contribute.
            </p>
            <Button
              className="bg-white hover:bg-gray-100 text-black px-6 py-2 rounded-lg shadow-lg"
              onClick={() => window.open("mailto:careers@casrin.dev?subject=General Application", "_blank")}
              style={{
                fontFamily: "GeistSans, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                letterSpacing: "0.32px",
                height: "40px",
              }}
            >
              Get In Touch
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
