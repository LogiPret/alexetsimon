"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 border-t border-white/10 bg-[#182542]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-8"
          >
            <a href="#">
              <Image src="/logo.png" alt="Alex & Simon" width={100} height={32} className="h-8 w-auto" />
            </a>
            <p className="text-sm text-white/60">© {currentYear} Alex & Simon. All rights reserved.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-6"
          >
            <a
              href="https://www.facebook.com/alexsimoncourtiersimmobiliers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/alexetsimon_immo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Instagram
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <Image
            src="/logo.png"
            alt="Alex & Simon"
            width={600}
            height={150}
            className="h-24 md:h-36 w-auto select-none"
          />
        </motion.div>
      </div>
    </footer>
  )
}
