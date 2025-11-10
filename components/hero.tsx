"use client"

import { Button } from "@/components/ui/button"
import { Search, Sparkles } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { useEffect, useState } from "react"
import Link from "next/link"

const carouselData = {
  "eco-clean": [
    {
      image: "/hero-eco-clean-1.jpg",
      title: "Protecting Your Home Naturally",
      subtitle: "Eco-friendly solutions for a pest-free home",
    },
    {
      image: "/hero-eco-clean-2.jpg",
      title: "Scout Helps You Find Real Solutions",
      subtitle: "Expert guidance when you need it most",
    },
    {
      image: "/hero-eco-clean-3.jpg",
      title: "A Pest-Free Home Starts Here",
      subtitle: "Join thousands who've solved their pest problems",
    },
    {
      image: "/hero-eco-clean-4.jpg",
      title: "Natural Protection for Your Family",
      subtitle: "Safe, effective pest control you can trust",
    },
  ],
  "home-fresh": [
    {
      image: "/hero-home-fresh-1.jpg",
      title: "Your Home Deserves the Best Care",
      subtitle: "Fresh approaches to pest prevention",
    },
    {
      image: "/hero-home-fresh-2.jpg",
      title: "Scout Is Here to Help You Succeed",
      subtitle: "Personalized advice for your unique situation",
    },
    {
      image: "/hero-home-fresh-3.jpg",
      title: "A Clean Home Begins With Prevention",
      subtitle: "Stop pests before they become a problem",
    },
    {
      image: "/hero-home-fresh-4.jpg",
      title: "Trusted by Homeowners Everywhere",
      subtitle: "Discover solutions that work for your home",
    },
  ],
  "pure-nature": [
    {
      image: "/hero-pure-nature-1.jpg",
      title: "Harmony Between Home and Nature",
      subtitle: "Sustainable pest control that works",
    },
    {
      image: "/hero-pure-nature-2.jpg",
      title: "Let Scout Guide Your Journey",
      subtitle: "Smart solutions for modern homes",
    },
    {
      image: "/hero-pure-nature-3.jpg",
      title: "A Healthy Home for Everyone",
      subtitle: "Natural methods, proven results",
    },
    {
      image: "/hero-pure-nature-4.jpg",
      title: "Nature-Inspired Pest Solutions",
      subtitle: "Protecting what matters most",
    },
  ],
}

export default function Hero() {
  const { theme } = useTheme()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showScoutPulse, setShowScoutPulse] = useState(false)

  const slides = carouselData[theme] || carouselData["eco-clean"]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
        setIsTransitioning(false)
      }, 800)
    }, 7000)

    return () => clearInterval(interval)
  }, [slides.length])

  useEffect(() => {
    const scoutSlides = [1, 3] // Show Scout presence on slides mentioning Scout
    setShowScoutPulse(scoutSlides.includes(currentSlide))
  }, [currentSlide])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-[1500ms] ease-in-out ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            transform: `translateY(${scrollY * 0.3}px) scale(${index === currentSlide ? 1 : 1.05})`,
            zIndex: index === currentSlide ? 1 : 0,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background/70 z-[2]" />

      <div className="max-w-4xl mx-auto text-center relative z-10 px-4 pt-20 animate-fade-in">
        <h1
          className={`text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance leading-tight drop-shadow-2xl transition-all duration-1000 ease-in-out ${
            isTransitioning ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
          }`}
        >
          {slides[currentSlide].title}
        </h1>

        <p
          className={`text-xl md:text-2xl text-foreground/90 mb-12 text-balance max-w-2xl mx-auto leading-relaxed drop-shadow-lg transition-all duration-1000 ease-in-out delay-150 ${
            isTransitioning ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
          }`}
        >
          {slides[currentSlide].subtitle}
        </p>

        {showScoutPulse && (
          <div className="absolute top-8 right-8 flex items-center gap-2 animate-fade-in">
            <div className="relative">
              <Sparkles className="w-6 h-6 text-accent animate-pulse" />
              <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping" />
            </div>
            <span className="text-sm font-medium text-accent drop-shadow-md">Scout is here to help</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection("symptoms")}
          >
            <Search className="mr-2" size={20} />
            Find Your Problem
          </Button>

          <Link href="/scout">
            <div className="group flex items-center gap-2 px-6 py-3 bg-card/90 backdrop-blur-sm border border-accent/30 rounded-full hover:border-accent hover:bg-accent/10 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg">
              <div className="relative">
                <Sparkles className="w-5 h-5 text-accent transition-transform group-hover:scale-110 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-accent transition-colors">
                Meet Scout AI
              </span>
            </div>
          </Link>
        </div>

        <div className="flex gap-2 justify-center mb-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true)
                setTimeout(() => {
                  setCurrentSlide(index)
                  setIsTransitioning(false)
                }, 800)
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${
                index === currentSlide ? "w-8 bg-accent shadow-lg" : "w-1.5 bg-accent/40 hover:bg-accent/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-16">
          <div className="bg-card/90 backdrop-blur-sm rounded-xl border border-border p-6 text-left hover:border-accent/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
            <div className="text-3xl mb-3 transition-transform duration-300 hover:scale-110">🐜</div>
            <h3 className="font-semibold text-foreground mb-2">Identify</h3>
            <p className="text-sm text-muted-foreground">Learn to recognize common pests in your home</p>
          </div>
          <div className="bg-card/90 backdrop-blur-sm rounded-xl border border-border p-6 text-left hover:border-accent/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
            <div className="text-3xl mb-3 transition-transform duration-300 hover:scale-110">🛡️</div>
            <h3 className="font-semibold text-foreground mb-2">Prevent</h3>
            <p className="text-sm text-muted-foreground">Stop infestations before they start</p>
          </div>
          <div className="bg-card/90 backdrop-blur-sm rounded-xl border border-border p-6 text-left hover:border-accent/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
            <div className="text-3xl mb-3 transition-transform duration-300 hover:scale-110">🔧</div>
            <h3 className="font-semibold text-foreground mb-2">Solve</h3>
            <p className="text-sm text-muted-foreground">DIY solutions that actually work</p>
          </div>
        </div>
      </div>
    </section>
  )
}
