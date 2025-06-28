"use client"

import { useEffect, useRef, useState } from "react"

interface FeatureVideoProps {
  src: string
  alt: string
  fallbackSrc?: string
  fixedAspectRatio?: boolean
}

export default function FeatureVideo({ src, alt, fallbackSrc, fixedAspectRatio = false }: FeatureVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            video.play().catch(() => {
              setHasError(true)
            })
          } else {
            setIsInView(false)
            video.pause()
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleError = () => {
    setHasError(true)
  }

  if (hasError && fallbackSrc) {
    return (
      <img
        src={fallbackSrc || "/placeholder.svg"}
        alt={alt}
        className={`w-full h-full object-cover ${fixedAspectRatio ? "aspect-video" : ""}`}
      />
    )
  }

  return (
    <video
      ref={videoRef}
      className={`w-full h-full object-cover ${fixedAspectRatio ? "aspect-video" : ""}`}
      muted
      loop
      playsInline
      onError={handleError}
    >
      <source src={src} type="video/mp4" />
      {fallbackSrc && <img src={fallbackSrc || "/placeholder.svg"} alt={alt} className="w-full h-full object-cover" />}
    </video>
  )
}
