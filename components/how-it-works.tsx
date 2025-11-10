"use client"

import { Card } from "@/components/ui/card"
import { Camera, Zap, CheckCircle2, Shield } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Camera,
    title: "Capture or Describe",
    description: "Take a clear photo of the pest or describe what you see in detail.",
  },
  {
    number: "02",
    icon: Zap,
    title: "AI Analysis",
    description: "Scout instantly identifies the pest and assesses activity levels.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Get Solutions",
    description: "Receive personalized DIY treatments tailored to your situation.",
  },
  {
    number: "04",
    icon: Shield,
    title: "Protect Your Home",
    description: "Follow the steps and prevent costly damage before it happens.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">How Scout Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to identify pests and take action in minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                <Card className="p-6 bg-card border border-border h-full">
                  <div className="text-4xl font-bold text-accent/30 mb-4">{step.number}</div>
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-accent" size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </Card>

                {/* Connector line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/3 -right-3 w-6 h-0.5 bg-gradient-to-r from-accent to-transparent" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
