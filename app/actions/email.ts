"use server"

import { z } from "zod"
import { sendContactEmail, subscribeToNewsletter } from "@/lib/resend"

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

export interface EmailResult {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function submitContactForm(formData: FormData): Promise<EmailResult> {
  try {
    // Extract form data
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    // Validate the form data
    const validationResult = contactFormSchema.safeParse(rawData)

    if (!validationResult.success) {
      return {
        success: false,
        message: "Please check the form for errors",
        errors: validationResult.error.flatten().fieldErrors,
      }
    }

    const validatedData = validationResult.data

    // Send email using Resend
    const result = await sendContactEmail(validatedData)

    if (result.success) {
      return {
        success: true,
        message: "Your message has been sent successfully!",
      }
    } else {
      return {
        success: false,
        message: result.message || "Failed to send message. Please try again.",
      }
    }
  } catch (error) {
    console.error("Contact form submission error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}

export async function subscribeToNewsletterAction(formData: FormData): Promise<EmailResult> {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
    }

    // Validate the form data
    const validationResult = newsletterSchema.safeParse(rawData)

    if (!validationResult.success) {
      return {
        success: false,
        message: "Please enter valid name and email address",
        errors: validationResult.error.flatten().fieldErrors,
      }
    }

    const validatedData = validationResult.data

    // Subscribe using Resend
    const result = await subscribeToNewsletter(validatedData)

    if (result.success) {
      return {
        success: true,
        message: "Successfully subscribed to newsletter!",
      }
    } else {
      return {
        success: false,
        message: result.message || "Failed to subscribe. Please try again.",
      }
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return {
      success: false,
      message: "Failed to subscribe. Please try again later.",
    }
  }
}
