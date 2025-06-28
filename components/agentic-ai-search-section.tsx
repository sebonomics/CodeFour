"use client"
import { Button } from "@/components/ui/button"
import { Download, Shield, Users, TrendingUp, Award } from "lucide-react"

interface AgenticAISearchSectionProps {
  onOpenInstall?: () => void
}

export default function AgenticAISearchSection({ onOpenInstall }: AgenticAISearchSectionProps) {
  const features = [
    {
      icon: Shield,
      title: "Risk Assessment",
      description:
        "Comprehensive evaluation system that analyzes multiple risk factors to ensure proper participant-employer matching.",
      color: "from-red-400 to-orange-500",
    },
    {
      icon: Users,
      title: "Participant Management",
      description:
        "Track every participant's journey from enrollment through placement with detailed progress monitoring.",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description:
        "Real-time insights into program performance, placement rates, and success metrics across all initiatives.",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: Award,
      title: "Placement Tracking",
      description: "Monitor job placements with detailed feedback, ratings, and long-term employment success tracking.",
      color: "from-purple-400 to-pink-500",
    },
  ]

  return (
    <div className="my-24">
      {/* Title and Description */}
      <div className="text-center mb-12 md:mb-16 px-4">
        <h2
          className="mb-6 font-semibold"
          style={{
            backgroundImage: "linear-gradient(rgb(245, 245, 245), rgb(245, 245, 245) 29%, rgb(153, 153, 153))",
            color: "transparent",
            fontFamily: "GeistSans, sans-serif",
            fontSize: "clamp(32px, 6vw, 52px)",
            fontWeight: 600,
            letterSpacing: "clamp(-1.5px, -0.04em, -2.08px)",
            lineHeight: "1.15",
            textAlign: "center",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          Comprehensive Platform Features
        </h2>
        <p
          className="max-w-3xl mx-auto text-white/90 mb-8"
          style={{
            color: "#f5f5f5",
            fontFamily: "GeistMono, monospace",
            fontSize: "clamp(16px, 3vw, 22px)",
            lineHeight: "1.4",
            textAlign: "center",
          }}
        >
          Advanced tools for workforce development programs, from risk assessment to successful job placement.
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
              />

              <div className="relative z-10 flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                  >
                    <feature.icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex-1">
                  <h3
                    className="text-white font-semibold mb-3 text-lg md:text-xl"
                    style={{
                      fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                      lineHeight: "1.3",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-white/80 leading-relaxed"
                    style={{
                      fontFamily: "GeistMono, monospace",
                      fontSize: "15px",
                      lineHeight: "1.6",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <p
          className="text-white/80 mb-8 max-w-3xl mx-auto px-4"
          style={{
            fontFamily: "GeistMono, monospace",
            fontSize: "16px",
            lineHeight: "1.5",
          }}
        >
          Ready to transform your workforce development program with comprehensive tracking and AI-powered matching?
        </p>

        {onOpenInstall && (
          <Button
            onClick={onOpenInstall}
            className="bg-white hover:bg-gray-100 text-black font-mono text-sm font-semibold tracking-wider py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "GeistMono, monospace",
              letterSpacing: "0.56px",
              height: "56px",
            }}
          >
            <Download className="mr-3 h-5 w-5 stroke-[2.5px]" />
            GET STARTED
          </Button>
        )}
      </div>
    </div>
  )
}
