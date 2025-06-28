"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Home() {
  const router = useRouter()

  const handleStartTraining = () => {
    router.push("/training")
  }

  return (
    <div className="min-h-screen bg-black text-white font-geist">
      <Navbar />

      <main className="pt-32 px-6 md:px-8 max-w-[1920px] mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="flex justify-center mb-16">
            <div className="max-w-7xl w-full">
              <div className="w-full bg-black rounded-lg overflow-hidden shadow-2xl" style={{ aspectRatio: "16/9" }}>
                <img
                  src="/images/hero.jpg"
                  alt="AI Supervisor - Learn and apply superior officer writing styles to incident reports"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <h1
            className="mb-6 font-medium text-white max-w-4xl mx-auto"
            style={{
              fontFamily: "GeistSans, sans-serif",
              fontSize: "clamp(32px, 6vw, 52px)",
              fontWeight: 500,
              letterSpacing: "clamp(-1.5px, -0.04em, -2.08px)",
              lineHeight: "1.15",
              textAlign: "center",
            }}
          >
            Code Four Training Interface
          </h1>

          <p
            className="text-gray-400 max-w-3xl mx-auto mb-12"
            style={{
              fontFamily: "GeistSans, sans-serif",
              fontSize: "clamp(16px, 3vw, 22px)",
              lineHeight: "1.4",
              textAlign: "center",
            }}
          >
            Train our AI to learn and apply your superior officer's writing style to incident reports. Edit sample
            reports, and watch the AI learn your preferences for tone, terminology, and structure.
          </p>

          <Button
            onClick={handleStartTraining}
            className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-medium"
          >
            Start Training Interface
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  )
}
