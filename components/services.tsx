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
    stats: { transactions: "350+", satisfaction: "98%", experience: "15 ans" },
  },
  commercial: {
    title: "Commercial",
    tagline: "Des investissements stratégiques",
    description:
      "En tant que professionnels passionnés du secteur immobilier, nous nous spécialisons aussi dans le domaine du courtage commercial. Notre expertise englobe la négociation de transactions complexes, l'évaluation précise des biens commerciaux et la compréhension approfondie des tendances du marché.",
    services: [
      { label: "Immeubles à revenus", desc: "Multiplex et bâtiments locatifs" },
      { label: "Locaux commerciaux", desc: "Bureaux, commerces et espaces industriels" },
      { label: "Investissement", desc: "Analyse de rentabilité et conseils stratégiques" },
    ],
    stats: { transactions: "150+", portfolio: "50M$+", roi: "12%+" },
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
        >
          <h3 className="text-3xl font-bold text-center mb-10 text-[#182542]">Nos expertises</h3>

          {/* Both Expertise Cards - Side by side on desktop, stacked on mobile */}
          <div className="grid lg:grid-cols-2 gap-8">
            {(["residential", "commercial"] as const).map((type, typeIndex) => {
              const data = expertiseData[type]
              return (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + typeIndex * 0.15 }}
                  className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <div className="h-1.5 bg-[#182542]" />

                  {/* Header */}
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <div className="mb-4">
                      <h4 className="text-2xl font-bold text-[#182542]">{data.title}</h4>
                      <p className="text-sm font-medium text-[#182542]/70">{data.tagline}</p>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{data.description}</p>

                    {/* Stats Row */}
                    <div className="flex gap-4 mb-6 pb-6 border-b border-border">
                      {Object.entries(data.stats).map(([key, value]) => (
                        <div key={key} className="flex-1 text-center">
                          <div className="text-xl md:text-2xl font-bold text-[#182542]">{value}</div>
                          <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">
                            {key === "transactions"
                              ? "Transactions"
                              : key === "satisfaction"
                                ? "Satisfaction"
                                : key === "experience"
                                  ? "Expérience"
                                  : key === "portfolio"
                                    ? "Portfolio"
                                    : key === "roi"
                                      ? "ROI moyen"
                                      : key}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Services List */}
                    <div className="space-y-3 mb-6">
                      {data.services.map((service, index) => (
                        <div
                          key={service.label}
                          className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <h5 className="font-semibold text-sm text-[#182542]">{service.label}</h5>
                          <p className="text-xs text-muted-foreground leading-relaxed">{service.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <Button className="w-full bg-[#182542] hover:bg-[#182542]/90 text-white">
                        Discuter de mon projet {type === "residential" ? "résidentiel" : "commercial"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
