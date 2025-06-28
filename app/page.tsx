"use client"

import { useState } from "react"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import InstallModal from "@/components/install-modal"

import DeveloperStatsSection from "@/components/developer-stats-section"
import SaveReviewRestoreSection from "@/components/save-review-restore-section"
import RiskAssessmentSection from "@/components/risk-assessment-section"
import PlacementManagementSection from "@/components/placement-management-section"
import AnalyticsDashboardSection from "@/components/analytics-dashboard-section"
import FAQSection from "@/components/faq-section"

/**
 * Home page – now restored with a default export.
 * Uses the same GeistSans font & gradient heading styling
 * that the Features page uses.
 */
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white font-geist">
      {/* Sticky navigation */}
      <Navbar />

      <main className="pt-32 px-6 md:px-8 max-w-[1920px] mx-auto">
        {/* ---------------- Hero ---------------- */}
        <section className="text-center mb-20">
          {/* Hero Image - Much wider and bigger */}
          <div className="flex justify-center mb-16">
            <div className="max-w-7xl w-full">
              <div className="w-full bg-black rounded-lg overflow-hidden shadow-2xl" style={{ aspectRatio: "16/9" }}>
                <img
                  src="/images/hero.jpg"
                  alt="Casrin - Your one-stop AI powerhouse for social work, helping you do it all in one place"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Main Features ---------------- */}
        <SaveReviewRestoreSection />
        <RiskAssessmentSection />
        <PlacementManagementSection />
        <AnalyticsDashboardSection />

        <FAQSection />

        {/* ---------------- Bottom Sections ---------------- */}
        {/* Stats & Organizations */}
        <DeveloperStatsSection />
      </main>

      <Footer />

      {/* Install modal */}
      <InstallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
