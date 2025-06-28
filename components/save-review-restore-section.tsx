"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface FeatureData {
  id: string
  title: string
  description: string
  imageSrc: string
  thumbnailSrc: string
  videoSrc?: string
  fallbackSrc?: string
}

const features: FeatureData[] = [
  {
    id: "track",
    title: "Track",
    description: "Monitor real-time timeline of every milestone — applications, interviews, and placements.",
    imageSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OutsideConnection%20Figma.jpg-Y01GZs28FP68uviZY3rBwsi3WG8rn0.jpeg",
    thumbnailSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OutsideConnection%20Figma.jpg-Y01GZs28FP68uviZY3rBwsi3WG8rn0.jpeg",
  },
  {
    id: "match",
    title: "Match",
    description: "Instantly match qualified candidates to fair-chance roles with detailed assessments.",
    imageSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OutsideConnection%20Figma%201.jpg-tczTOjv4EfuKq27KscahRDzTDvcaTt.jpeg",
    thumbnailSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OutsideConnection%20Figma%201.jpg-tczTOjv4EfuKq27KscahRDzTDvcaTt.jpeg",
  },
  {
    id: "place",
    title: "Place",
    description: "See tailored job opportunities ranked by match percentage with one-click placement.",
    imageSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OutsideConnection%20Figma%202.jpg-qJKGiJ5mvNXkH57HX0QPIsW0nqZmAM.jpeg",
    thumbnailSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OutsideConnection%20Figma%202.jpg-qJKGiJ5mvNXkH57HX0QPIsW0nqZmAM.jpeg",
  },
]

interface SaveReviewRestoreSectionProps {
  onOpenInstall?: () => void
}

export default function SaveReviewRestoreSection({ onOpenInstall }: SaveReviewRestoreSectionProps) {
  const [activeFeature, setActiveFeature] = useState(features[0])
  const [videosLoaded, setVideosLoaded] = useState<{ [key: string]: boolean }>({})
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})

  // Preload all videos when component mounts
  useEffect(() => {
    const loadedState = { ...videosLoaded }

    // Preload all videos but don't autoplay
    features.forEach((feature) => {
      const video = document.createElement("video")
      video.muted = true
      video.preload = "auto"
      video.playsInline = true
      video.loop = true
      // Remove autoplay - videos will be controlled by intersection observer

      video.onloadeddata = () => {
        setVideosLoaded((prev) => ({
          ...prev,
          [feature.id]: true,
        }))
      }

      video.onerror = () => {
        if (feature.fallbackSrc) {
          video.src = feature.fallbackSrc
        }
      }

      video.src = feature.videoSrc
      loadedState[feature.id] = false
    })

    setVideosLoaded(loadedState)
  }, [])

  // Add automatic cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((current) => {
        const currentIndex = features.findIndex((f) => f.id === current.id)
        const nextIndex = (currentIndex + 1) % features.length
        return features[nextIndex]
      })
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="my-24">
      {/* Title and Description outside the gradient section */}
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
          Track, Match, Place
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
          From application to placement — streamline workforce development with AI-powered matching and real-time
          tracking.
        </p>
      </div>

      {/* Simple Image Section - Much wider for home page */}
      <div className="flex justify-center">
        <div className="max-w-7xl w-full relative">
          <div className="w-full bg-black rounded-lg overflow-hidden shadow-2xl" style={{ aspectRatio: "16/9" }}>
            <img
              src={activeFeature.imageSrc || "/placeholder.svg"}
              alt={activeFeature.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Install Button - positioned below thumbnails */}
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
