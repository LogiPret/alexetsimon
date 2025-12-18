"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "André Bélisle",
    title: "Service A+",
    text: "La vente d'un condominium est devenue une activité fort complexe nécessitant l'apport d'experts. À ce sujet, nous avons grandement apprécié le professionnalisme de monsieur Alexandre Brosseau. Son expertise et sa disponibilité ont fait toute la différence.",
  },
  {
    id: 2,
    name: "Suzanne Chatel",
    title: "Professionnalisme, disponibilité et efficacité",
    text: "Bonjour Alexandre, nous tenons à te remercier pour ton soutien tout au long de nos démarches pour l'achat de notre propriété. Nous avons apprécié ton professionnalisme, ta disponibilité et tes conseils judicieux.",
  },
  {
    id: 3,
    name: "Romain Chezeaud",
    title: "Merci Simon",
    text: "Merci Simon pour m'avoir bien guidé dans l'achat de mon premier condo !! Tes conseils et ta disponibilité ont vraiment été appréciés! Je recommande vivement leurs services à tous.",
  },
  {
    id: 4,
    name: "Robert Audet",
    title: "Professionnalisme, réactivité, et attention aux détails",
    text: "Nous avons particulièrement apprécié la confiance, l'empathie et les conseils que nous avons reçus lors du processus de vente de notre propriété. Un grand merci pour votre accompagnement.",
  },
  {
    id: 5,
    name: "Laurent Neveu",
    title: "Recommandation sans hésiter",
    text: "L'équipe a su cibler nos besoins et nous accompagner avec une approche basée sur la confiance. Leur connaissance du marché et leur disponibilité nous ont permis de trouver la propriété idéale.",
  },
  {
    id: 6,
    name: "Maxime Bernier",
    title: "Super service",
    text: "En tant que premier acheteur, j'avais besoin d'un agent de confiance et connaissant. Simon a su répondre à toutes mes questions et m'accompagner tout au long du processus. Je le recommande fortement!",
  },
  {
    id: 7,
    name: "Valérie D'Argensio",
    title: "Excellent service",
    text: "Nous avons fait appel à Alex & Simon pour l'achat et la vente de nos propriétés. Les deux expériences ont été excellentes. Leur professionnalisme et leur dévouement font toute la différence.",
  },
  {
    id: 8,
    name: "Marisol Payette",
    title: "Très bon service professionnel",
    text: "Un service attentif à nos demandes et besoins. L'équipe a su nous guider avec expertise et professionnalisme tout au long de notre transaction immobilière.",
  },
]

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const next = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-24 bg-background overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium text-[#182542] uppercase tracking-widest mb-4 block">Témoignages</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance text-[#182542]">
            Ce que nos clients disent
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            La satisfaction de nos clients est notre priorité. Découvrez leurs expériences avec notre équipe.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        {/* Navigation Arrows - Updated colors */}
        <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            className="rounded-full h-12 w-12 bg-white/80 backdrop-blur-sm border-[#182542]/20 hover:bg-[#182542] hover:text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={next}
            className="rounded-full h-12 w-12 bg-white/80 backdrop-blur-sm border-[#182542]/20 hover:bg-[#182542] hover:text-white"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Testimonial Cards Container */}
        <div className="overflow-hidden px-16 md:px-24">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="relative p-8 md:p-12 rounded-2xl bg-[#182542]">
                    {/* Content */}
                    <div className="pt-4">
                      <p className="text-xl md:text-2xl text-white leading-relaxed mb-8 text-pretty">
                        "{testimonial.text}"
                      </p>

                      <div className="flex items-center gap-4">
                        {/* Avatar Placeholder */}
                        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="text-xl font-bold text-white">
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-lg text-white">{testimonial.name}</p>
                          <p className="text-white/60">{testimonial.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Progress Indicators - Updated colors */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false)
                setCurrentIndex(index)
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-[#182542]" : "w-2 bg-[#182542]/30 hover:bg-[#182542]/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
