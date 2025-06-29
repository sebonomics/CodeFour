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
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
        <div className="absolute inset-0">
          <Image
            src="/images/code-four-hero.jpeg"
            alt="Hero Background"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto text-center pt-16">
          <Badge variant="outline" className="mb-6 border-white/20 text-white/80 bg-white/5">
            AI-Powered Version Control
          </Badge>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
            Code Four
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            AI Version Control for Writing Style - Train AI to learn and apply superior officer writing styles to
            incident reports
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/training">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4 rounded-full">
                Try Training Interface
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4 bg-transparent rounded-full"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content - Just the two images */}
      <main className="pt-24 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
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

      {/* See Your Style Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">See Your Style in Action</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Watch as AI learns your editing patterns and applies them consistently across all documents
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5">
            <Image
              src="/images/see-your-style.jpeg"
              alt="See Your Style Interface"
              width={1200}
              height={800}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Powerful Features</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Everything you need to maintain consistent writing style across your team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <Brain className="w-12 h-12 text-blue-400 mb-4" />
                <CardTitle className="text-white">AI Style Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">
                  Advanced AI analyzes your edits to learn your unique writing style and preferences automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <Target className="w-12 h-12 text-green-400 mb-4" />
                <CardTitle className="text-white">Pattern Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">
                  Identifies consistent patterns in your edits, from phrase replacements to voice preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <Zap className="w-12 h-12 text-yellow-400 mb-4" />
                <CardTitle className="text-white">Instant Application</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">
                  Apply learned style rules to new documents instantly with confidence scoring and visual diffs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <FileText className="w-12 h-12 text-purple-400 mb-4" />
                <CardTitle className="text-white">Multi-Word Phrases</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">
                  Advanced NLP detects complex phrase replacements like "male suspect" → "subject" across documents.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <Shield className="w-12 h-12 text-red-400 mb-4" />
                <CardTitle className="text-white">Voice Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">
                  Automatically detects active vs passive voice preferences and applies them consistently.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <Clock className="w-12 h-12 text-orange-400 mb-4" />
                <CardTitle className="text-white">Real-time Training</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">
                  Train the AI with just a few sample edits and see immediate results with confidence metrics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Three simple steps to train your AI writing assistant
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Edit Sample Reports</h3>
              <p className="text-white/80">
                Edit 2-5 sample reports to match your preferred writing style. The AI learns from your changes.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Train the AI</h3>
              <p className="text-white/80">
                Click "Train AI" to analyze your edits and extract style patterns with confidence scores.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Apply & Test</h3>
              <p className="text-white/80">
                Test the learned style on new documents and see real-time suggestions with visual diffs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-blue-900/10 to-purple-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
                95%
              </div>
              <div className="text-white/80 text-lg">Pattern Accuracy</div>
            </div>
            <div className="group">
              <div className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
                2-5
              </div>
              <div className="text-white/80 text-lg">Samples Needed</div>
            </div>
            <div className="group">
              <div className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
                10x
              </div>
              <div className="text-white/80 text-lg">Faster Editing</div>
            </div>
            <div className="group">
              <div className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
                100%
              </div>
              <div className="text-white/80 text-lg">Style Consistency</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Transform Your Writing Process?</h2>
          <p className="text-xl text-white/80 mb-8">
            Start training your AI writing assistant today and maintain perfect style consistency across all your
            documents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/training">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4 rounded-full">
                Start Training Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4 bg-transparent rounded-full"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
