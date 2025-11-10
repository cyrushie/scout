"use client"

import { useState, useEffect } from "react"
import { Menu, X, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-out ${
        scrolled
          ? "backdrop-blur-lg bg-background/80 border-b border-border/50 shadow-sm"
          : "backdrop-blur-md bg-background/40 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Leaf className="text-accent-foreground" size={18} />
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">Scout</span>
          </Link>

          <nav className="hidden md:flex gap-8 items-center">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              Home
            </Link>
            <Link
              href="/scout"
              className="font-semibold text-accent hover:text-accent/80 transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              Meet Scout
            </Link>
            <Link
              href="/#symptoms"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Find Solutions
            </Link>
            <Link href="/#blog" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              Guides
            </Link>
            <Link
              href="/#newsletter"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Subscribe
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/#newsletter">
              <Button
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-200 hover:scale-105"
              >
                Get Tips
              </Button>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors duration-200"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-border pt-4 animate-fade-in">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm py-2 px-3 rounded-lg hover:bg-muted"
            >
              Home
            </Link>
            <Link
              href="/scout"
              onClick={() => setIsOpen(false)}
              className="font-semibold text-accent hover:text-accent/80 transition-colors duration-200 text-sm py-2 px-3 rounded-lg hover:bg-accent/10"
            >
              Meet Scout
            </Link>
            <Link
              href="/#symptoms"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm py-2 px-3 rounded-lg hover:bg-muted"
            >
              Find Solutions
            </Link>
            <Link
              href="/#blog"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm py-2 px-3 rounded-lg hover:bg-muted"
            >
              Guides
            </Link>
            <Link
              href="/#newsletter"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm py-2 px-3 rounded-lg hover:bg-muted"
            >
              Subscribe
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
