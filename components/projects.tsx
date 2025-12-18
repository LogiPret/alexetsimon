"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Lumière Studio",
    category: "Brand Identity & Web",
    description: "A complete brand overhaul for a photography studio, including website and visual identity.",
    image: "/modern-photography-studio-website-dark-theme.jpg",
    tags: ["Branding", "Web Design", "Development"],
    year: "2024",
  },
  {
    title: "Verdant",
    category: "E-commerce Platform",
    description: "Sustainable fashion marketplace with custom CMS and seamless shopping experience.",
    image: "/sustainable-fashion-ecommerce-website-green-theme.jpg",
    tags: ["E-commerce", "Next.js", "Stripe"],
    year: "2024",
  },
  {
    title: "Sonora Music",
    category: "Digital Product",
    description: "Music streaming platform with focus on independent artists and seamless discovery.",
    image: "/music-streaming-app-interface-dark-gradient.jpg",
    tags: ["Product Design", "Web App", "UX"],
    year: "2023",
  },
  {
    title: "Atlas Architecture",
    category: "Portfolio Website",
    description: "Minimalist portfolio showcasing architectural projects with immersive galleries.",
    image: "/architecture-portfolio-website-minimal-clean.jpg",
    tags: ["Web Design", "Animation", "CMS"],
    year: "2023",
  },
]

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeProject, setActiveProject] = useState<number | null>(null)

  return (
    <section id="work" className="py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-sm font-medium text-accent uppercase tracking-widest mb-4 block">Selected Work</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">Projects we&apos;re proud of</h2>
          </div>
          <Button variant="outline" className="rounded-full self-start md:self-auto bg-transparent">
            View All Projects <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group cursor-pointer"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3]">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  animate={activeProject === index ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-0 bg-foreground/80 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={activeProject === index ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button variant="secondary" className="rounded-full">
                    View Project <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              </div>

              <div className="flex items-start justify-between mb-2">
                <span className="text-sm text-accent font-medium">{project.category}</span>
                <span className="text-sm text-muted-foreground">{project.year}</span>
              </div>

              <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">{project.title}</h3>

              <p className="text-muted-foreground mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full border border-border">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
