"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Settings } from "lucide-react"
import { getEmailJSStatus } from "@/lib/emailjs"

export function EmailStatus() {
  const [status, setStatus] = useState<any>(null)

  useEffect(() => {
    setStatus(getEmailJSStatus())
  }, [])

  if (!status) return null

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          EmailJS Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span>Configuration</span>
          <Badge variant={status.configured ? "default" : "secondary"}>
            {status.configured ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
            {status.configured ? "Ready" : "Not Set"}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span>Service ID</span>
          <Badge variant={status.serviceId ? "default" : "outline"}>{status.serviceId ? "✓" : "✗"}</Badge>
        </div>

        <div className="flex items-center justify-between">
          <span>Template ID</span>
          <Badge variant={status.templateId ? "default" : "outline"}>{status.templateId ? "✓" : "✗"}</Badge>
        </div>

        <div className="flex items-center justify-between">
          <span>Public Key</span>
          <Badge variant={status.publicKey ? "default" : "outline"}>{status.publicKey ? "✓" : "✗"}</Badge>
        </div>

        <div className="flex items-center justify-between">
          <span>Environment</span>
          <Badge variant="outline">{status.environment}</Badge>
        </div>

        {status.configured && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700 font-medium">
              🎉 EmailJS is ready! Your contact forms will send real emails.
            </p>
          </div>
        )}

        {!status.configured && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">📧 Forms work in demo mode. Set up EmailJS for real email delivery.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
