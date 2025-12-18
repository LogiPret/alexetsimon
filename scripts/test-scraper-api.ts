/**
 * Test script for the scraped properties API
 * Run with: npx tsx scripts/test-scraper-api.ts
 *
 * This mimics exactly what N8N sends from the Centris scraper
 */

const API_URL = process.env.API_URL || "http://localhost:3000/api/scraped-properties"
const SCRAPER_SECRET = process.env.SCRAPER_SECRET || "test-secret-123"

// Exact format N8N Centris scraper sends (from equipe-lambert test-scraper-api.js)
const testData = {
  success: true,
  broker: {
    agency: null,
    areaServed: null,
    image: null,
  },
  propertyCount: 3,
  properties: [
    {
      price: "$649,000",
      address: "5150, Rue Préfontaine, Laval (Auteuil)",
      type: "House for sale",
      link: "https://www.centris.ca/en/houses~for-sale~laval-auteuil/27301782",
      mlsNumber: "27301782",
      bedrooms: "3",
      bathrooms: "2",
      imageUrl: "https://mspublic.centris.ca/media.ashx?id=ADDD250DE84E052DDDDDDDDDD2&t=pi&sm=m&w=1260&h=1024",
    },
    {
      price: "$499,000",
      address: "80, Rue Prince, apt. 203, Montréal (Ville-Marie)",
      type: "Loft / Studio for sale",
      link: "https://www.centris.ca/en/lofts-studios~for-sale~montreal-ville-marie/10010582",
      mlsNumber: "10010582",
      bedrooms: "1",
      bathrooms: "1",
      imageUrl: "https://mspublic.centris.ca/media.ashx?id=ADDD250DEF5232CDDDDDDDDDDB&t=pi&sm=m&w=1260&h=1024",
    },
    {
      price: "$1,250,000",
      address: "789 Avenue des Entrepreneurs, Blainville, QC",
      type: "Commercial for sale",
      link: "https://www.centris.ca/fr/commercial~a-vendre~blainville/28345678",
      mlsNumber: "28345678",
      bedrooms: null,
      bathrooms: "2",
      imageUrl: "https://mspublic.centris.ca/media.ashx?id=GHI789&t=pi&w=640",
    },
  ],
  timestamp: new Date().toISOString(),
  scrapedAt: new Date().toISOString(),
}

async function testPost() {
  console.log("🧪 Testing POST /api/scraped-properties\n")

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SCRAPER_SECRET}`,
      },
      body: JSON.stringify(testData),
    })

    const data = await response.json()
    console.log(`Status: ${response.status}`)
    console.log("Response:", JSON.stringify(data, null, 2))

    if (response.ok) {
      console.log("\n✅ POST successful!")
    } else {
      console.log("\n❌ POST failed!")
    }
  } catch (error) {
    console.error("❌ Error:", error)
  }
}

// Test without auth - should return 401
async function testUnauthorized() {
  console.log("\n🔒 Testing unauthorized access (should fail)...\n")

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // No Authorization header
      },
      body: JSON.stringify(testData),
    })

    const data = await response.json()
    console.log(`Status: ${response.status}`)
    console.log("Response:", JSON.stringify(data, null, 2))

    if (response.status === 401) {
      console.log("\n✅ Correctly rejected unauthorized request!")
    } else {
      console.log("\n⚠️  Warning: Request was not rejected (SCRAPER_SECRET may not be set)")
    }
  } catch (error) {
    console.error("❌ Error:", error)
  }
}

async function testGet() {
  console.log("\n🧪 Testing GET /api/scraped-properties\n")

  try {
    const response = await fetch(API_URL)
    const data = await response.json()

    console.log(`Status: ${response.status}`)
    console.log("Response:", JSON.stringify(data, null, 2))

    if (response.ok && data.properties) {
      console.log(`\n✅ GET successful! Found ${data.properties.length} properties`)
    } else {
      console.log("\n❌ GET failed!")
    }
  } catch (error) {
    console.error("❌ Error:", error)
  }
}

async function main() {
  console.log("=".repeat(50))
  console.log("Scraped Properties API Test")
  console.log("=".repeat(50))
  console.log(`API URL: ${API_URL}`)
  console.log(`Secret: ${SCRAPER_SECRET.slice(0, 10)}...`)
  console.log("")

  // Test POST with auth
  await testPost()

  // Test GET
  await testGet()

  // Test unauthorized
  await testUnauthorized()

  console.log("\n" + "=".repeat(50))
  console.log("🎉 All tests completed!")
  console.log("=".repeat(50))
}

main()
