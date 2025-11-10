"use client"

import { Card } from "@/components/ui/card"
import { ArrowRight, Clock, User } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export const articles = [
  {
    slug: "ants-kitchen-spring",
    title: "Why Ants Invade Your Kitchen Every Spring (And How to Stop Them)",
    excerpt:
      "Understanding ant behavior and implementing effective prevention strategies to eliminate kitchen infestations.",
    category: "Seasonal",
    readTime: "7 min",
    author: "Scout Editorial Team",
    date: "Mar 15, 2024",
    image: "/ants-marching-on-kitchen-counter.jpg",
    content: `Ant infestations typically peak in spring as colonies emerge from winter dormancy and scout ants search for food sources. Understanding their behavior is key to effective elimination.

**How Ant Infestations Develop:**

Scout ants leave pheromone trails when they discover food, creating visible ant highways. These chemical markers guide worker ants from the colony to the food source, which is why ants appear in organized lines.

**Common Mistakes in Ant Control:**

Spraying visible ants only eliminates workers while leaving the colony intact. The queen and remaining colony members will simply send out new scouts within hours, perpetuating the infestation cycle.

**Effective Elimination Methods:**

**1. Locate Entry Points:** Follow ant trails to identify where they're entering your home. Common entry points include cracks in walls, gaps around windows, and spaces where utilities enter the building. Seal these openings with clear caulk or appropriate sealant.

**2. Use Bait Stations:** Bait stations containing slow-acting poison allow worker ants to carry contaminated food back to the colony. This method eliminates the entire colony, including the queen. Results typically appear within 3-5 days.

**3. Eliminate Attractants:** Ants can detect food sources from significant distances. Clean counters daily with vinegar solution, store sweet substances (sugar, honey, syrup) in sealed containers or refrigerators, and promptly clean up spills.

**Expected Timeline:**

Days 1-2: Increased ant activity as workers collect bait
Day 3: Noticeable reduction in ant traffic
Day 5: Complete elimination of visible ants

**When to Call Professionals:**

Large black carpenter ants indicate a more serious problem. These species nest in wood and can cause structural damage. Professional intervention is recommended for carpenter ant infestations.`,
  },
  {
    slug: "bed-bugs-travel",
    title: "Comprehensive Guide to Bed Bug Elimination",
    excerpt: "Evidence-based strategies for identifying, treating, and preventing bed bug infestations in your home.",
    category: "Treatment Guide",
    readTime: "10 min",
    author: "Scout Editorial Team",
    date: "Feb 28, 2024",
    image: "/bed-bug-inspection-hotel-mattress.jpg",
    content: `Bed bug infestations require systematic treatment and patience. These pests are challenging to eliminate but can be successfully managed with proper protocols.

**Identification:**

Bed bugs are small, brown insects that feed on blood. Signs include:
- Small bites in linear patterns on skin
- Tiny brown bugs in mattress seams
- Dark spots (fecal matter) on bedding
- Shed exoskeletons near sleeping areas

**Common Treatment Errors:**

Discarding mattresses is often unnecessary and expensive. Chemical foggers are ineffective as bed bugs hide in cracks and crevices where fog cannot reach. Many over-the-counter sprays provide minimal results.

**Effective Treatment Protocol:**

**1. Containment:** Install zippered encasements on mattresses and box springs. This traps existing bed bugs inside where they will eventually starve (approximately 18 months) while preventing new infestations.

**2. Heat Treatment:** Wash all fabrics in hot water (minimum 120°F) and dry on high heat for 45 minutes. Bed bugs and their eggs die at sustained temperatures above 120°F. Repeat this process weekly for three weeks.

**3. Interceptor Traps:** Place these devices under bed legs to prevent bed bugs from climbing onto the bed. Check traps daily to monitor infestation levels.

**4. Diatomaceous Earth:** Apply food-grade diatomaceous earth around bed frames and baseboards. This natural substance damages bed bug exoskeletons, causing dehydration. Use respiratory protection during application.

**5. Regular Inspections:** Conduct weekly inspections of mattress seams, bed frames, and nearby furniture using a flashlight. Continue inspections for 12 weeks after the last bed bug sighting.

**Treatment Timeline:**

Week 4: Last new bites typically occur
Week 8: Last live bed bug usually found
Week 12: Infestation considered eliminated

**Cost Analysis:**

DIY treatment: $600-800 (encasements, traps, supplies)
Professional chemical treatment: $1,500-3,000
Professional heat treatment: $2,000-4,000

**Prevention for Travelers:**

Inspect hotel rooms before unpacking. Check mattress seams, headboards, and furniture with a flashlight. Store luggage on hard surfaces away from beds and upholstered furniture. Consider keeping suitcases in bathrooms where bed bugs cannot hide effectively.`,
  },
  {
    slug: "mouse-proof-apartment",
    title: "Complete Mouse-Proofing Guide for Homes and Apartments",
    excerpt: "Step-by-step instructions for identifying and sealing entry points to prevent mouse infestations.",
    category: "Prevention",
    readTime: "8 min",
    author: "Scout Editorial Team",
    date: "Jan 12, 2024",
    image: "/sealing-gaps-under-door-mouse-prevention.jpg",
    content: `Mice can squeeze through openings as small as a dime (approximately 6mm). Effective mouse-proofing requires identifying and sealing all potential entry points.

**Comprehensive Inspection:**

Common entry points include:
- Gaps under doors
- Openings around utility pipes (under sinks, behind appliances)
- Spaces around radiator pipes
- Cracks where walls meet floors
- Gaps around air conditioning units
- Holes behind major appliances

**Required Materials:**

- Steel wool (mice cannot chew through it)
- Expanding foam sealant
- Door sweeps
- Copper mesh for larger openings
- Caulk and caulk gun
- High-temperature caulk for areas near heat sources

**Sealing Procedures:**

**Under Sinks:** Pack steel wool tightly around pipes, then cover with expanding foam. Allow foam to cure completely before trimming excess.

**Behind Appliances:** Pull appliances away from walls to access utility entry points. Use copper mesh for larger holes, seal with expanding foam.

**Doors:** Install door sweeps on all exterior doors. Even small gaps allow mouse entry.

**Heat Sources:** Use high-temperature caulk around radiator pipes and other heat-generating fixtures. Standard foam can melt or degrade.

**Wall Cracks:** Fill with standard caulk. Multiple applications may be necessary for larger cracks.

**Air Conditioning Units:** Remove units if possible, seal gaps with foam, then reinstall securely.

**Post-Sealing Protocol:**

After sealing all entry points, clean affected areas thoroughly with disinfectant. Set snap traps with peanut butter in areas where mouse activity was observed. Monitor traps for one week.

**Results:**

When all entry points are properly sealed, mouse activity should cease within one week. Continued activity indicates missed entry points requiring additional inspection.

**For Renters:**

All sealing methods described are reversible and non-damaging. Foam and caulk can be removed when vacating. Many landlords appreciate these improvements as they also reduce drafts and improve energy efficiency.

**Additional Benefits:**

Proper sealing reduces heating and cooling costs by eliminating drafts. It also prevents entry of other pests including insects and small rodents.`,
  },
  {
    slug: "fruit-flies-drain",
    title: "Drain Flies vs. Fruit Flies: Identification and Treatment",
    excerpt: "Learn to distinguish between drain flies and fruit flies, and implement targeted treatment strategies.",
    category: "Identification",
    readTime: "5 min",
    author: "Scout Editorial Team",
    date: "Apr 3, 2024",
    image: "/drain-flies-vs-fruit-flies-comparison.jpg",
    content: `Drain flies and fruit flies require different treatment approaches. Proper identification is essential for effective elimination.

**Identification Guide:**

**Fruit Flies:**
- Tan or brown coloration
- Smooth body surface
- Attracted to fermenting fruit, wine, and organic waste
- Fast, agile flight patterns

**Drain Flies:**
- Gray or black coloration
- Fuzzy, moth-like appearance
- Found near sinks, showers, and drains
- Weak fliers with hopping movement

**Why Identification Matters:**

Fruit fly traps (typically apple cider vinegar-based) are ineffective against drain flies. Drain flies breed in organic buildup within pipes, requiring different treatment methods.

**Drain Fly Elimination Protocol:**

**Day 1:** Pour boiling water down all drains. This kills larvae and loosens organic buildup in pipes.

**Day 2:** Use a drain brush to physically scrub the interior of drain pipes. Remove accumulated hair, soap residue, and organic matter.

**Day 3:** Apply a mixture of baking soda and vinegar. Allow the mixture to react for 30 minutes, then flush with hot water.

**Days 4-7:** Continue daily boiling water treatments to eliminate remaining larvae.

**Results:**

Visible drain fly activity should cease within 5 days of beginning treatment. Complete elimination typically occurs within one week.

**Prevention:**

Weekly boiling water treatments prevent organic buildup and eliminate drain fly breeding sites. This maintenance takes approximately 30 seconds per drain.

**Identification Tips:**

Photograph suspected flies and examine closely. Drain flies have distinctive fuzzy, moth-like appearance. Fruit flies have smooth bodies and are typically found near food sources rather than drains.

**Multiple Drain Sources:**

Check all drains in the home, including bathroom showers and tubs. Drain flies often breed in less-frequently used drains where organic matter accumulates undisturbed.`,
  },
  {
    slug: "spider-season-fall",
    title: "Understanding Fall Spider Activity and Management",
    excerpt: "Why spider sightings increase in autumn and how to manage spider populations in your home.",
    category: "Seasonal",
    readTime: "6 min",
    author: "Scout Editorial Team",
    date: "Sep 8, 2023",
    image: "/house-spider-in-corner-web.jpg",
    content: `Spider activity peaks in fall due to mating season. Understanding this seasonal behavior helps homeowners manage spider populations effectively.

**Seasonal Behavior:**

Male spiders mature throughout summer and emerge in fall to seek mates. This increased movement makes spiders more visible to homeowners. The spiders were present year-round but remained hidden until mating season.

**Beneficial Aspects:**

Most house spiders are harmless and provide natural pest control by consuming mosquitoes, flies, and other insects. A single spider can eliminate dozens of pest insects over its lifetime.

**Management Strategies:**

**1. Catch and Release:** Use a cup and paper to trap spiders, then release outdoors. This humane method removes spiders without killing beneficial pest controllers.

**2. Regular Vacuuming:** Remove webs and egg sacs through consistent vacuuming. Spiders avoid areas where they cannot establish webs.

**3. Seal Entry Points:** Apply the same sealing techniques used for mice. Check windows, doors, and foundation cracks.

**4. Reduce Clutter:** Minimize storage boxes, clothing piles, and cluttered areas. Spiders prefer undisturbed hiding spots.

**5. Outdoor Lighting:** Turn off unnecessary outdoor lights or use yellow bulbs. Standard lights attract insects, which in turn attract spiders.

**Dangerous Species:**

Most spiders are harmless. However, two species require professional attention:

**Black Widow:** Shiny black body with distinctive red hourglass marking on abdomen
**Brown Recluse:** Brown coloration with violin-shaped marking on cephalothorax

Contact pest control professionals if these species are identified in your home.

**Population Reality:**

The average home contains 20-30 spiders at any given time. Most remain hidden and unnoticed. Complete spider elimination is neither practical nor necessary.

**Seasonal Timeline:**

Spider activity peaks in September and October. By November, male spiders die off and females return to hidden locations. Visible spider activity decreases significantly until the following fall.

**Coexistence Strategy:**

Consider allowing spiders in low-traffic areas like basements and garages where they provide pest control benefits. Remove spiders from living spaces and bedrooms as needed for comfort.`,
  },
  {
    slug: "pantry-moths-solution",
    title: "Complete Pantry Moth Elimination Guide",
    excerpt:
      "Comprehensive strategies for identifying, treating, and preventing Indian meal moth infestations in food storage areas.",
    category: "Treatment Guide",
    readTime: "9 min",
    author: "Scout Editorial Team",
    date: "Nov 20, 2023",
    image: "/pantry-moth-larvae-in-food-package.jpg",
    content: `Pantry moths (Indian meal moths) are persistent pests that require thorough treatment. These insects infest stored food products and can be challenging to eliminate completely.

**Identification:**

- Small brown moths approximately 8-10mm in length
- Webbing in food packages
- Small white larvae (worms) in grain products
- Cocoons in corners and crevices

**Initial Response:**

Immediately inspect all stored food products for signs of infestation. Pantry moths can infest:
- Grains and flour
- Cereals and pasta
- Pet food and treats
- Dried flowers and decorative items
- Birdseed and animal feed

**Comprehensive Treatment:**

**1. Complete Pantry Inspection:** Remove and examine every item. Check for webbing, larvae, or adult moths. Discard all infested products in sealed bags.

**2. Thorough Cleaning:** Vacuum all pantry surfaces, paying special attention to corners, cracks, and crevices. Wipe surfaces with vinegar solution.

**3. Locate Hidden Cocoons:** Inspect ceiling corners, door hinges, shelf brackets, and any cracks or crevices. Larvae travel several feet from food sources to pupate in protected locations.

**4. Implement Pheromone Traps:** Place sticky traps that attract male moths. These traps help monitor infestation levels but do not eliminate the problem alone.

**5. Use Airtight Storage:** Transfer all grain products, flour, cereals, and similar items to glass or thick plastic containers with airtight seals. Pantry moths can chew through cardboard and thin plastic bags.

**6. Conduct Weekly Inspections:** Check pantry thoroughly with flashlight every week for 3 months. Look for new webbing, larvae, or cocoons.

**Treatment Timeline:**

Month 1: Initial cleaning and disposal of infested items
Month 2-3: Continued monitoring and elimination of remaining moths
Month 4-6: Verification of complete elimination

**Prevention Strategies:**

- Store all susceptible foods in airtight containers
- Freeze new flour and grain purchases for 48 hours before storage (kills any eggs)
- Maintain pheromone trap in pantry year-round for early detection
- Conduct monthly pantry inspections

**Cost Analysis:**

- Discarded food: $150-300
- Airtight containers: $60-100
- Pheromone traps: $20-30
- Total: $230-430

**Key Success Factors:**

Pantry moth elimination requires patience and thoroughness. Treatment typically takes 3-6 months for complete elimination. Inspect all potential hiding spots, not just food packages. Airtight storage is essential for preventing reinfestation.`,
  },
]

export default function Blog() {
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
      id="blog"
      ref={sectionRef}
      className={`py-20 px-4 bg-muted/30 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Expert Pest Control Guides
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Evidence-based solutions for common household pest problems
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className={`transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card className="overflow-hidden border border-border bg-card hover:border-accent/50 transition-all duration-500 group cursor-pointer flex flex-col h-full rounded-xl hover:shadow-xl hover:-translate-y-2">
                <div className="h-48 bg-muted overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                    <span className="px-3 py-1 bg-accent/10 text-accent font-medium rounded-full">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-3 leading-snug group-hover:text-accent transition-colors duration-300">
                    {article.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">{article.excerpt}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User size={12} />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center text-accent text-sm font-medium group-hover:gap-2 transition-all duration-300">
                      Read
                      <ArrowRight
                        size={16}
                        className="ml-1 group-hover:translate-x-2 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
