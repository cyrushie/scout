import Header from "@/components/header"
import Hero from "@/components/hero"
import SymptomBrowser from "@/components/symptom-browser"
import Blog from "@/components/blog"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <SymptomBrowser />
      <Blog />
      <Newsletter />
      <Footer />
    </main>
  )
}
