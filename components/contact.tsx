"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Send, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section id="contact" className="py-32 bg-[#182542]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Light text for dark background */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-medium text-white/70 uppercase tracking-widest mb-4 block">Contact</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance text-white">
              Parlons de votre projet immobilier
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Que vous souhaitiez vendre ou acheter, nous sommes là pour vous accompagner. Contactez-nous pour une
              consultation gratuite.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-white/10 border border-white/20">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/60">Appelez-nous</p>
                  <a href="tel:4505436443" className="font-medium text-white hover:text-white/80 transition-colors">
                    450 543-6443
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-white/10 border border-white/20">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/60">Écrivez-nous</p>
                  <a
                    href="mailto:info@alexetsimon.com"
                    className="font-medium text-white hover:text-white/80 transition-colors"
                  >
                    info@alexetsimon.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-white/10 border border-white/20">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/60">Région desservie</p>
                  <p className="font-medium text-white">Laurentides, Québec</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-sm text-white/60 mb-4">Suivez-nous</p>
              <div className="flex gap-4">
                {["Facebook", "Instagram", "LinkedIn"].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="group flex items-center gap-1 text-sm font-medium text-white/80 hover:text-accent transition-colors"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="p-8 rounded-2xl bg-white border border-white/10">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-[#182542]/10 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-[#182542]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-[#182542]">Message envoyé!</h3>
                  <p className="text-muted-foreground">
                    Merci de nous avoir contacté. Nous vous répondrons dans les plus brefs délais.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-[#182542]">
                        Nom
                      </label>
                      <Input id="name" placeholder="Votre nom" required className="rounded-lg" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-[#182542]">
                        Courriel
                      </label>
                      <Input id="email" type="email" placeholder="vous@exemple.com" required className="rounded-lg" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-[#182542]">
                      Téléphone
                    </label>
                    <Input id="phone" type="tel" placeholder="(450) 000-0000" className="rounded-lg" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-[#182542]">
                      Sujet
                    </label>
                    <Input id="subject" placeholder="Achat, vente, évaluation..." required className="rounded-lg" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-[#182542]">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Parlez-nous de votre projet immobilier..."
                      rows={5}
                      required
                      className="rounded-lg resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-full bg-[#182542] hover:bg-[#182542]/90 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Envoi en cours...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Envoyer le message <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
