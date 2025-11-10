"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { ScoutMascot } from "@/components/scout-mascot"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [wantsReminders, setWantsReminders] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Newsletter subscription:", email, "Reminders:", wantsReminders)
    setSubscribed(true)
    setEmail("")
    setTimeout(() => setSubscribed(false), 5000)
  }

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      className={`py-20 px-4 bg-accent/5 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center transition-transform duration-500 hover:scale-110">
            <Mail className="text-accent" size={32} />
          </div>

          <Link href="/scout" className="group">
            <div className="flex items-center gap-2 px-4 py-2 bg-card border border-accent/30 rounded-full hover:border-accent hover:bg-accent/5 transition-all duration-300">
              <ScoutMascot className="w-8 h-8 text-accent transition-transform group-hover:scale-110" animated />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Confused?</div>
                <div className="text-sm font-medium text-accent">Chat with Scout</div>
              </div>
            </div>
          </Link>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
          Stay Pest-Free with Follow-Up Tips
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Get weekly prevention tips, seasonal alerts, and follow-up reminders to ensure your pest problems stay solved.
        </p>

        {subscribed ? (
          <div className="flex items-center justify-center gap-2 text-accent animate-fade-in">
            <CheckCircle2 size={24} />
            <span className="font-medium">Thanks for subscribing! Check your email for confirmation.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-background rounded-lg"
              />
              <Button
                type="submit"
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Subscribe
              </Button>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Checkbox
                id="reminders"
                checked={wantsReminders}
                onCheckedChange={(checked) => setWantsReminders(checked as boolean)}
              />
              <label htmlFor="reminders" className="text-sm text-muted-foreground cursor-pointer">
                Send me follow-up reminders to check if my pest problem is resolved
              </label>
            </div>
          </form>
        )}

        <p className="text-xs text-muted-foreground mt-4">No spam. Unsubscribe anytime. We respect your privacy.</p>
      </div>
    </section>
  )
}
