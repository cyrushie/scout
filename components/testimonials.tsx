"use client"

import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner, Texas",
    content: "Scout found termites in my walls before they caused real damage. It saved me thousands!",
    rating: 5,
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Property Manager, California",
    content: "Fast, accurate, and affordable. Scout is now my first step before calling a professional.",
    rating: 5,
    avatar: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "Homeowner, Florida",
    content: "I used Scout to identify what was in my attic. The DIY solutions worked perfectly!",
    rating: 5,
    avatar: "ER",
  },
  {
    name: "James Mitchell",
    role: "Landlord, New York",
    content: "Scout helps me quickly identify pest issues before they become liability problems.",
    rating: 5,
    avatar: "JM",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Trusted by Homeowners</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">See what users are saying about Scout.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 border border-border bg-card hover:border-accent/50 transition-colors">
              <div className="flex items-center gap-1 mb-4">
                {Array(testimonial.rating)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} size={16} className="fill-accent text-accent" />
                  ))}
              </div>

              <p className="text-foreground mb-4 leading-relaxed">{testimonial.content}</p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-sm font-semibold text-accent-foreground">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
