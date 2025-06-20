import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/components/language-provider"
import Analytics from "@/components/analytics"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "రవీందర్ బేజ్జరాపు - నా రచనలు",
  description: "తెలంగాణ నేలమీద పుట్టిన కథలు, భావాలు మరియు అనుభవాలు",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="te" translate="no">
      <head>
        <meta name="google" content="notranslate" />
        <meta name="robots" content="notranslate" />
        <meta httpEquiv="Content-Language" content="te,en" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@100;200;300;400;500;600;700;800;900&family=Tiro+Telugu:ital,wght@0,400;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className} translate="no">
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
