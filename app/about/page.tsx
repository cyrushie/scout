import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">About Scout</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Protecting homes with intelligent pest identification and prevention
              </p>
            </div>

            <div className="space-y-12 mb-16">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Scout's mission is to empower homeowners with instant pest identification and personalized DIY
                  solutions. We believe everyone deserves quick, affordable access to expert pest knowledge without the
                  hefty costs of professional exterminators. By combining cutting-edge AI technology with expert
                  entomological knowledge, we're making pest identification and prevention accessible to everyone.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">How It Started</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Scout was founded in 2023 by a team of tech enthusiasts and pest management experts frustrated with
                  the lack of accessible pest identification solutions. We noticed that most people struggle to identify
                  pests correctly, leading to ineffective treatments and wasted money.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We built Scout to bridge that gap. Using advanced AI and machine learning trained on thousands of pest
                  photos and expert pest management data, Scout can identify any common household pest in seconds and
                  provide tailored DIY solutions.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Our Technology</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Scout uses state-of-the-art computer vision and AI to analyze pest photos with accuracy rates
                  exceeding 97%. Our model has been trained on over 50,000 pest images and continuously learns from user
                  interactions to improve accuracy.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Beyond identification, our AI assesses activity levels, predicts potential infestations, and
                  recommends personalized prevention strategies based on your location and home characteristics.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">By The Numbers</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-card rounded-lg p-6 border border-border">
                    <div className="text-4xl font-bold text-accent mb-2">100K+</div>
                    <p className="text-muted-foreground">Active Users</p>
                  </div>
                  <div className="bg-card rounded-lg p-6 border border-border">
                    <div className="text-4xl font-bold text-accent mb-2">2M+</div>
                    <p className="text-muted-foreground">Pest Identifications</p>
                  </div>
                  <div className="bg-card rounded-lg p-6 border border-border">
                    <div className="text-4xl font-bold text-accent mb-2">47</div>
                    <p className="text-muted-foreground">Pest Species Identified</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Ready to get started?</h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of homeowners protecting their homes with Scout.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
              >
                View Pricing <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
