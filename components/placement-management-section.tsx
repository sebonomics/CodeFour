"use client"

import { Button } from "@/components/ui/button"

interface PlacementManagementSectionProps {
  onOpenInstall?: () => void
}

export default function PlacementManagementSection({ onOpenInstall }: PlacementManagementSectionProps) {
  return (
    <div className="my-24">
      {/* Title and Description */}
      <div className="text-center mb-6 md:mb-12 px-4">
        <h2
          className="mb-4 font-medium"
          style={{
            fontFamily: "GeistSans, sans-serif",
            fontSize: "48px",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: "1.1",
            textAlign: "center",
          }}
        >
          Placement Management & Tracking
        </h2>
        <p
          className="max-w-2xl mx-auto text-gray-400"
          style={{
            fontFamily: "GeistSans, sans-serif",
            fontSize: "18px",
            lineHeight: "1.5",
            textAlign: "center",
          }}
        >
          Track placement quality via built-in ratings and feedback — see every justice-impacted candidate you've placed
          with detailed employment records.
        </p>
      </div>

      {/* Single Full Screen Image - Much wider for home page */}
      <div className="flex justify-center">
        <div className="max-w-7xl w-full">
          <div className="w-full bg-black rounded-lg overflow-hidden shadow-2xl" style={{ aspectRatio: "16/9" }}>
            <img
              src="/images/recent-placements.jpg"
              alt="Placement Management & Tracking Dashboard"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Install Button */}
          {onOpenInstall && (
            <div className="flex justify-center mt-12">
              <Button
                onClick={onOpenInstall}
                className="bg-white hover:bg-gray-100 text-black font-semibold py-3 px-6 rounded-lg shadow-lg"
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
      </div>
    </div>
  )
}
