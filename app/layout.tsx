import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { GeistSans } from "geist/font/sans"

export const metadata: Metadata = {
  title: "Casrin - Workforce Development Platform",
  description:
    "Comprehensive platform for workforce development programs, from risk assessment to successful job placement.",
  openGraph: {
    title: "Casrin - Workforce Development Platform",
    description:
      "Comprehensive platform for workforce development programs, from risk assessment to successful job placement.",
    images: [
      {
        url: "/images/og-new.jpeg",
        width: 1200,
        height: 630,
        alt: "Workforce Development Platform",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Casrin - Workforce Development Platform",
    description:
      "Comprehensive platform for workforce development programs, from risk assessment to successful job placement.",
    images: ["/images/og-new.jpeg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@geist-ui/core@latest/dist/geist-ui.css" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
