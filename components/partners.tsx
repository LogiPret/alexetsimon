"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const partnerCategories = [
  {
    title: "Hypothèque",
    partners: [
      {
        name: "Marie-Christine Michaud",
        company: "Banque Nationale",
        phone: "438-880-4400",
        image: "/bnc.png",
      },
      {
        name: "Daniel Timeo",
        company: "RBC",
        phone: "438-351-5086",
        image: "/rbc-logo-shield.svg",
      },
      {
        name: "Véronique Bibeau",
        company: "Desjardins",
        phone: "514-686-5275",
        image: "/desjardins-logo.png",
      },
      {
        name: "Joanie St-Pierre",
        company: "Consortium Hypothécaire",
        phone: "514-686-7627",
        image: "/consortium_logo.png",
      },
    ],
  },
  {
    title: "Inspecteurs",
    partners: [
      { name: "Charles Racine", company: "Inspecteur en Bâtiment", phone: "514-805-9394" },
      { name: "Philip Vachon", company: "Inspecteur en Bâtiment", phone: "514-449-9559" },
      { name: "Kevin Morin", company: "Inspecteur en Bâtiment", phone: "514-809-8980" },
    ],
  },
  {
    title: "Construction",
    partners: [
      {
        name: "Fortin & Rampin",
        company: "Entrepreneur Général",
        phone: "438-467-4280",
        image: "/fortin.png",
      },
      {
        name: "FJ & Frères",
        company: "Entrepreneur Général",
        phone: "514-825-7557",
        image: "/fj-freres.webp",
      },
    ],
  },
  {
    title: "Toiture",
    partners: [
      {
        name: "Toitex",
        company: "Spécialiste en Toiture",
        phone: "450-949-0900",
        image: "/toitex.jpeg",
      },
    ],
  },
]

export function Partners() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="partners" className="py-20 bg-[#182542]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium text-white/70 uppercase tracking-widest mb-4 block">
            Nos Partenaires
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Des professionnels de confiance à votre service
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Nous avons sélectionné pour vous les meilleurs partenaires dans chaque domaine pour vous accompagner dans
            votre projet immobilier.
          </p>
        </motion.div>

        <div className="space-y-16">
          {partnerCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-2xl font-bold text-white mb-8 text-center">{category.title}</h3>
              <div className="flex flex-wrap justify-center gap-6">
                {category.partners.map((partner, partnerIndex) => (
                  <motion.a
                    key={partner.name}
                    href={`tel:${partner.phone.replace(/-/g, "")}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: categoryIndex * 0.1 + partnerIndex * 0.05 }}
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 w-52 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    {"image" in partner && partner.image && (
                      <div className="mb-4 flex justify-center">
                        <div className="bg-white/60 rounded-xl p-3 w-full h-16 flex items-center justify-center">
                          <Image
                            src={partner.image}
                            alt={partner.company}
                            width={140}
                            height={48}
                            className="max-h-10 w-auto object-contain"
                          />
                        </div>
                      </div>
                    )}
                    <div className="text-center flex flex-col flex-1">
                      <p className="font-semibold text-white mb-1">{partner.name}</p>
                      <p className="text-xs text-white/50 mb-3">{partner.company}</p>
                      <div className="mt-auto pt-2">
                        <span className="inline-flex items-center gap-1.5 text-sm text-white/70 group-hover:text-white transition-colors">
                          <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                            📞
                          </span>
                          {partner.phone}
                        </span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
