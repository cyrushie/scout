"use client"

import { Card } from "@/components/ui/card"
import { Bug, Home, Droplets, Leaf, Moon, Flame } from "lucide-react"
import Link from "next/link"

const pests = [
  {
    icon: Bug,
    name: "Ants",
    description: "Kitchen invaders and sweet-seekers",
    severity: "Common",
    link: "/blog/ant-control-guide",
  },
  {
    icon: Home,
    name: "Cockroaches",
    description: "Nocturnal kitchen and bathroom dwellers",
    severity: "Serious",
    link: "/blog/cockroach-elimination",
  },
  {
    icon: Droplets,
    name: "Termites",
    description: "Silent destroyers of wood structures",
    severity: "Critical",
    link: "/blog/termite-damage",
  },
  {
    icon: Leaf,
    name: "Spiders",
    description: "Web-builders in corners and basements",
    severity: "Minor",
    link: "/blog/spider-control",
  },
  {
    icon: Moon,
    name: "Bed Bugs",
    description: "Nighttime biters hiding in mattresses",
    severity: "Serious",
    link: "/blog/bed-bug-solutions",
  },
  {
    icon: Flame,
    name: "Mosquitoes",
    description: "Outdoor pests that bite and spread disease",
    severity: "Common",
    link: "/blog/mosquito-prevention",
  },
]

const severityColors = {
  Minor: "bg-accent/10 text-accent",
  Common: "bg-secondary/20 text-secondary-foreground",
  Serious: "bg-destructive/10 text-destructive",
  Critical: "bg-destructive/20 text-destructive",
}

export default function CommonPests() {
  return (
    <section id="common-pests" className="py-20 px-4 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Most Common Household Pests
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Click on any pest to learn how to identify, prevent, and eliminate them from your home.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pests.map((pest, index) => {
            const Icon = pest.icon
            return (
              <Link key={index} href={pest.link}>
                <Card className="p-6 border border-border bg-background hover:border-accent/50 transition-all group cursor-pointer h-full hover:shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Icon className="text-accent" size={24} />
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${severityColors[pest.severity as keyof typeof severityColors]}`}
                    >
                      {pest.severity}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{pest.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{pest.description}</p>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
