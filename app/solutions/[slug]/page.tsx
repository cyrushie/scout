"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { symptoms } from "@/components/symptom-browser"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export default function SolutionPage() {
  const params = useParams()
  const slug = params.slug as string
  const symptom = symptoms.find((s) => s.slug === slug)
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>([])

  if (!symptom) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Solution not found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (checkedSteps.length === 0) {
    setCheckedSteps(new Array(symptom.solution.steps.length).fill(false))
  }

  const toggleStep = (index: number) => {
    const newChecked = [...checkedSteps]
    newChecked[index] = !newChecked[index]
    setCheckedSteps(newChecked)
  }

  return (
    <main className="min-h-screen bg-background pt-24">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/#symptoms" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-8">
          <ArrowLeft size={18} />
          Back to Symptoms
        </Link>

        <div className="mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
            {symptom.solution.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-4">{symptom.description}</p>
          <p className="text-sm text-muted-foreground">Common causes: {symptom.examples}</p>
        </div>

        <div className="space-y-12">
          {/* Step-by-step checklist */}
          <div>
            <h2 className="font-bold text-2xl mb-6 flex items-center gap-3">
              <CheckCircle2 className="text-accent" size={28} />
              Step-by-Step Action Plan
            </h2>
            <div className="space-y-4">
              {symptom.solution.steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:border-accent/30 transition"
                >
                  <Checkbox
                    id={`step-${index}`}
                    checked={checkedSteps[index]}
                    onCheckedChange={() => toggleStep(index)}
                    className="mt-1.5"
                  />
                  <label
                    htmlFor={`step-${index}`}
                    className={`flex-1 cursor-pointer text-lg ${checkedSteps[index] ? "line-through text-muted-foreground" : "text-foreground"}`}
                  >
                    <span className="font-semibold text-accent mr-2">Step {index + 1}:</span>
                    {step}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Shopping list */}
          <div className="bg-muted/30 p-8 rounded-lg border border-border">
            <h2 className="font-bold text-2xl mb-6">🛒 Supplies You'll Need</h2>
            <ul className="grid md:grid-cols-2 gap-4">
              {symptom.solution.supplies.map((supply, index) => (
                <li key={index} className="flex items-center gap-3 text-base">
                  <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-foreground">{supply}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow-up reminder CTA */}
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Want a follow-up reminder to check if your problem is resolved?
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Subscribe to Scout and get personalized follow-up reminders, seasonal pest prevention tips, and expert
              advice delivered to your inbox.
            </p>
            <Link href="/#newsletter">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Subscribe for Reminders
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <Link href="/#symptoms" className="inline-flex items-center gap-2 text-accent hover:text-accent/80">
            <ArrowLeft size={18} />
            View all solutions
          </Link>
        </div>
      </article>
    </main>
  )
}
