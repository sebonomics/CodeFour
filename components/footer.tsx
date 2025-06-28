import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/images/code-four-logo.png" alt="Code Four" width={32} height={32} className="rounded" />
              <span className="text-xl font-bold text-white">Code Four</span>
            </div>
            <p className="text-white/60 text-sm max-w-md">
              Code Four's intelligent training system helps supervisors teach AI to match their writing style and
              preferences through advanced pattern recognition.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/training" className="text-white/60 hover:text-white text-sm transition-colors">
                  Trainer
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-white/60 hover:text-white text-sm transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-white/60 hover:text-white text-sm transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#help" className="text-white/60 hover:text-white text-sm transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-white/60 hover:text-white text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#docs" className="text-white/60 hover:text-white text-sm transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-white/40 text-sm">© 2024 Code Four Training Interface. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="#privacy" className="text-white/40 hover:text-white/60 text-sm transition-colors">
              Privacy
            </Link>
            <Link href="#terms" className="text-white/40 hover:text-white/60 text-sm transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
