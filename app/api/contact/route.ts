import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Tous les champs requis doivent être remplis" }, { status: 400 })
    }

    // Map subject values to French labels
    const subjectLabels: Record<string, string> = {
      achat: "Achat",
      vente: "Vente",
      evaluation: "Évaluation",
      autre: "Autre",
    }

    const RECIPIENT_EMAIL = process.env.CONTACT_FORM_RECIPIENT_EMAIL || "hotth@logipret.ca"

    const html = `
      <h2>Nouveau message du formulaire de contact Alex & Simon</h2>
      <ul>
        <li><strong>Nom</strong>: ${name}</li>
        <li><strong>Courriel</strong>: ${email}</li>
        <li><strong>Téléphone</strong>: ${phone || "Non fourni"}</li>
        <li><strong>Sujet</strong>: ${subjectLabels[subject] || subject}</li>
      </ul>
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `

    const textContent = `
Nouveau message du formulaire de contact Alex & Simon

Nom: ${name}
Courriel: ${email}
Téléphone: ${phone || "Non fourni"}
Sujet: ${subjectLabels[subject] || subject}

Message:
${message}
    `.trim()

    // Check if Gmail credentials are configured
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: RECIPIENT_EMAIL,
        replyTo: email,
        subject: `Contact Alex & Simon - ${subjectLabels[subject] || subject} - ${name}`,
        text: textContent,
        html: html,
      })

      return NextResponse.json({ success: true, message: "Message envoyé avec succès" })
    }

    // Fallback: Log to console if no email service is configured
    console.log("=== NOUVEAU MESSAGE DE CONTACT ===")
    console.log("Destinataire:", RECIPIENT_EMAIL)
    console.log(textContent)
    console.log("==================================")

    // Return success even without email service (for testing)
    return NextResponse.json({
      success: true,
      message: "Message reçu (mode test - configurez GMAIL_USER et GMAIL_APP_PASSWORD pour envoyer des emails)",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Une erreur est survenue lors de l'envoi" }, { status: 500 })
  }
}
