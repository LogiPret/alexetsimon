"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const mainServices = [
  {
    id: "vendre",
    title: "JE VEUX VENDRE",
    subtitle: "Parlez-nous de votre projet",
    description:
      "Maximisez la valeur de votre propriété avec notre expertise du marché local et nos stratégies de mise en marché éprouvées.",
    features: ["Évaluation gratuite", "Photos professionnelles", "Visibilité maximale", "Négociation experte"],
  },
  {
    id: "acheter",
    title: "JE VEUX ACHETER",
    subtitle: "Parlez-nous de votre projet",
    description:
      "Trouvez la propriété de vos rêves grâce à notre connaissance approfondie du marché et notre accompagnement personnalisé.",
    features: ["Recherche personnalisée", "Visites organisées", "Analyse comparative", "Accompagnement complet"],
  },
]

const expertiseData = {
  residential: {
    title: "Résidentiel",
    tagline: "Votre chez-vous, notre priorité",
    description:
      "Que vous cherchiez votre première maison, un condo moderne ou une propriété de prestige, nous vous accompagnons à chaque étape.",
    services: [
      { label: "Première acquisition", desc: "Accompagnement personnalisé pour les premiers acheteurs" },
      { label: "Maisons unifamiliales", desc: "Résidences dans les meilleurs quartiers" },
      { label: "Condos & appartements", desc: "Du studio au penthouse de luxe" },
    ],
    stats: { transactions: "500+", avis: "38", experience: "10 ans" },
  },
}

export function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredMain, setHoveredMain] = useState<string | null>(null)

  return (
    <section id="services" className="py-24 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium text-[#182542] uppercase tracking-widest mb-4 block">Nos Services</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance text-[#182542]">
            Alex & Simon courtiers immobiliers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un accompagnement personnalisé pour tous vos projets immobiliers, que vous souhaitiez vendre ou acheter.
          </p>
        </motion.div>

        {/* Main Service Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {mainServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
              onMouseEnter={() => setHoveredMain(service.id)}
              onMouseLeave={() => setHoveredMain(null)}
            >
              <div className="absolute inset-0 bg-[#182542] transition-transform duration-500 group-hover:scale-105" />
              <div className="relative z-10 p-8 md:p-10">
                <p className="text-white/60 text-sm uppercase tracking-widest mb-2">{service.subtitle}</p>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-white/70 mb-6 max-w-md">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white border border-white/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-[#182542] group/btn bg-transparent"
                    onClick={() => {
                      const contactSection = document.getElementById("contact")
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth" })
                        // Dispatch event to set subject
                        window.dispatchEvent(
                          new CustomEvent("setContactSubject", {
                            detail: { subject: service.id === "vendre" ? "vente" : "achat" },
                          })
                        )
                      }
                    }}
                  >
                    {service.id === "vendre" ? "Vendre" : "Acheter"}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
              <motion.div
                className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-white/5"
                animate={hoveredMain === service.id ? { scale: 1.2 } : { scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          {/* Expertise Section - Full Width */}
          <div className="relative rounded-3xl overflow-hidden bg-[#182542]">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 p-8 md:p-12 lg:p-16">
              {/* Header */}
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-medium uppercase tracking-widest mb-4">
                  Notre expertise
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">{expertiseData.residential.title}</h3>
                <p className="text-lg text-white/70 italic">{expertiseData.residential.tagline}</p>
              </div>

              {/* Stats Row - Prominent Display */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12">
                {Object.entries(expertiseData.residential.stats).map(([key, value]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-center p-4 md:p-6 rounded-2xl bg-white/10 backdrop-blur-sm"
                  >
                    <div className="text-3xl md:text-5xl font-bold text-white mb-1">{value}</div>
                    <div className="text-xs md:text-sm text-white/60 uppercase tracking-wider">
                      {key === "transactions"
                        ? "Transactions"
                        : key === "avis"
                          ? "Avis 5 étoiles"
                          : key === "experience"
                            ? "Expérience"
                            : key}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Description */}
              <p className="text-center text-white/80 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
                {expertiseData.residential.description}
              </p>

              {/* Services Grid */}
              <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-10">
                {expertiseData.residential.services.map((service, index) => (
                  <motion.div
                    key={service.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    className="p-5 md:p-6 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors group"
                  >
                    <h5 className="font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
                      {service.label}
                    </h5>
                    <p className="text-sm text-white/60 leading-relaxed">{service.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-white text-[#182542] hover:bg-white/90 font-semibold px-8"
                  onClick={() => {
                    const contactSection = document.getElementById("contact")
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Discuter de mon projet
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
