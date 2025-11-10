import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-foreground mb-12">Privacy Policy</h1>

            <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                <p>
                  Scout ("we", "us", "our", or "Company") operates the Scout AI pest identification application. This
                  page informs you of our policies regarding the collection, use, and disclosure of personal data when
                  you use our service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Information Collection and Use</h2>
                <p>We collect several different types of information:</p>
                <ul className="list-disc list-inside space-y-2 mt-4">
                  <li>Personal Data: Name, email address, phone number</li>
                  <li>Usage Data: Device information, IP address, browser type, pages visited</li>
                  <li>Pest Identification Data: Photos you submit for analysis (stored securely)</li>
                  <li>Cookies: Used to enhance user experience and analytics</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Use of Data</h2>
                <p>Scout uses the collected data for various purposes:</p>
                <ul className="list-disc list-inside space-y-2 mt-4">
                  <li>To provide and maintain our service</li>
                  <li>To notify you about changes to our service</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information to improve our service</li>
                  <li>To monitor the usage of our service</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Security of Data</h2>
                <p>
                  The security of your data is important to us, but remember that no method of transmission over the
                  Internet or method of electronic storage is 100% secure. While we strive to use commercially
                  acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <a href="mailto:privacy@scoutpests.com" className="text-accent hover:underline">
                    privacy@scoutpests.com
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
