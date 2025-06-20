"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Users,
  BookOpen,
  Mic,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import PageLayout from "@/components/page-layout"
import { useLanguage } from "@/components/language-provider"
import { useContactContent } from "@/hooks/use-content"
import { submitContactForm, type ContactFormResult } from "@/app/actions/contact"

export default function ContactPage() {
  const { language } = useLanguage()
  const { content: staticContent, loading, error } = useContactContent()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [formResult, setFormResult] = useState<ContactFormResult | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  const uiContent = {
    te: {
      loading: "లోడ్ అవుతోంది...",
      error: "కంటెంట్ లోడ్ చేయడంలో లోపం:",
      sending: "పంపుతోంది...",
      success: "మీ సందేశం విజయవంతంగా పంపబడింది!",
      errorSending: "సందేశం పంపడంలో లోపం. దయచేసి మళ్లీ ప్రయత్నించండి.",
      required: "ఈ ఫీల్డ్ అవసరం",
      invalidEmail: "చెల్లుబాటు అయ్యే ఇమెయిల్ చిరునామా రాయండి",
    },
    en: {
      loading: "Loading...",
      error: "Error loading content:",
      sending: "Sending...",
      success: "Your message has been sent successfully!",
      errorSending: "Error sending message. Please try again.",
      required: "This field is required",
      invalidEmail: "Please enter a valid email address",
    },
  }

  const currentUiContent = uiContent[language as keyof typeof uiContent]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (formDataObj: FormData) => {
    setFormStatus("sending")
    setFieldErrors({})
    setFormResult(null)

    try {
      const result = await submitContactForm(formDataObj)

      if (result.success) {
        setFormStatus("success")
        setFormResult(result)
        // Reset form on success
        setFormData({ name: "", email: "", subject: "", message: "" })
        const form = document.getElementById("contact-form") as HTMLFormElement
        if (form) form.reset()
      } else {
        setFormStatus("error")
        setFormResult(result)
        if (result.errors) {
          setFieldErrors(result.errors)
        }
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setFormStatus("error")
      setFormResult({
        success: false,
        message: currentUiContent.errorSending,
      })
    }
  }

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "facebook":
        return <Facebook className="w-5 h-5" />
      case "twitter":
        return <Twitter className="w-5 h-5" />
      case "instagram":
        return <Instagram className="w-5 h-5" />
      case "youtube":
        return <Youtube className="w-5 h-5" />
      default:
        return <Mail className="w-5 h-5" />
    }
  }

  const getCollaborationIcon = (title: string) => {
    if (title.includes("Literary") || title.includes("సాహిత్య")) return <BookOpen className="w-6 h-6" />
    if (title.includes("Workshop") || title.includes("వర్క్‌షాప్")) return <Users className="w-6 h-6" />
    if (title.includes("Publishing") || title.includes("ప్రచురణ")) return <FileText className="w-6 h-6" />
    if (title.includes("Media") || title.includes("మీడియా")) return <Mic className="w-6 h-6" />
    return <BookOpen className="w-6 h-6" />
  }

  if (loading) {
    return (
      <PageLayout>
        <div className="py-20 px-4 text-center">
          <div className="text-xl text-gray-600 telugu-body">{currentUiContent.loading}</div>
        </div>
      </PageLayout>
    )
  }

  if (error || !staticContent) {
    return (
      <PageLayout>
        <div className="py-20 px-4 text-center">
          <div className="text-xl text-red-600 telugu-body">
            {currentUiContent.error} {error}
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight telugu-heading">
            {staticContent.hero.title[language as keyof typeof staticContent.hero.title]}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed telugu-body max-w-3xl mx-auto">
            {staticContent.hero.subtitle[language as keyof typeof staticContent.hero.subtitle]}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 telugu-heading">
                    {staticContent.form.title[language as keyof typeof staticContent.form.title]}
                  </CardTitle>
                  <p className="text-gray-600 telugu-body">
                    {staticContent.form.subtitle[language as keyof typeof staticContent.form.subtitle]}
                  </p>
                </CardHeader>
                <CardContent>
                  <form id="contact-form" action={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 telugu-nav">
                          {staticContent.form.fields.name[language as keyof typeof staticContent.form.fields.name]}
                        </label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={
                            staticContent.form.placeholders.name[
                              language as keyof typeof staticContent.form.placeholders.name
                            ]
                          }
                          className="telugu-body"
                          required
                        />
                        {fieldErrors.name && (
                          <div className="text-red-600 text-sm mt-1 telugu-body">{fieldErrors.name[0]}</div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 telugu-nav">
                          {staticContent.form.fields.email[language as keyof typeof staticContent.form.fields.email]}
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={
                            staticContent.form.placeholders.email[
                              language as keyof typeof staticContent.form.placeholders.email
                            ]
                          }
                          className="telugu-body"
                          required
                        />
                        {fieldErrors.email && (
                          <div className="text-red-600 text-sm mt-1 telugu-body">{fieldErrors.email[0]}</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 telugu-nav">
                        {staticContent.form.fields.subject[language as keyof typeof staticContent.form.fields.subject]}
                      </label>
                      <Input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder={
                          staticContent.form.placeholders.subject[
                            language as keyof typeof staticContent.form.placeholders.subject
                          ]
                        }
                        className="telugu-body"
                        required
                      />
                      {fieldErrors.subject && (
                        <div className="text-red-600 text-sm mt-1 telugu-body">{fieldErrors.subject[0]}</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 telugu-nav">
                        {staticContent.form.fields.message[language as keyof typeof staticContent.form.fields.message]}
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={
                          staticContent.form.placeholders.message[
                            language as keyof typeof staticContent.form.placeholders.message
                          ]
                        }
                        rows={6}
                        className="telugu-body"
                        required
                      />
                      {fieldErrors.message && (
                        <div className="text-red-600 text-sm mt-1 telugu-body">{fieldErrors.message[0]}</div>
                      )}
                    </div>

                    {/* Form Status Messages */}
                    {formResult && formStatus === "success" && (
                      <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
                        <CheckCircle className="w-5 h-5" />
                        <span className="telugu-body">{formResult.message}</span>
                      </div>
                    )}

                    {formResult && formStatus === "error" && (
                      <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                        <AlertCircle className="w-5 h-5" />
                        <span className="telugu-body">{formResult.message}</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="w-full bg-[#0056D2] hover:bg-blue-700 text-white py-3 text-lg font-medium transition-colors telugu-nav"
                    >
                      {formStatus === "sending" ? (
                        <>
                          <Send className="w-5 h-5 mr-2 animate-pulse" />
                          {currentUiContent.sending}
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          {staticContent.form.fields.submit[language as keyof typeof staticContent.form.fields.submit]}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 telugu-heading">
                    {staticContent.info.title[language as keyof typeof staticContent.info.title]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#0056D2] rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 telugu-nav">
                        {staticContent.info.email.label[language as keyof typeof staticContent.info.email.label]}
                      </h3>
                      <p className="text-gray-600">{staticContent.info.email.value}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#0056D2] rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 telugu-nav">
                        {staticContent.info.phone.label[language as keyof typeof staticContent.info.phone.label]}
                      </h3>
                      <p className="text-gray-600">{staticContent.info.phone.value}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#0056D2] rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 telugu-nav">
                        {staticContent.info.location.label[language as keyof typeof staticContent.info.location.label]}
                      </h3>
                      <p className="text-gray-600 telugu-body">
                        {staticContent.info.location.value[language as keyof typeof staticContent.info.location.value]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#0056D2] rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 telugu-nav">
                        {
                          staticContent.info.availability.label[
                            language as keyof typeof staticContent.info.availability.label
                          ]
                        }
                      </h3>
                      <p className="text-gray-600 telugu-body">
                        {
                          staticContent.info.availability.value[
                            language as keyof typeof staticContent.info.availability.value
                          ]
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 telugu-heading">
              {staticContent.social.title[language as keyof typeof staticContent.social.title]}
            </h2>
            <p className="text-xl text-gray-600 telugu-body">
              {staticContent.social.subtitle[language as keyof typeof staticContent.social.subtitle]}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {staticContent.social.links.map((social, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#0056D2] rounded-full flex items-center justify-center mx-auto mb-4">
                    {getSocialIcon(social.icon)}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{social.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 telugu-body">
                    {social.description[language as keyof typeof social.description]}
                  </p>
                  <Button
                    variant="outline"
                    className="border-[#0056D2] text-[#0056D2] hover:bg-[#0056D2] hover:text-white transition-colors"
                    onClick={() => window.open(social.url, "_blank")}
                  >
                    Follow
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 telugu-heading">
              {staticContent.collaboration.title[language as keyof typeof staticContent.collaboration.title]}
            </h2>
            <p className="text-xl text-gray-600 telugu-body max-w-3xl mx-auto">
              {staticContent.collaboration.subtitle[language as keyof typeof staticContent.collaboration.subtitle]}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {staticContent.collaboration.areas.map((area, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {getCollaborationIcon(area.title[language as keyof typeof area.title])}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 telugu-heading">
                        {area.title[language as keyof typeof area.title]}
                      </h3>
                      <p className="text-gray-600 telugu-body">
                        {area.description[language as keyof typeof area.description]}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
