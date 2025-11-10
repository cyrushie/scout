"use client"

import { Card } from "@/components/ui/card"
import { Bug, Droplets, Volume2, Home, Trash2, Eye, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export const symptoms = [
  {
    slug: "visible-bugs",
    icon: Eye,
    symptom: "I See Bugs",
    description: "Spotted insects crawling around your home",
    examples: "Ants, roaches, spiders, beetles",
    urgency: "act-now",
    solution: {
      title: "How to Handle Visible Bugs",
      steps: [
        "Identify the bug type - Take a clear photo for reference",
        "Isolate the area - Keep food sealed and remove water sources",
        "Clean thoroughly - Vacuum and wipe down surfaces with soapy water",
        "Set traps - Use sticky traps or bait stations near entry points",
        "Seal entry points - Caulk cracks, gaps around pipes, and door sweeps",
        "Monitor daily - Check traps and look for new activity",
      ],
      supplies: [
        "Sticky traps or bait stations",
        "Vacuum cleaner",
        "Dish soap and water",
        "Caulk and caulking gun",
        "Door sweeps",
        "Sealable food containers",
      ],
    },
  },
  {
    slug: "droppings",
    icon: Droplets,
    symptom: "I See Droppings",
    description: "Small pellets or stains near food or walls",
    examples: "Mouse droppings, roach feces, termite frass",
    urgency: "act-now",
    solution: {
      title: "Dealing with Pest Droppings",
      steps: [
        "Wear gloves and mask - Protect yourself from potential diseases",
        "Photograph the droppings - Document size, shape, and location",
        "Clean with disinfectant - Spray area with bleach solution, let sit 5 minutes",
        "Dispose properly - Double-bag waste and seal tightly",
        "Find the source - Follow droppings trail to nest or entry point",
        "Set traps near source - Place snap traps or bait stations strategically",
        "Check daily for 2 weeks - Monitor for new droppings",
      ],
      supplies: [
        "Disposable gloves and N95 mask",
        "Bleach or disinfectant spray",
        "Paper towels",
        "Heavy-duty trash bags",
        "Snap traps or bait stations",
        "Flashlight for inspection",
      ],
    },
  },
  {
    slug: "scratching-sounds",
    icon: Volume2,
    symptom: "I Hear Scratching",
    description: "Noises in walls, ceiling, or attic",
    examples: "Mice, rats, squirrels, raccoons",
    urgency: "act-now",
    solution: {
      title: "Stopping Scratching Sounds",
      steps: [
        "Note the timing - Record when sounds occur (day/night, frequency)",
        "Locate the area - Identify which walls, ceiling sections, or attic spaces",
        "Inspect the exterior - Look for entry holes, damaged vents, or gaps",
        "Set traps in attic/crawlspace - Use appropriate traps for suspected animal",
        "Install one-way exclusion doors - Allow animals to exit but not re-enter",
        "Seal entry points after 3-5 days - Once activity stops, permanently seal holes",
        "Clean and sanitize affected areas - Remove droppings and nesting materials",
      ],
      supplies: [
        "Flashlight and ladder",
        "Live traps or snap traps (size appropriate)",
        "One-way exclusion doors",
        "Hardware cloth (1/4 inch mesh)",
        "Expanding foam or steel wool",
        "Disinfectant and protective gear",
      ],
    },
  },
  {
    slug: "damage",
    icon: Home,
    symptom: "I See Damage",
    description: "Holes, chewed materials, or structural issues",
    examples: "Wood damage, chewed wires, holes in walls",
    urgency: "act-now",
    solution: {
      title: "Addressing Pest Damage",
      steps: [
        "Document all damage - Take photos and notes of affected areas",
        "Identify the pest - Look for droppings, tracks, or gnaw marks",
        "Assess safety risks - Check for electrical hazards or structural concerns",
        "Remove damaged materials - Cut away compromised wood or insulation",
        "Treat the area - Apply boric acid or diatomaceous earth to cavities",
        "Set traps near damage sites - Target the active pest population",
        "Repair and reinforce - Replace materials with pest-resistant options",
      ],
      supplies: [
        "Camera for documentation",
        "Utility knife or saw",
        "Boric acid or diatomaceous earth",
        "Appropriate traps for pest type",
        "Replacement materials (wood, drywall, wire)",
        "Metal mesh or hardware cloth",
      ],
    },
  },
  {
    slug: "bites",
    icon: Bug,
    symptom: "I Got Bitten",
    description: "Unexplained bites or skin irritation",
    examples: "Bed bugs, fleas, mosquitoes, spiders",
    urgency: "act-now",
    solution: {
      title: "Treating Bites and Finding the Source",
      steps: [
        "Treat bites immediately - Wash with soap, apply ice, use anti-itch cream",
        "Photograph bites - Document pattern, location, and appearance",
        "Inspect bedding thoroughly - Check mattress seams, box spring, bed frame",
        "Wash all linens in hot water - Use highest heat setting for wash and dry",
        "Vacuum entire bedroom - Focus on mattress, carpet edges, and furniture",
        "Use mattress encasements - Seal mattress and box spring completely",
        "Set interceptor traps - Place under bed legs to catch crawling insects",
      ],
      supplies: [
        "Anti-itch cream or hydrocortisone",
        "Ice pack",
        "Flashlight for inspection",
        "Vacuum with HEPA filter",
        "Mattress and box spring encasements",
        "Bed bug interceptor traps",
        "Laundry detergent",
      ],
    },
  },
  {
    slug: "prevention",
    icon: Trash2,
    symptom: "I Want to Prevent Pests",
    description: "Keep your home pest-free year-round",
    examples: "Seasonal tips, home maintenance, barriers",
    urgency: "prevention",
    solution: {
      title: "Year-Round Pest Prevention",
      steps: [
        "Seal all entry points - Inspect and caulk cracks, gaps, and holes quarterly",
        "Maintain clean kitchen - Wipe counters daily, store food in sealed containers",
        "Fix moisture issues - Repair leaks, use dehumidifiers in damp areas",
        "Trim vegetation - Keep plants 12 inches from foundation",
        "Store firewood properly - Keep 20 feet from house, elevated off ground",
        "Clean gutters seasonally - Prevent water buildup and nesting sites",
        "Schedule quarterly inspections - Check attic, basement, and crawlspaces",
      ],
      supplies: [
        "Caulk and caulking gun",
        "Door sweeps and weather stripping",
        "Airtight food storage containers",
        "Dehumidifier",
        "Gutter cleaning tools",
        "Outdoor trash cans with tight lids",
      ],
    },
  },
]

const urgencyStyles = {
  "act-now": {
    badge: "bg-destructive/10 text-destructive border-destructive/20",
    label: "Act Now",
    icon: AlertCircle,
  },
  prevention: {
    badge: "bg-accent/10 text-accent border-accent/20",
    label: "Prevention",
    icon: null,
  },
}

export default function SymptomBrowser() {
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

  return (
    <section
      id="symptoms"
      ref={sectionRef}
      className={`py-20 px-4 bg-background transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            What Are You Experiencing?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Click on the symptom that matches your situation to get instant solutions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {symptoms.map((item, index) => {
            const Icon = item.icon
            const urgencyConfig = urgencyStyles[item.urgency as keyof typeof urgencyStyles]
            const UrgencyIcon = urgencyConfig.icon

            return (
              <Link
                key={index}
                href={`/solutions/${item.slug}`}
                className={`transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card className="p-6 border border-border bg-card hover:border-accent/50 transition-all duration-500 group cursor-pointer h-full hover:shadow-xl hover:-translate-y-2 rounded-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="text-accent transition-transform duration-300 group-hover:scale-110" size={24} />
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium border flex items-center gap-1 ${urgencyConfig.badge}`}
                    >
                      {UrgencyIcon && <UrgencyIcon size={12} />}
                      {urgencyConfig.label}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {item.symptom}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">{item.description}</p>
                  <p className="text-xs text-muted-foreground/70">Common causes: {item.examples}</p>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
