import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

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

// GET - Fetch current properties
export async function GET() {
  try {
    await ensureDataDir()

    try {
      const data = await fs.readFile(DATA_FILE, "utf-8")
      return NextResponse.json(JSON.parse(data))
    } catch {
      // No data file yet, return empty
      return NextResponse.json({
        success: true,
        properties: [],
        propertyCount: 0,
        lastUpdated: null,
      })
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 })
  }
}

// POST - Receive scraped properties from N8N
export async function POST(request: NextRequest) {
  try {
    // Verify authorization
    const authHeader = request.headers.get("authorization")
    const expectedToken = `Bearer ${process.env.SCRAPER_SECRET}`

    if (!process.env.SCRAPER_SECRET) {
      console.warn("SCRAPER_SECRET not set - skipping auth check in development")
    } else if (authHeader !== expectedToken) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Invalid or missing authorization token" },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Validate incoming data
    if (!body.properties || !Array.isArray(body.properties)) {
      return NextResponse.json({ error: "Invalid data", message: "Properties array is required" }, { status: 400 })
    }

    // Filter for Alexandre Brosseau's properties if broker filter is needed
    const properties = body.properties.map((prop: any) => ({
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

    const dataToSave = {
      success: true,
      broker: {
        name: "Alexandre Brosseau",
        agency: body.broker?.agency || "Alex & Simon - Courtiers Immobiliers",
      },
      properties,
      propertyCount: properties.length,
      lastUpdated: new Date().toISOString(),
      scrapedAt: body.scrapedAt || new Date().toISOString(),
    }

    await ensureDataDir()
    await fs.writeFile(DATA_FILE, JSON.stringify(dataToSave, null, 2))

    return NextResponse.json({
      success: true,
      message: `Successfully updated ${properties.length} properties`,
      data: {
        insertedCount: properties.length,
        totalReceived: body.properties.length,
        scrapedAt: dataToSave.scrapedAt,
      },
    })
  } catch (error) {
    console.error("Error saving properties:", error)
    return NextResponse.json({ error: "Server error", message: "Failed to save properties" }, { status: 500 })
  }
}
