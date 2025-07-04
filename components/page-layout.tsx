"use client"

import type React from "react"

import { useLanguage } from "@/components/language-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MobileNavigation from "@/components/mobile-navigation"

interface PageLayoutProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  const { language, toggleLanguage } = useLanguage()

  return (
    <div className="min-h-screen bg-[#F5FBFF] flex flex-col">
      <Header language={language} toggleLanguage={toggleLanguage} />
      <main className="flex-1">{children}</main>
      <Footer language={language} toggleLanguage={toggleLanguage} />
      <MobileNavigation language={language} toggleLanguage={toggleLanguage} />
    </div>
  )
}
