import Header from "@/components/header"
import Footer from "@/components/footer"

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-foreground mb-12">Terms of Service</h1>

            <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
                <p>
                  By accessing and using the Scout service, you accept and agree to be bound by the terms and provision
                  of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
                <p>
                  Permission is granted to temporarily download one copy of the materials (information or software) on
                  Scout's service for personal, non-commercial transitory viewing only. This is the grant of a license,
                  not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4">
                  <li>Modifying or copying the materials</li>
                  <li>Using the materials for any commercial purpose or for any public display</li>
                  <li>Attempting to decompile or reverse engineer any software contained on Scout</li>
                  <li>Removing any copyright or other proprietary notations from the materials</li>
                  <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Disclaimer</h2>
                <p>
                  The materials on Scout's service are provided on an 'as is' basis. Scout makes no warranties,
                  expressed or implied, and hereby disclaims and negates all other warranties including, without
                  limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
                  non-infringement of intellectual property or other violation of rights.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitations</h2>
                <p>
                  In no event shall Scout or its suppliers be liable for any damages (including, without limitation,
                  damages for loss of data or profit, or due to business interruption) arising out of the use or
                  inability to use the materials on Scout's service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Accuracy of Materials</h2>
                <p>
                  The materials appearing on Scout could include technical, typographical, or photographic errors. Scout
                  does not warrant that any of the materials on its service are accurate, complete, or current.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Modifications</h2>
                <p>
                  Scout may revise these terms of service for its service at any time without notice. By using this
                  service, you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Governing Law</h2>
                <p>
                  These terms and conditions are governed by and construed in accordance with the laws of the State of
                  California and you irrevocably submit to the exclusive jurisdiction of the courts located in that
                  location.
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
