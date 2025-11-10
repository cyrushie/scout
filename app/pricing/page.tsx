"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import StartTrialModal from "@/components/modals/start-trial-modal"

export default function PricingPage() {
  const [showStartTrial, setShowStartTrial] = useState(false)

  const plans = [
    {
      name: "Starter",
      price: "$9.99",
      period: "/month",
      description: "Perfect for individuals",
      features: [
        "Up to 50 pest identifications per month",
        "AI-powered pest detection",
        "Basic DIY solutions",
        "Email support",
        "Mobile app access",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$24.99",
      period: "/month",
      description: "Best for homeowners",
      features: [
        "Unlimited pest identifications",
        "Advanced AI analysis with severity assessment",
        "Personalized treatment recommendations",
        "Priority email & chat support",
        "Pest activity tracking dashboard",
        "Monthly pest prevention tips",
        "Early pest outbreak alerts",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For property management",
      features: [
        "Everything in Professional, plus:",
        "Multiple property management",
        "Team member accounts",
        "Scheduled pest inspections",
        "Advanced reporting & analytics",
        "Dedicated account manager",
        "Custom API access",
        "Phone & priority support",
      ],
      popular: false,
    },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Choose the perfect plan for your pest protection needs. All plans include a 14-day free trial.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl p-8 transition ${
                    plan.popular
                      ? "bg-accent text-accent-foreground border-2 border-accent scale-105"
                      : "bg-card border border-border"
                  }`}
                >
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? "" : "text-foreground"}`}>{plan.name}</h3>
                  <p className={`text-sm mb-6 ${plan.popular ? "text-accent-foreground/80" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <span className={`text-4xl font-bold ${plan.popular ? "" : "text-foreground"}`}>{plan.price}</span>
                    <span className={plan.popular ? "text-accent-foreground/80" : "text-muted-foreground"}>
                      {" "}
                      {plan.period}
                    </span>
                  </div>

                  <Button
                    onClick={() => setShowStartTrial(true)}
                    className={`w-full mb-8 ${
                      plan.popular
                        ? "bg-accent-foreground text-accent hover:bg-accent-foreground/90"
                        : "bg-accent text-accent-foreground hover:bg-accent/90"
                    }`}
                  >
                    Get Started
                  </Button>

                  <div className="space-y-4">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check size={20} className={plan.popular ? "" : "text-accent"} />
                        <span className={plan.popular ? "" : "text-foreground"}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-muted/50 rounded-2xl p-12 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Money-Back Guarantee</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Not satisfied? Get 100% of your money back within 30 days. No questions asked. We're confident you'll
                love Scout.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <StartTrialModal open={showStartTrial} onOpenChange={setShowStartTrial} />
    </>
  )
}
