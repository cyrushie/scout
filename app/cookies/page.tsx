import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-foreground mb-12">Cookie Policy</h1>

            <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. What Are Cookies?</h2>
                <p>
                  Cookies are small files of letters and numbers that we store on your browser or the hard drive of your
                  computer if you agree. They contain information about your browsing history on our site.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Types of Cookies We Use</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Essential Cookies</h3>
                    <p>
                      These cookies are necessary for the website to function properly. They enable you to move around
                      the website and use its features.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Performance Cookies</h3>
                    <p>
                      These cookies collect information about how you use our website, such as which pages you visit
                      most often and whether you get error messages.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Functional Cookies</h3>
                    <p>
                      These cookies allow us to remember choices you make and provide enhanced, more personal features
                      to you.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Targeting Cookies</h3>
                    <p>
                      These cookies collect information about your browsing habits to make advertising relevant to you
                      and your interests.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. How to Control Cookies</h2>
                <p>
                  You can control and/or delete cookies as you wish. You can delete all cookies that are already on your
                  computer and you can set most browsers to prevent them from being placed. However, if you do this, you
                  may have to manually adjust some preferences every time you visit our site.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Third-Party Cookies</h2>
                <p>
                  Some of our pages may contain content from third parties, such as embedded YouTube videos or social
                  media widgets. These third parties may place their own cookies on your device.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Changes to This Policy</h2>
                <p>
                  We may update this Cookie Policy from time to time. We will notify you of any changes by posting the
                  new policy on our website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Contact Us</h2>
                <p>
                  If you have any questions about our use of cookies, please contact us at{" "}
                  <a href="mailto:cookies@scoutpests.com" className="text-accent hover:underline">
                    cookies@scoutpests.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
