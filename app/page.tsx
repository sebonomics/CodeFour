import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Zap, Shield, Clock, FileText, Brain, Target } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import TestimonialsSection from "@/components/testimonials-section"
import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white font-geist">
      <Navbar />

      {/* Main Content - Just the two images */}
      <main className="pt-24 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* First Image */}
          <div className="w-full">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vincent%20m_Poster%20Gradient_01.png-v56KaZKNvu61Y3ZptbsX5gqYEMyiav.jpeg"
              alt="Code Four Training Interface"
              width={1400}
              height={800}
              className="w-full h-auto rounded-2xl"
              priority
            />
          </div>

          {/* Three-column feature section with images and captions */}
          <section className="w-full flex justify-center">
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl px-6 py-12 flex flex-col items-center">
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Smart Phrases */}
                <div className="flex flex-col items-center">
                  <img
                    src="/images/feature-smart-phrases.jpg"
                    alt="Smart Phrases"
                    className="rounded-xl shadow-md w-full max-w-xs object-cover mb-4"
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Smart Phrases</h3>
                    <p className="text-gray-700 text-sm">Not just your words, but how you use them — we track your phrases through every single detail.</p>
                  </div>
                </div>
                {/* Find Patterns */}
                <div className="flex flex-col items-center">
                  <img
                    src="/images/feature-find-patterns.jpg"
                    alt="Find Patterns"
                    className="rounded-xl shadow-md w-full max-w-xs object-cover mb-4"
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Find Patterns</h3>
                    <p className="text-gray-700 text-sm">Find consistencies across your reports, and our models will learn from them — word for word.</p>
                  </div>
                </div>
                {/* See Your Style */}
                <div className="flex flex-col items-center">
                  <img
                    src="/images/feature-see-your-style.jpg"
                    alt="See Your Style"
                    className="rounded-xl shadow-md w-full max-w-xs object-cover mb-4"
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">See Your Style</h3>
                    <p className="text-gray-700 text-sm">See how your writing style and teach your Code Four assistant how to write like you within seconds.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Text Section Between Images */}
          <div className="text-center py-16">
            <div className="max-w-4xl mx-auto">
              <h2 
                className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent"
                style={{
                  fontFamily: 'var(--font-geist-sans), "GeistSans Fallback", sans-serif',
                  fontWeight: "600",
                  letterSpacing: "-0.04em",
                  lineHeight: "1.1",
                }}
              >
                AI Supervisor Training Interface
              </h2>
              <p 
                className="text-xl md:text-2xl text-white/80 leading-relaxed mb-8"
                style={{
                  fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                  fontWeight: "500",
                }}
              >
                Train AI to learn and apply superior officer writing styles to incident reports. 
                Advanced pattern recognition for law enforcement documentation.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <div className="flex items-center gap-3 text-white/70">
                  <span 
                    className="text-lg"
                    style={{
                      fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                      fontWeight: "500",
                    }}
                  >
                    Style Learning
                  </span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <span 
                    className="text-lg"
                    style={{
                      fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                      fontWeight: "500",
                    }}
                  >
                    Pattern Recognition
                  </span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <span 
                    className="text-lg"
                    style={{
                      fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                      fontWeight: "500",
                    }}
                  >
                    Law Enforcement
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Second Image */}
          <div className="w-full">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vincent%20m_Poster%20Gradient_14.png-3XZ59jvTtn1HtGYi0D4gaHHr1St22v.jpeg"
              alt="Code Four Style Analysis"
              width={1400}
              height={800}
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
