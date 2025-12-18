"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { MapPin, ArrowRight, Bed, Bath } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Property {
  id: string | number
  title?: string
  location?: string
  address: string
  price: string
  type?: string
  reference?: string
  mlsNumber?: string
  units?: string | null
  category?: string
  image?: string
  imageUrl?: string
  link?: string
  bedrooms?: string
  bathrooms?: string
}

// Fallback static data
const staticProperties: Property[] = [
  {
    id: 1,
    title: "Quadruplex",
    location: "Saint Jérôme",
    address: "378-380 Rue Gauthier, Saint-J...",
    price: "1 089 900 $",
    type: "À Vendre",
    reference: "21758006",
    units: "4 unités",
    category: "residential",
    image: "/quadruplex-modern-building-quebec.jpg",
  },
  {
    id: 2,
    title: "Duplex",
    location: "Saint Placide",
    address: "296Z-298Z Mtée St-Vincent, S...",
    price: "535 000 $",
    type: "À Vendre",
    reference: "9120094",
    units: "2 unités",
    category: "residential",
    image: "/duplex-house-quebec-countryside.jpg",
  },
  {
    id: 3,
    title: "Maison",
    location: "Mirabel",
    address: "657 Boul. Monseigneur-Dubois...",
    price: "589 900 $",
    type: "À Vendre",
    reference: "24121579",
    units: "1 unité",
    category: "residential",
    image: "/modern-house-quebec-suburban.jpg",
  },
  {
    id: 4,
    title: "Local commercial",
    location: "Laval",
    address: "1900 Rue Émile-Martineau, La...",
    price: "875 000 $",
    type: "À Vendre",
    reference: "17631358",
    units: null,
    category: "commercial",
    image: "/luxury-apartment-condo-interior.jpg",
  },
  {
    id: 5,
    title: "Terrain commercial",
    location: "Nominingue",
    address: "Ch. des Buses, Nominingue",
    price: "279 900 $",
    type: "À Vendre",
    reference: "20850117",
    units: null,
    category: "commercial",
    image: "/lakefront-land-quebec-forest.jpg",
  },
  {
    id: 6,
    title: "Terrain",
    location: "Saint Michel Des Saints",
    address: "Ch. des Érables, Saint-Michel-...",
    price: "119 900 $",
    type: "À Vendre",
    reference: "20155954",
    units: null,
    category: "residential",
    image: "/forest-land-quebec-nature.jpg",
  },
]

const soldProperties: Property[] = [
  {
    id: 7,
    title: "Maison",
    location: "Mirabel",
    address: "12990 Rue Henri-Bourassa, Mi...",
    price: "Vendu",
    reference: "18544380",
    category: "residential",
    image: "/sold-house-quebec.jpg",
  },
  {
    id: 8,
    title: "Maison",
    location: "Mirabel",
    address: "13480 Rue du Suroît, Mirabel",
    price: "Vendu",
    reference: "28835498",
    category: "residential",
    image: "/sold-home-quebec-neighborhood.jpg",
  },
]

export function Properties() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [scrapedProperties, setScrapedProperties] = useState<Property[]>([])
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  // Fetch scraped properties on mount
  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("/api/scraped-properties")
        const data = await res.json()
        if (data.success && data.properties && data.properties.length > 0) {
          // Transform scraped data to match our Property interface
          const transformed = data.properties.map((p: any) => {
            // Clean up the type/title - remove sale/sold related words
            const cleanTitle =
              p.type
                ?.replace(/for sale/gi, "")
                .replace(/à vendre/gi, "")
                .replace(/sold/gi, "")
                .replace(/vendu/gi, "")
                .trim() || "Propriété"

            return {
              id: p.mlsNumber || p.id,
              title: cleanTitle,
              location: p.address?.split(",").slice(-1)[0]?.trim() || "",
              address: p.address,
              price: p.price,
              type: "À Vendre",
              reference: p.mlsNumber,
              mlsNumber: p.mlsNumber,
              units: null,
              category: p.type?.toLowerCase().includes("commercial") ? "commercial" : "residential",
              image: p.imageUrl || p.images?.[0],
              link: p.link,
              bedrooms: p.bedrooms,
              bathrooms: p.bathrooms,
            }
          })
          setScrapedProperties(transformed)
          setLastUpdated(data.lastUpdated)
        }
      } catch (error) {
        console.error("Failed to fetch scraped properties:", error)
      }
    }
    fetchProperties()
  }, [])

  // Use scraped properties if available, otherwise fallback to static
  const displayProperties = scrapedProperties.length > 0 ? scrapedProperties : staticProperties

  // Helper to extract numeric price for calculator
  const extractPrice = (priceStr: string) => {
    const num = priceStr.replace(/[^0-9]/g, "")
    return num ? parseInt(num, 10) : 500000
  }

  return (
    <section id="properties" className="py-24 bg-[#182542]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium text-white/70 uppercase tracking-widest mb-4 block">
            Nos Inscriptions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance text-white">
            Propriétés disponibles
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Découvrez notre sélection de propriétés à vendre dans la région.
          </p>
        </motion.div>

        {/* Properties Grid */}
        <div
          className={`grid gap-6 ${displayProperties.length === 1 ? "max-w-md mx-auto" : displayProperties.length === 2 ? "md:grid-cols-2 max-w-3xl mx-auto" : "md:grid-cols-2 lg:grid-cols-3"}`}
        >
          {displayProperties.map((property, index) => (
            <motion.a
              key={property.id}
              href={property.link || `https://www.centris.ca/fr/propriete/${property.mlsNumber || property.reference}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-xl overflow-hidden border border-white/10 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={property.image || property.imageUrl || "/placeholder.svg"}
                  alt={property.title || "Propriété"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#182542] hover:bg-[#182542]/90 text-white font-semibold shadow-lg text-sm px-3 py-2 rounded-md">
                    Voir l'inscription
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col h-[calc(100%-13rem)]">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[#182542] font-medium">{property.location}</span>
                </div>

                <div className="h-px bg-border mb-3" />

                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold text-[#182542]">{property.price}</span>
                  {/* Bedroom & Bathroom counts */}
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    {property.bedrooms && (
                      <span className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        {property.bedrooms}
                      </span>
                    )}
                    {property.bathrooms && (
                      <span className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        {property.bathrooms}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-1">{property.title}</p>

                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                  <span>Référence : {property.reference || property.mlsNumber}</span>
                </div>

                <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                  <MapPin className="w-3 h-3" />
                  {property.address}
                </p>

                <div className="mt-auto">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-[#182542] border-[#182542] hover:bg-[#182542] hover:text-white"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      const calcSection = document.getElementById("calculator")
                      if (calcSection) {
                        calcSection.scrollIntoView({ behavior: "smooth" })
                        // Dispatch custom event with price
                        window.dispatchEvent(
                          new CustomEvent("setCalculatorPrice", {
                            detail: { price: extractPrice(property.price) },
                          })
                        )
                      }
                    }}
                  >
                    Calculer mon hypothèque
                  </Button>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button className="bg-white hover:bg-white/90 text-[#182542] font-semibold group">
            Voir toutes les inscriptions sur Centris
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
