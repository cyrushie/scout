"use client"

import { Card } from "@/components/ui/card"
import { Bug, Brain, Target, TrendingDown } from "lucide-react"

const features = [
  {
    icon: Bug,
    title: "Instant Identification",
    description: "AI-powered pest recognition in seconds. Just snap a photo or describe what you see.",
  },
  {
    icon: Brain,
    title: "Activity Assessment",
    description: "Get real-time analysis of pest activity levels and infestation severity.",
  },
  {
    icon: Target,
    title: "DIY Solutions",
    description: "Personalized, affordable treatments you can implement immediately at home.",
  },
  {
    icon: TrendingDown,
    title: "Prevent Damage",
    description: "Catch problems early and save thousands on costly repairs and treatments.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Powerful Features Built for You
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Scout combines advanced AI with pest control expertise to give you the tools you need.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="p-8 border border-border bg-background hover:border-accent/50 transition-colors group"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon className="text-accent" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
