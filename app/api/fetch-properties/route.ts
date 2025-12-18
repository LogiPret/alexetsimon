import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

// Max execution time (60s for Pro, 10s for Hobby)
export const maxDuration = 60

const SCRAPER_URL = "https://centrisscraper-production.up.railway.app/scrape-realtor"
const DATA_FILE = path.join(process.cwd(), "data", "properties.json")

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data")
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

export async function GET(request: NextRequest) {
  // Optional: Verify cron secret for Vercel Cron jobs
  const authHeader = request.headers.get("authorization")
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    console.log("🔄 Fetching properties from Centris scraper...")

    // Call the Centris scraper
    const response = await fetch(SCRAPER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        realtorName: "Alexandre Brosseau",
        detailed: true,
      }),
    })

    if (!response.ok) {
      throw new Error(`Scraper returned ${response.status}: ${response.statusText}`)
    }

    const scraperData = await response.json()
    console.log(`✅ Received ${scraperData.properties?.length || 0} properties`)

    // Transform and save properties
    const allProperties = (scraperData.properties || []).map((prop: any) => ({
      id: prop.mlsNumber || prop.id,
      mlsNumber: prop.mlsNumber,
      price: prop.price,
      address: prop.address,
      type: prop.type,
      link: prop.link,
      bedrooms: prop.bedrooms,
      bathrooms: prop.bathrooms,
      imageUrl: prop.imageUrl,
      images: prop.images || [prop.imageUrl].filter(Boolean),
    }))

    // Remove duplicates based on MLS number AND normalized address
    const seenMls = new Set<string>()
    const seenAddress = new Set<string>()
    const properties = allProperties.filter((prop: any) => {
      // Skip if no MLS number
      if (!prop.mlsNumber) return false

      // Check MLS duplicate
      if (seenMls.has(prop.mlsNumber)) return false

      // Normalize address for comparison (remove spaces, lowercase, remove apt/unit variations)
      const normalizedAddress = prop.address
        ?.toLowerCase()
        .replace(/[,.\-]/g, "")
        .replace(/\s+/g, "")
        .replace(/apt\.?|unit\.?|#/gi, "")
        .slice(0, 30) // Compare first 30 chars to catch similar addresses

      if (normalizedAddress && seenAddress.has(normalizedAddress)) {
        console.log(`Skipping duplicate address: ${prop.address}`)
        return false
      }

      seenMls.add(prop.mlsNumber)
      if (normalizedAddress) seenAddress.add(normalizedAddress)
      return true
    })

    console.log(`✅ Received ${allProperties.length} properties, ${properties.length} unique`)

    const dataToSave = {
      success: true,
      broker: {
        name: "Alexandre Brosseau",
        agency: scraperData.broker?.agency || "Alex & Simon - Courtiers Immobiliers",
      },
      properties,
      propertyCount: properties.length,
      lastUpdated: new Date().toISOString(),
      scrapedAt: scraperData.scrapedAt || new Date().toISOString(),
    }

    await ensureDataDir()
    await fs.writeFile(DATA_FILE, JSON.stringify(dataToSave, null, 2))

    console.log(`💾 Saved ${properties.length} properties to ${DATA_FILE}`)

    return NextResponse.json({
      success: true,
      message: `Fetched and saved ${properties.length} properties`,
      propertyCount: properties.length,
      lastUpdated: dataToSave.lastUpdated,
    })
  } catch (error) {
    console.error("❌ Error fetching properties:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch properties",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
