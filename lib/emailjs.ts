import emailjs from "@emailjs/browser"

// EmailJS configuration
const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_CLIENT_ID || "", // renamed from PUBLIC_KEY
}

export interface EmailData {
  name: string
  email: string
  subject: string
  message: string
}

export interface NewsletterData {
  name: string
  email: string
}

// Check if EmailJS is properly configured
function isEmailJSConfigured(): boolean {
  const hasAllKeys = !!(EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.templateId && EMAILJS_CONFIG.publicKey)

  if (!hasAllKeys) {
    console.log("🔧 EmailJS Configuration Status:", {
      serviceId: EMAILJS_CONFIG.serviceId ? "✅ Set" : "❌ Missing",
      templateId: EMAILJS_CONFIG.templateId ? "✅ Set" : "❌ Missing",
      publicKey: EMAILJS_CONFIG.publicKey ? "✅ Set" : "❌ Missing",
    })
  }

  return hasAllKeys
}

export async function sendContactEmail(data: EmailData): Promise<{ success: boolean; message: string }> {
  try {
    // Check if running in browser environment
    if (typeof window === "undefined") {
      return { success: false, message: "EmailJS can only run in browser environment" }
    }

    // Check if EmailJS is configured
    if (!isEmailJSConfigured()) {
      console.warn("⚠️ EmailJS not configured - using simulation mode")
      console.log("📧 Simulated contact email:", {
        name: data.name,
        email: data.email,
        title: data.subject,
        message: data.message,
      })

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { success: true, message: "Message sent successfully (simulation mode)" }
    }

    // Template parameters matching your EmailJS template exactly
    const templateParams = {
      name: data.name, // {{name}} in your template
      email: data.email, // {{email}} in your template
      title: data.subject, // {{title}} in your template (not "subject"!)
      message: data.message, // {{message}} in your template
    }

    console.log("📤 Sending contact email via EmailJS...")
    console.log("📋 Template parameters:", {
      name: templateParams.name,
      email: templateParams.email,
      title: templateParams.title,
      message: templateParams.message.substring(0, 50) + "...",
    })

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey,
    )

    console.log("✅ Contact email sent successfully:", response.status)
    return { success: true, message: "Your message has been sent successfully!" }
  } catch (error: any) {
    console.error("❌ EmailJS contact error:", error)

    // Handle specific EmailJS errors
    if (error.status === 400) {
      if (error.text?.includes("Public Key is invalid")) {
        return {
          success: false,
          message: "Email configuration error: Invalid Public Key. Please check your EmailJS settings.",
        }
      } else if (error.text?.includes("Template ID")) {
        return {
          success: false,
          message: "Email configuration error: Invalid Template ID. Please check your EmailJS template.",
        }
      } else if (error.text?.includes("Service ID")) {
        return {
          success: false,
          message: "Email configuration error: Invalid Service ID. Please check your EmailJS service.",
        }
      }
    }

    // For development, simulate success after logging error
    if (process.env.NODE_ENV === "development") {
      console.log("🔧 Development mode: Simulating successful email send despite error")
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { success: true, message: "Message sent successfully (development mode)" }
    }

    return {
      success: false,
      message: "Failed to send message. Please try again or contact directly via email.",
    }
  }
}

export async function subscribeNewsletter(data: NewsletterData): Promise<{ success: boolean; message: string }> {
  try {
    // Check if running in browser environment
    if (typeof window === "undefined") {
      return { success: false, message: "EmailJS can only run in browser environment" }
    }

    // Check if EmailJS is configured
    if (!isEmailJSConfigured()) {
      console.warn("⚠️ EmailJS not configured - using simulation mode")
      console.log("📧 Simulated newsletter subscription:", {
        name: data.name,
        email: data.email,
      })

      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { success: true, message: "Successfully subscribed to newsletter (simulation mode)" }
    }

    // Template parameters for newsletter - matching your template format
    const templateParams = {
      name: data.name, // {{name}} in your template
      email: data.email, // {{email}} in your template
      title: "Newsletter Subscription", // {{title}} in your template
      message: `New newsletter subscription from ${data.name} (${data.email})`, // {{message}} in your template
    }

    console.log("📤 Sending newsletter subscription via EmailJS...")
    console.log("📋 Newsletter parameters:", {
      name: templateParams.name,
      email: templateParams.email,
      title: templateParams.title,
    })

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey,
    )

    console.log("✅ Newsletter subscription sent successfully:", response.status)
    return { success: true, message: "Successfully subscribed to newsletter!" }
  } catch (error: any) {
    console.error("❌ Newsletter EmailJS error:", error)

    // For development, simulate success after logging error
    if (process.env.NODE_ENV === "development") {
      console.log("🔧 Development mode: Simulating successful newsletter subscription despite error")
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { success: true, message: "Successfully subscribed to newsletter (development mode)" }
    }

    return {
      success: false,
      message: "Failed to subscribe. Please try again later.",
    }
  }
}

// Initialize EmailJS (call this once in your app)
export function initEmailJS() {
  try {
    if (typeof window !== "undefined") {
      if (isEmailJSConfigured()) {
        emailjs.init(EMAILJS_CONFIG.publicKey)
        console.log("🚀 EmailJS initialized successfully")
      } else {
        console.log("⚠️ EmailJS not initialized - missing configuration")
      }
    }
  } catch (error) {
    console.error("❌ Failed to initialize EmailJS:", error)
  }
}

// Utility function to get configuration status
export function getEmailJSStatus() {
  return {
    configured: isEmailJSConfigured(),
    serviceId: !!EMAILJS_CONFIG.serviceId,
    templateId: !!EMAILJS_CONFIG.templateId,
    publicKey: !!EMAILJS_CONFIG.publicKey,
    environment: process.env.NODE_ENV,
  }
}
