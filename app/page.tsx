import Image from "next/image"
import Navbar from "@/components/navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white font-geist">
      <Navbar />

      {/* Main Content - Just the two images */}
      <main className="pt-24 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
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

          {/* Three separate feature cards */}
          <section className="w-full">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Smart Phrases */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vincent%20m_Poster%20Gradient_03.jpg-Lw9TvMYdaJQGrjPHsrK1JQxlWckhP9.jpeg"
                  alt="Smart Phrases"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Find Patterns */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vincent%20m_Poster%20Gradient_10.jpg-RN76HUemVlfB8SwQlE9zMBYMREcaml.jpeg"
                  alt="Find Patterns"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* See Your Style */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vincent%20m_Poster%20Gradient_14.jpg-lmGEcqrjN1KmykppCJEReEhoYnxKUA.jpeg"
                  alt="See Your Style"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </section>

          {/* Second Image */}
          <div className="w-full">
            <Image
              src="/images/reinforced-training.jpg"
              alt="Reinforced Training - Choose reports to train from"
              width={1400}
              height={800}
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
