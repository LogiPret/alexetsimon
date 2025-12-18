import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Partners } from "@/components/partners"
import { Services } from "@/components/services"
import { Properties } from "@/components/properties"
import { Testimonials } from "@/components/testimonials"
import { MortgageCalculator } from "@/components/calculator"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Properties />
      <Partners />
      <Testimonials />
      <MortgageCalculator />
      <Contact />
      <Footer />
    </main>
  )
}
