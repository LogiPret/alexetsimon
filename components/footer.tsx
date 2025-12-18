"use client"

import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-8"
          >
            <a href="#" className="text-2xl font-bold tracking-tight text-[#182542]">
              A<span className="text-[#182542]/50">&</span>S
            </a>
            <p className="text-sm text-muted-foreground">© {currentYear} Alex & Simon. All rights reserved.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-6"
          >
            {["Facebook", "Instagram", "LinkedIn"].map((platform) => (
              <a
                key={platform}
                href="#"
                className="text-sm text-muted-foreground hover:text-[#182542] transition-colors"
              >
                {platform}
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-7xl md:text-9xl font-bold tracking-tighter text-[#182542] select-none">
            ALEX<span className="text-[#182542]/50">&</span>SIMON
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
