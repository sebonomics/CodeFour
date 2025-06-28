"use client"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import InstallModal from "@/components/install-modal"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false)
  const pathname = usePathname()

  // Debounce the scroll handler to prevent flickering
  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 10
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled)
    }
  }, [scrolled])

  useEffect(() => {
    // Initial check on mount
    handleScroll()

    // Add event listener with passive option for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  // Apply styles consistently
  const navStyle = {
    boxShadow: scrolled ? "0 0 0 0 rgba(0,0,0,0), 0 0 0 0 rgba(0,0,0,0), 0 5px 18px 0 rgba(204,204,204,0.1)" : "none",
    border: scrolled ? "1px solid #1a1a1a" : "1px solid transparent",
    borderRadius: "16px",
    transition: "all 0.3s ease-in-out",
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/training", label: "Trainer" },
  ]

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 md:px-8 transition-all duration-300">
        <div className="w-[calc(100%-24px)] max-w-[1400px] mt-4">
          <nav
            className="flex items-center justify-between p-2 h-16 bg-black rounded-[16px] text-white font-geist"
            style={navStyle}
          >
            {/* Logo */}
            <div className="flex items-center ml-[15px]">
              <Link href="/" className="flex items-center">
                <div className="mr-2 w-7 h-7 relative">
                  <Image
                    src="/images/code-four-logo.png"
                    alt="Code Four Logo"
                    width={28}
                    height={28}
                    className="rounded-sm"
                  />
                </div>
                <span
                  className="logo-text"
                  style={{
                    fontFamily: 'var(--font-geist-sans), "GeistSans Fallback", sans-serif',
                    fontSize: "18px",
                    lineHeight: "1.1",
                    fontWeight: "600",
                    letterSpacing: "-0.04em",
                    color: "#FFFFFF",
                    width: "auto",
                    height: "auto",
                  }}
                >
                  Code Four
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-between flex-1 ml-8">
              {/* Centered Navigation Links */}
              <div className="flex items-center justify-center flex-1">
                <div className="flex items-center gap-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-sm font-medium transition-colors hover:text-white ${
                        pathname === link.href ? "text-white" : "text-white/70"
                      }`}
                      style={{
                        fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right-aligned Auth Buttons */}
              <div className="flex items-center gap-3">
                <a href="https://outsideconnection.vercel.app/auth/login">
                  <Button
                    className="bg-transparent hover:bg-white/10 border border-white/30 rounded-lg px-4"
                    style={{
                      fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#FFFFFF",
                      height: "40px",
                    }}
                  >
                    Login
                  </Button>
                </a>
                <a href="https://outsideconnection.vercel.app/auth/signup">
                  <Button
                    className="bg-white text-black hover:bg-gray-200 px-4 rounded-lg"
                    style={{
                      fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#000000",
                      height: "40px",
                    }}
                  >
                    Sign Up
                  </Button>
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden flex items-center justify-center mr-2 p-2 rounded-md hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </button>
          </nav>

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)} />
          )}

          {/* Mobile Menu */}
          <div
            className={`fixed top-[76px] right-6 w-[calc(100%-48px)] max-w-[400px] bg-black border border-[#1a1a1a] rounded-[16px] shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-[-20px] opacity-0 pointer-events-none"
            }`}
          >
            <div className="p-4 flex flex-col gap-4">
              {/* Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 ${
                    pathname === link.href ? "text-white bg-white/10" : "text-white/70"
                  }`}
                  style={{
                    fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Divider */}
              <div className="border-t border-white/10 my-2"></div>

              {/* Auth Buttons */}
              <a
                href="https://outsideconnection.vercel.app/auth/login"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  className="bg-transparent hover:bg-white/10 border border-white/30 rounded-lg w-full justify-start"
                  style={{
                    fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#FFFFFF",
                    height: "48px",
                  }}
                >
                  Login
                </Button>
              </a>
              <a
                href="https://outsideconnection.vercel.app/auth/signup"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  className="bg-white text-black hover:bg-gray-200 rounded-lg w-full justify-start"
                  style={{
                    fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#000000",
                    height: "48px",
                    borderRadius: "8px",
                  }}
                >
                  Sign Up
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Install Modal */}
        <InstallModal isOpen={isInstallModalOpen} onClose={() => setIsInstallModalOpen(false)} />
      </div>
    </div>
  )
}
