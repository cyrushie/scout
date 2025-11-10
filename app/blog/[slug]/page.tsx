"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { articles } from "@/components/blog"

export default function ArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article not found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-24">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-8">
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="mb-8">
          <img
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />

          <div className="flex flex-wrap gap-4 mb-6 items-center text-sm text-muted-foreground">
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full font-medium">{article.category}</span>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {article.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {article.readTime}
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              {article.author}
            </div>
          </div>

          <h1 className="text-5xl font-bold text-foreground mb-6 text-balance leading-tight">{article.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">{article.excerpt}</p>
        </div>

        <div className="prose prose-lg max-w-none">
          {article.content.split("\n\n").map((paragraph, index) => {
            if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
              return (
                <h3 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">
                  {paragraph.replace(/\*\*/g, "")}
                </h3>
              )
            }
            if (paragraph.match(/^\d+\./)) {
              const items = paragraph.split("\n")
              return (
                <ol key={index} className="list-decimal pl-6 space-y-3 my-6">
                  {items.map((item, i) => (
                    <li key={i} className="text-foreground/90 leading-relaxed">
                      {item.replace(/^\d+\.\s*/, "")}
                    </li>
                  ))}
                </ol>
              )
            }
            if (paragraph.startsWith("- ")) {
              const items = paragraph.split("\n- ")
              return (
                <ul key={index} className="list-disc pl-6 space-y-2 my-6">
                  {items.map((item, i) => (
                    <li key={i} className="text-foreground/90 leading-relaxed">
                      {item.replace(/^- /, "")}
                    </li>
                  ))}
                </ul>
              )
            }
            return (
              <p key={index} className="mb-6 text-foreground/90 leading-relaxed text-lg whitespace-pre-line">
                {paragraph}
              </p>
            )
          })}
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <div className="bg-accent/5 border border-accent/20 p-8 rounded-lg">
            <h3 className="text-xl font-semibold text-foreground mb-3">Found this helpful?</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Get more pest control tips and follow-up reminders delivered to your inbox. Join thousands of homeowners
              solving their pest problems naturally.
            </p>
            <Link href="/#newsletter">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Subscribe to Scout</Button>
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/#blog" className="inline-flex items-center gap-2 text-accent hover:text-accent/80">
            <ArrowLeft size={18} />
            Read more articles
          </Link>
        </div>
      </article>
    </main>
  )
}
