import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface NewsletterData {
  name: string
  email: string
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const { data: result, error } = await resend.emails.send({
      from: "contact@ravindarbejjarapu.com", // Replace with your verified domain
      to: ["ravindar.bejjarapu@gmail.com"], // Your email
      subject: `Contact Form: ${data.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return { success: false, message: "Failed to send email" }
    }

    return { success: true, message: "Email sent successfully", data: result }
  } catch (error) {
    console.error("Email sending error:", error)
    return { success: false, message: "Failed to send email" }
  }
}

export async function subscribeToNewsletter(data: NewsletterData) {
  try {
    // Send confirmation email to subscriber
    const { data: result, error } = await resend.emails.send({
      from: "newsletter@ravindarbejjarapu.com", // Replace with your verified domain
      to: [data.email],
      subject: "Welcome to Ravindar Bejjarapu Newsletter!",
      html: `
        <h2>Welcome to my newsletter, ${data.name}!</h2>
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
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return { success: false, message: "Failed to subscribe" }
    }

    return { success: true, message: "Successfully subscribed to newsletter", data: result }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return { success: false, message: "Failed to subscribe" }
  }
}
