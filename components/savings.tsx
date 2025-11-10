"use client"

import { Card } from "@/components/ui/card"
import { DollarSign, AlertCircle, Zap } from "lucide-react"

export default function Savings() {
  return (
    <section className="py-20 px-4 bg-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Save Time & Money</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Prevent expensive damage and skip the costly pest control fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 bg-background border border-border text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <DollarSign className="text-accent" size={32} />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-2">Up to 80%</h3>
            <p className="text-muted-foreground">Less than professional pest control treatments</p>
          </Card>

          <Card className="p-8 bg-background border border-border text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="text-accent" size={32} />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-2">$5,000+</h3>
            <p className="text-muted-foreground">Average cost of pest damage repairs per incident</p>
          </Card>

          <Card className="p-8 bg-background border border-border text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="text-accent" size={32} />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-2">&lt; 5 min</h3>
            <p className="text-muted-foreground">Get expert solutions right when you need them</p>
          </Card>
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl border border-accent/20 text-center">
          <h4 className="text-xl font-semibold text-foreground mb-2">Early Detection = Maximum Savings</h4>
          <p className="text-muted-foreground">
            Catch pests early and prevent infestations before they become expensive structural damage.
          </p>
        </div>
      </div>
    </section>
  )
}
