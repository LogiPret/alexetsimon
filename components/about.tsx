"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Facebook } from "lucide-react"

const whyChooseUs = [
  {
    title: "Expertise Locale",
    description:
      "En tant que courtiers immobiliers chevronnés, nous avons une connaissance approfondie du marché immobilier du Grand Montréal. Nous suivons de près les tendances du secteur, les évolutions économiques et les quartiers émergents.",
  },
  {
    title: "Engagement Personnel",
    description:
      "Nous considérons chaque client comme une priorité absolue. Nous nous engageons à comprendre vos besoins uniques et à travailler sans relâche pour atteindre vos objectifs.",
  },
  {
    title: "Transparence et Intégrité",
    description:
      "L'intégrité est au cœur de notre pratique. Nous croyons en une communication transparente, en fournissant des informations précises et en étant toujours honnêtes.",
  },
  {
    title: "Accès à un Réseau Étendu",
    description:
      "En collaborant avec Alex & Simon, vous bénéficiez de l'accès à un vaste réseau de professionnels de l'immobilier, d'experts juridiques et de services connexes.",
  },
  {
    title: "Résultats Concrets",
    description:
      "Notre historique parle de lui-même. Nous sommes fiers d'avoir aidé de nombreux clients à acheter et vendre avec succès leurs propriétés.",
  },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-medium text-[#182542] uppercase tracking-widest mb-4 block">À propos</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance text-[#182542]">
              Alexandre Brosseau et Simon Mathieu
            </h2>
            <p className="text-xl font-medium text-[#182542]/80 italic mb-6">Votre Maison, Notre Engagement</p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Nous comprenons que l'achat ou la vente d'une propriété est l'une des décisions les plus importantes de
              votre vie. Forts de nombreuses années d'expérience en tant que courtiers immobiliers dans la région
              dynamique du Grand Montréal, nous nous engageons à rendre cette expérience aussi fluide et agréable que
              possible.
            </p>

            {/* Team Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 rounded-2xl bg-[#182542] text-white"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                  A&S
                </div>
                <div>
                  <h3 className="text-xl font-bold">Alex & Simon</h3>
                  <p className="text-white/70 text-sm">Courtiers Immobiliers</p>
                  <p className="text-white/60 text-xs">ROYAL LEPAGE BLANC & NOIR</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <a href="tel:4505436443" className="text-white hover:text-white/80 transition-colors">
                  📞 450 543-6443
                </a>
                <a
                  href="https://facebook.com/alexsimoncourtiersimmobiliers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Why Choose Us */}
          <div className="space-y-4">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-[#182542] mb-6"
            >
              Pourquoi choisir Alex & Simon?
            </motion.h3>
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="p-4 rounded-xl bg-card border border-border hover:border-[#182542]/30 transition-all duration-300"
              >
                <div>
                  <h4 className="font-semibold text-[#182542] mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center p-8 rounded-2xl bg-muted/50"
        >
          <p className="text-lg text-muted-foreground mb-4">
            Confiez-nous vos rêves immobiliers, et nous ferons tout en notre pouvoir pour les concrétiser. Nous ne
            sommes pas seulement des courtiers immobiliers, nous sommes vos partenaires dévoués dans la réalisation de
            vos objectifs immobiliers.
          </p>
          <p className="font-semibold text-[#182542]">Bien à vous,</p>
          <p className="text-xl font-bold text-[#182542]">Alex & Simon</p>
        </motion.div>
      </div>
    </section>
  )
}
