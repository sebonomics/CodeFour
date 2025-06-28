"use client"

// Split cities into two rows for better visual balance
const citiesRow1 = [
  "San Francisco",
  "New York",
  "London",
  "Berlin",
  "Tokyo",
  "Sydney",
  "Toronto",
  "Amsterdam",
  "Barcelona",
  "Singapore",
  "Mumbai",
  "São Paulo",
  "Stockholm",
  "Tel Aviv",
  "Austin",
  "Seattle",
  "Dublin",
  "Copenhagen",
  "Zurich",
  "Melbourne",
]

const citiesRow2 = [
  "Vancouver",
  "Paris",
  "Los Angeles",
  "Boston",
  "Chicago",
  "Miami",
  "Denver",
  "Portland",
  "Montreal",
  "Edinburgh",
  "Prague",
  "Vienna",
  "Helsinki",
  "Oslo",
  "Lisbon",
  "Madrid",
  "Rome",
  "Brussels",
  "Warsaw",
  "Budapest",
]

export default function DeveloperStatsSection() {
  const duplicatedRow1 = [...citiesRow1, ...citiesRow1]
  const duplicatedRow2 = [...citiesRow2, ...citiesRow2]

  return (
    <section className="py-12 md:py-16 bg-black overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        {/* Simple, clean stats display matching your other sections */}
        <div className="mb-8 md:mb-12">
          <h3
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
            1,500+ Organizations Trust Casrin
          </h3>
          <p
            className="max-w-2xl mx-auto text-gray-400"
            style={{
              fontFamily: "GeistSans, sans-serif",
              fontSize: "18px",
              lineHeight: "1.5",
              textAlign: "center",
            }}
          >
            From local nonprofits to national programs — trusted worldwide for workforce development management.
          </p>
        </div>

        {/* Clean cities section matching your "Works wherever you build" style */}
        <div className="max-w-full mx-auto">
          <div className="space-y-4 md:space-y-6">
            {/* First Row - Left to Right */}
            <div className="relative overflow-hidden">
              {/* Simple gradient overlays matching your design */}
              <div className="absolute left-0 top-0 bottom-0 w-16 md:w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-16 md:w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

              {/* Clean scrolling cities */}
              <div className="flex animate-scroll-left py-2">
                {duplicatedRow1.map((city, index) => (
                  <div key={`row1-${city}-${index}`} className="flex-shrink-0 px-3 md:px-4">
                    <span
                      className="text-[#999999] whitespace-nowrap"
                      style={{
                        fontFamily: 'GeistSans, "GeistSans Fallback", sans-serif',
                        fontSize: "20px",
                        lineHeight: "28px",
                        fontWeight: "700",
                        letterSpacing: "normal",
                      }}
                    >
                      {city}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Second Row - Right to Left */}
            <div className="relative overflow-hidden">
              {/* Simple gradient overlays matching your design */}
              <div className="absolute left-0 top-0 bottom-0 w-16 md:w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-16 md:w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

              {/* Clean scrolling cities */}
              <div className="flex animate-scroll-right py-2">
                {duplicatedRow2.map((city, index) => (
                  <div key={`row2-${city}-${index}`} className="flex-shrink-0 px-3 md:px-4">
                    <span
                      className="text-[#999999] whitespace-nowrap"
                      style={{
                        fontFamily: 'GeistSans, "GeistSans Fallback", sans-serif',
                        fontSize: "20px",
                        lineHeight: "28px",
                        fontWeight: "700",
                        letterSpacing: "normal",
                      }}
                    >
                      {city}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 50s linear infinite;
        }
        
        .animate-scroll-right {
          animation: scroll-right 55s linear infinite;
        }
        
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
