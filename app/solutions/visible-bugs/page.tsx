"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, CheckCircle2, ShoppingCart, Clock, AlertCircle } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function VisibleBugsSolution() {
  const [checklist, setChecklist] = useState({
    identify: false,
    clean: false,
    seal: false,
    treat: false,
    monitor: false,
  })

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-8">
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="text-destructive" size={20} />
            <span className="text-sm font-medium text-destructive">Act Now - Active Infestation</span>
          </div>

          <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">I See Bugs in My Home</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Follow this step-by-step guide to identify and eliminate visible pests quickly and effectively.
          </p>

          <Card className="p-8 mb-8 bg-card border-border">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="text-accent" size={24} />
              <h2 className="text-2xl font-bold text-foreground">Quick Action Checklist</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-accent/5 transition-colors">
                <Checkbox
                  id="identify"
                  checked={checklist.identify}
                  onCheckedChange={() => toggleCheck("identify")}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="identify" className="font-semibold text-foreground cursor-pointer block mb-1">
                    Step 1: Identify the Pest
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Take a photo or note the size, color, and behavior. Common household bugs include ants, roaches,
                    spiders, and beetles. Check our pest identification guide below.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-accent/5 transition-colors">
                <Checkbox
                  id="clean"
                  checked={checklist.clean}
                  onCheckedChange={() => toggleCheck("clean")}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="clean" className="font-semibold text-foreground cursor-pointer block mb-1">
                    Step 2: Deep Clean the Area
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Vacuum thoroughly, wipe down surfaces with soapy water, and remove any food sources or standing
                    water. This eliminates attractants and disrupts pest trails.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-accent/5 transition-colors">
                <Checkbox
                  id="seal"
                  checked={checklist.seal}
                  onCheckedChange={() => toggleCheck("seal")}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="seal" className="font-semibold text-foreground cursor-pointer block mb-1">
                    Step 3: Seal Entry Points
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Use caulk to seal cracks around windows, doors, and baseboards. Install door sweeps and repair
                    damaged screens. This prevents new pests from entering.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-accent/5 transition-colors">
                <Checkbox
                  id="treat"
                  checked={checklist.treat}
                  onCheckedChange={() => toggleCheck("treat")}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="treat" className="font-semibold text-foreground cursor-pointer block mb-1">
                    Step 4: Apply Treatment
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Use appropriate pest control products from the shopping list below. Follow label instructions
                    carefully and keep pets/children away from treated areas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-accent/5 transition-colors">
                <Checkbox
                  id="monitor"
                  checked={checklist.monitor}
                  onCheckedChange={() => toggleCheck("monitor")}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="monitor" className="font-semibold text-foreground cursor-pointer block mb-1">
                    Step 5: Monitor and Follow Up
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Check the area daily for 2 weeks. If you still see pests after 7 days, repeat treatment or consider
                    professional help. Sign up for our reminder emails below.
                  </p>
                </div>
              </div>
            </div>

            {Object.values(checklist).every((v) => v) && (
              <div className="mt-6 p-4 bg-accent/10 rounded-lg flex items-center gap-2 text-accent">
                <CheckCircle2 size={20} />
                <span className="font-medium">Great job! You've completed all steps.</span>
              </div>
            )}
          </Card>

          <Card className="p-8 mb-8 bg-card border-border">
            <div className="flex items-center gap-2 mb-6">
              <ShoppingCart className="text-accent" size={24} />
              <h2 className="text-2xl font-bold text-foreground">Supplies You'll Need</h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Vacuum cleaner with HEPA filter</p>
                  <p className="text-sm text-muted-foreground">For thorough cleaning and egg removal</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Caulk and caulking gun</p>
                  <p className="text-sm text-muted-foreground">To seal cracks and entry points</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Diatomaceous earth (food-grade)</p>
                  <p className="text-sm text-muted-foreground">Natural pest control powder</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Spray bottle and dish soap</p>
                  <p className="text-sm text-muted-foreground">For cleaning and immediate pest elimination</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Pest-specific bait or traps</p>
                  <p className="text-sm text-muted-foreground">Choose based on pest type identified</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-accent/5 border-accent/20">
            <h3 className="text-xl font-bold text-foreground mb-3">Get Follow-Up Reminders</h3>
            <p className="text-muted-foreground mb-4">
              We'll email you in 3 days and 7 days to check if your pest problem is resolved and provide additional tips
              if needed.
            </p>
            <Link href="/#newsletter">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Sign Up for Reminders</Button>
            </Link>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  )
}
