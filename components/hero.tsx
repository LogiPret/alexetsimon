"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="pt-14 relative overflow-hidden w-full bg-[#182542]">
      {/* Background Image - Always full width, height adjusts */}
      <div className="relative w-full">
        <Image
          src="/images/capture-20d-e2-80-99e-cc-81cran-2c-20le-202025-12-10-20a-cc-80-2013.png"
          alt="Alexandre Brosseau et Simon Mathieu - Courtiers Immobiliers"
          width={1920}
          height={1080}
          className="w-full h-auto block"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Content overlay at bottom of image */}
        <div className="absolute bottom-24 md:bottom-32 left-0 right-0 z-10">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <motion.p
              className="text-base md:text-2xl text-white/90 max-w-xl mx-auto text-pretty drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Vos partenaires immobilier de confiance au Québec. Une expertise reconnue pour vous accompagner dans tous
              vos projets immobiliers.
            </motion.p>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.a
            href="#services"
            className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <span className="text-xs uppercase tracking-widest drop-shadow-md">Découvrir</span>
            <ArrowDown className="w-4 h-4 drop-shadow-md" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
