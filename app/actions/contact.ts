"use server"

import { z } from "zod"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// Contact form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must be less than 200 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
})

const newsletterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type NewsletterData = z.infer<typeof newsletterSchema>

export interface ContactFormResult {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

// Check if Resend is configured
function isResendConfigured(): boolean {
  return !!process.env.RESEND_API_KEY
}

// Send email using Resend
async function sendEmailViaResend(templateParams: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    if (!isResendConfigured()) {
      console.warn("⚠️ Resend not configured - using simulation mode")
      console.log("📧 Simulated email:", templateParams)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { success: true, message: "Email sent successfully (simulation mode)" }
    }

    const { data, error } = await resend.emails.send({
      from: "contact@ravindarbejjarapu.com", // Replace with your verified domain
      to: ["ravindar.bejjarapu@gmail.com"], // Your email
      subject: `Contact Form: ${templateParams.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${templateParams.name}</p>
        <p><strong>Email:</strong> ${templateParams.email}</p>
        <p><strong>Subject:</strong> ${templateParams.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${templateParams.message.replace(/\n/g, "<br>")}</p>
      `,
    })

    if (error) {
      console.error("❌ Resend API error:", error)
      return { success: false, message: "Failed to send email. Please try again." }
    }

    console.log("✅ Email sent successfully via Resend")
    return { success: true, message: "Email sent successfully!" }
  } catch (error) {
    console.error("❌ Resend request error:", error)
    return { success: false, message: "Network error. Please check your connection and try again." }
  }
}

export async function submitContactForm(formData: FormData): Promise<ContactFormResult> {
  try {
    // Extract and validate form data
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    const validationResult = contactFormSchema.safeParse(rawData)

    if (!validationResult.success) {
      return {
        success: false,
        message: "Please check the form for errors",
        errors: validationResult.error.flatten().fieldErrors,
      }
    }

    const validatedData = validationResult.data

    console.log("📤 Sending contact email via Resend...")
    const result = await sendEmailViaResend(validatedData)

    return {
      success: result.success,
      message: result.message,
    }
  } catch (error) {
    console.error("Contact form submission error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}

export async function subscribeToNewsletter(formData: FormData): Promise<ContactFormResult> {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
    }

    const validationResult = newsletterSchema.safeParse(rawData)

    if (!validationResult.success) {
      return {
        success: false,
        message: "Please enter valid name and email address",
        errors: validationResult.error.flatten().fieldErrors,
      }
    }

    const validatedData = validationResult.data

    if (!isResendConfigured()) {
      console.warn("⚠️ Resend not configured - using simulation mode")
      console.log("📧 Simulated newsletter subscription:", validatedData)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { success: true, message: "Successfully subscribed to newsletter! (simulation mode)" }
    }

    // Send confirmation email to subscriber
    const { data, error } = await resend.emails.send({
      from: "newsletter@ravindarbejjarapu.com", // Replace with your verified domain
      to: [validatedData.email],
      subject: "Welcome to Ravindar Bejjarapu Newsletter!",
      html: `
        <h2>Welcome to my newsletter, ${validatedData.name}!</h2>
        <p>Thank you for subscribing to my newsletter. You'll receive updates about my latest stories, novels, and blog posts.</p>
        <p>Best regards,<br>Ravindar Bejjarapu</p>
      `,
    })

    // Also send notification to yourself
    await resend.emails.send({
      from: "newsletter@ravindarbejjarapu.com",
      to: ["ravindar.bejjarapu@gmail.com"],
      subject: "New Newsletter Subscription",
      html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
      `,
    })

    if (error) {
      console.error("❌ Resend newsletter error:", error)
      return { success: false, message: "Failed to subscribe. Please try again." }
    }

    return {
      success: true,
      message: "Successfully subscribed to newsletter!",
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return {
      success: false,
      message: "Failed to subscribe. Please try again later.",
    }
  }
}
