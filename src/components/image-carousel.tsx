"use client"

import { useEffect, useState } from "react"

interface CarouselSlide {
  image: string
  quote: string
  author: string
}

interface ImageCarouselProps {
  slides: CarouselSlide[]
  interval?: number
}

export function ImageCarousel({ slides, interval = 4000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, interval)

    return () => clearInterval(timer)
  }, [slides.length, interval])

  return (
    <>
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: index === currentIndex ? 1 : 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/90 via-cyan-950/50 to-transparent z-10" />

      <div className="absolute bottom-16 left-10 right-10 z-20">
        {slides.map((slide, index) => (
          <blockquote
            key={index}
            className={`space-y-2 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0 absolute"
            }`}
          >
            <p className="lg:text-lg text-xs text-white">&ldquo;{slide.quote}&rdquo;</p>
            <footer className="text-xs lg:text-sm text-gray-200">- {slide.author}</footer>
          </blockquote>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50"}`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  )
}