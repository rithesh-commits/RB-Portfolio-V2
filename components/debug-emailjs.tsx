"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Settings, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DebugEmailJS() {
  const [showValues, setShowValues] = useState(false)
  const [config, setConfig] = useState<any>(null)

  useEffect(() => {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ""
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ""
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_CLIENT_ID || ""

    setConfig({
      serviceId,
      templateId,
      publicKey,
      configured: !!(serviceId && templateId && publicKey),
    })
  }, [])

  if (!config) return null

  const maskValue = (value: string) => {
    if (!value) return "❌ Not Set"
    if (!showValues) return "✅ " + "*".repeat(8) + value.slice(-4)
    return "✅ " + value
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          EmailJS Configuration Debug
          <Button variant="ghost" size="sm" onClick={() => setShowValues(!showValues)} className="ml-auto">
            {showValues ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showValues ? "Hide" : "Show"} Values
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Overall Status</span>
          <Badge variant={config.configured ? "default" : "destructive"}>
            {config.configured ? (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                Ready for Real Emails
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3 mr-1" />
                Simulation Mode
              </>
            )}
          </Badge>
        </div>

        <div className="space-y-3 border-t pt-4">
          <div className="flex items-center justify-between">
            <span>Service ID</span>
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">{maskValue(config.serviceId)}</code>
          </div>

          <div className="flex items-center justify-between">
            <span>Template ID</span>
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">{maskValue(config.templateId)}</code>
          </div>

          <div className="flex items-center justify-between">
            <span>Public Key (Client ID)</span>
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">{maskValue(config.publicKey)}</code>
          </div>
        </div>

        {config.configured ? (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-700 font-medium">
              🎉 EmailJS is properly configured! Your forms will send real emails.
            </p>
          </div>
        ) : (
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-700 font-medium mb-2">
              ⚠️ EmailJS is not configured. Forms are running in simulation mode.
            </p>
            <p className="text-xs text-yellow-600">
              Add the missing environment variables to your .env.local file and restart the server.
            </p>
          </div>
        )}

        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700 font-medium mb-1">📝 Need help setting up EmailJS?</p>
          <p className="text-xs text-blue-600">
            1. Go to emailjs.com and create an account
            <br />
            2. Create an email service (Gmail, Outlook, etc.)
            <br />
            3. Create an email template with variables: name, email, title, message
            <br />
            4. Get your Service ID, Template ID, and Public Key
            <br />
            5. Add them to your .env.local file
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
