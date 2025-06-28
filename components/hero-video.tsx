"use client"

import { useEffect, useRef } from "react"

interface HeroVideoProps {
  src: string
  className?: string
}

export default function HeroVideo({ src, className = "" }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Auto-play the video when component mounts
    video.play().catch(() => {
      // Autoplay failed, which is fine for hero videos
    })
  }, [])

  return (
    <video ref={videoRef} className={`w-full h-full object-cover ${className}`} autoPlay muted loop playsInline>
      <source src={src} type="video/mp4" />
      <source src={src} type="video/mov" />
      <source src={src} type="video/webm" />
    </video>
  )
}
