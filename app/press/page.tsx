import Header from "@/components/header"
import Footer from "@/components/footer"
import { Mail } from "lucide-react"

export default function PressPage() {
  const updates = [
    {
      date: "Oct 2024",
      title: "Scout Reaches 100K Users Milestone",
      publication: "TechCrunch",
      excerpt: "AI-powered pest identification startup Scout announces exponential growth in user base...",
    },
    {
      date: "Sep 2024",
      title: "The Future of Home Pest Management",
      publication: "Wired",
      excerpt: "How AI is revolutionizing the way homeowners handle pest control and prevention...",
    },
    {
      date: "Aug 2024",
      title: "Scout Secures Series A Funding",
      publication: "VentureBeat",
      excerpt: "Scout raises $10M in Series A funding to expand pest identification AI platform...",
    },
    {
      date: "Jul 2024",
      title: "Interview: Scout CEO on Building DIY Pest Solutions",
      publication: "Forbes",
      excerpt: "An exclusive interview with Scout's founder on disrupting the $9B pest control industry...",
    },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">Press & Media</h1>
              <p className="text-xl text-muted-foreground">
                Latest news and coverage about Scout and the future of pest identification.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 mb-16">
              <div className="flex items-start gap-4">
                <Mail className="text-accent flex-shrink-0 mt-1" size={24} />
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-2">Press Inquiries</h2>
                  <p className="text-muted-foreground">
                    For media requests, interviews, or press materials, contact:{" "}
                    <a href="mailto:press@scoutpests.com" className="text-accent hover:underline">
                      press@scoutpests.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-foreground mb-8">Recent Coverage</h2>
            <div className="space-y-6">
              {updates.map((update) => (
                <div key={update.title} className="border-l-4 border-accent pl-6 pb-6">
                  <p className="text-sm text-accent font-semibold mb-2">{update.date}</p>
                  <h3 className="text-xl font-bold text-foreground mb-2">{update.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{update.publication}</p>
                  <p className="text-muted-foreground">{update.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
