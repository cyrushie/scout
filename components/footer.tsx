"use client"
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <button onClick={() => scrollToSection("hero")} className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-lg text-foreground">Scout</span>
            </button>
            <p className="text-muted-foreground text-sm">
              Your trusted guide for DIY pest identification and solutions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("hero")}
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("symptoms")}
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  Find Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("blog")}
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("newsletter")}
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  Subscribe
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("blog")}
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  All Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("symptoms")}
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  Pest Identification
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("newsletter")}
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  Prevention Tips
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail size={16} />
                <a href="mailto:hello@scoutpests.com" className="hover:text-foreground transition">
                  hello@scoutpests.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone size={16} />
                <a href="tel:1-800-SCOUT-99" className="hover:text-foreground transition">
                  1-800-SCOUT-99
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-accent/20 flex items-center justify-center text-muted-foreground hover:text-accent transition"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-accent/20 flex items-center justify-center text-muted-foreground hover:text-accent transition"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-accent/20 flex items-center justify-center text-muted-foreground hover:text-accent transition"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-accent/20 flex items-center justify-center text-muted-foreground hover:text-accent transition"
              >
                <Linkedin size={18} />
              </a>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>&copy; 2025 Scout. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
