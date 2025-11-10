import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CareersPage() {
  const openings = [
    {
      title: "Senior AI/ML Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Entomology Specialist",
      department: "Content",
      location: "San Francisco, CA",
      type: "Full-time",
    },
    {
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Customer Success Manager",
      department: "Support",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "San Francisco, CA",
      type: "Full-time",
    },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">Join Our Team</h1>
              <p className="text-xl text-muted-foreground mb-8">
                We're building the future of pest identification. Help us protect homes with AI and innovation.
              </p>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-8 mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-4">Why Scout?</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✓</span>
                  <span>Competitive salary and equity</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✓</span>
                  <span>Comprehensive health insurance and wellness programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✓</span>
                  <span>Flexible work arrangements and remote options</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✓</span>
                  <span>Professional development and learning opportunities</span>
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-foreground mb-8">Open Positions</h2>
            <div className="space-y-4">
              {openings.map((job) => (
                <div
                  key={job.title}
                  className="bg-card border border-border rounded-lg p-6 hover:border-accent transition flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90 whitespace-nowrap">
                    Apply Now <ArrowRight size={18} className="ml-2" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-card border border-border rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Don't see a role that fits?</h2>
              <p className="text-muted-foreground mb-6">
                Send us your resume and tell us how you'd like to contribute to Scout's mission.
              </p>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Send Speculative Application
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
