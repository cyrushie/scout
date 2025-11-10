import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

export default function BlogPage() {
  const articles = [
    {
      slug: "identify-termite-damage",
      title: "How to Identify Termite Damage Before It's Too Late",
      excerpt: "Learn the warning signs of termite activity and how to spot damage early to prevent costly repairs.",
      author: "Sarah Chen",
      date: "Nov 15, 2024",
      readTime: "8 min read",
      category: "Pest Guide",
    },
    {
      slug: "natural-pest-control",
      title: "Natural Pest Control Methods That Actually Work",
      excerpt: "Discover effective eco-friendly solutions to eliminate common household pests without toxic chemicals.",
      author: "Michael Rodriguez",
      date: "Nov 10, 2024",
      readTime: "6 min read",
      category: "DIY Solutions",
    },
    {
      slug: "identify-sneaky-household-pests",
      title: "5 Sneaky Household Pests You Might Not Notice",
      excerpt:
        "Small but destructive pests hiding in your home. Learn how to spot silverfish, carpet beetles, and more.",
      author: "Emily Watson",
      date: "Nov 5, 2024",
      readTime: "7 min read",
      category: "Pest Guide",
    },
    {
      slug: "seasonal-pest-prevention",
      title: "Seasonal Pest Prevention Guide",
      excerpt: "Prepare your home for pest invasions with our month-by-month prevention strategy.",
      author: "James Thompson",
      date: "Oct 28, 2024",
      readTime: "10 min read",
      category: "Prevention",
    },
    {
      slug: "when-to-call-professional",
      title: "When Should You Call a Professional Exterminator?",
      excerpt: "Understanding when DIY solutions aren't enough and it's time to bring in the experts.",
      author: "Sarah Chen",
      date: "Oct 20, 2024",
      readTime: "5 min read",
      category: "Expert Advice",
    },
    {
      slug: "common-misconceptions",
      title: "Common Pest Control Misconceptions Debunked",
      excerpt: "Separating fact from fiction in the world of pest management and home protection.",
      author: "Michael Rodriguez",
      date: "Oct 12, 2024",
      readTime: "6 min read",
      category: "Education",
    },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">Scout Blog</h1>
              <p className="text-xl text-muted-foreground">
                Expert insights on pest identification, prevention, and DIY solutions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:border-accent transition-all hover:shadow-lg"
                >
                  <div className="p-6 flex flex-col h-full">
                    <span className="inline-block w-fit bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      {article.category}
                    </span>
                    <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition">
                      {article.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span>{article.author}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                      <span>{article.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
