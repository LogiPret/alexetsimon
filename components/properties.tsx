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
  const [activeTab, setActiveTab] = useState<"available" | "sold">("available")
  const [categoryFilter, setCategoryFilter] = useState<"all" | "residential" | "commercial">("all")
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
  const properties = scrapedProperties.length > 0 ? scrapedProperties : staticProperties

  const baseProperties = activeTab === "available" ? properties : soldProperties

  const displayProperties =
    categoryFilter === "all" ? baseProperties : baseProperties.filter((p) => p.category === categoryFilter)

  const residentialCount = baseProperties.filter((p) => p.category === "residential").length
  const commercialCount = baseProperties.filter((p) => p.category === "commercial").length

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

        {/* Main Tabs - Updated colors */}
        <div className="flex justify-center gap-2 mb-6">
          <Button
            variant={activeTab === "available" ? "default" : "outline"}
            onClick={() => setActiveTab("available")}
            className={
              activeTab === "available"
                ? "bg-white hover:bg-white/90 text-[#182542] font-semibold"
                : "border-white/30 text-white hover:bg-white/10"
            }
          >
            À vendre ({properties.length})
          </Button>
          <Button
            variant={activeTab === "sold" ? "default" : "outline"}
            onClick={() => setActiveTab("sold")}
            className={
              activeTab === "sold"
                ? "bg-white hover:bg-white/90 text-[#182542] font-semibold"
                : "border-white/30 text-white hover:bg-white/10"
            }
          >
            Vendues ({soldProperties.length})
          </Button>
        </div>

        <div className="flex justify-center gap-2 mb-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCategoryFilter("all")}
            className={
              categoryFilter === "all" ? "bg-white/20 text-white" : "text-white/60 hover:text-white hover:bg-white/10"
            }
          >
            Tout ({baseProperties.length})
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCategoryFilter("residential")}
            className={
              categoryFilter === "residential"
                ? "bg-white/20 text-white"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }
          >
            Résidentiel ({residentialCount})
          </Button>
          {commercialCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCategoryFilter("commercial")}
              className={
                categoryFilter === "commercial"
                  ? "bg-white/20 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }
            >
              Commercial ({commercialCount})
            </Button>
          )}
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                {activeTab === "sold" && (
                  <div className="absolute inset-0 bg-[#182542]/70 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">Vendu</span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#182542] hover:bg-[#182542]/90 text-white font-semibold shadow-lg text-sm px-3 py-2 rounded-md">
                    Voir l'inscription
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[#182542] font-medium">{property.location}</span>
                  {"type" in property && property.type && (
                    <span className="text-xs font-medium px-2 py-1 bg-muted rounded text-[#182542]">
                      {property.type}
                    </span>
                  )}
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

                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {property.address}
                </p>
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
