"use client"

import Link from "next/link"

interface FooterProps {
  language: string
  toggleLanguage: () => void
}

export default function Footer({ language, toggleLanguage }: FooterProps) {
  const content = {
    te: {
      footer: {
        brandName: "రవీందర్ బేజ్జరాపు",
        about: "గురించి",
        privacy: "గోప్యత",
        contact: "సంప్రదింపు",
        copyright: "© 2024 రవీందర్ బేజ్జరాపు. అన్ని హక్కులు రక్షించబడ్డాయి.",
      },
    },
    en: {
      footer: {
        brandName: "Ravindar Bejjarapu",
        about: "About",
        privacy: "Privacy",
        contact: "Contact",
        copyright: "© 2024 Ravindar Bejjarapu. All rights reserved.",
      },
    },
  }

  const currentContent = content[language as keyof typeof content]

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2 telugu-heading">{currentContent.footer.brandName}</h3>
            <p className="text-gray-400 telugu-body">{currentContent.footer.copyright}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex space-x-6">
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors telugu-nav">
                {currentContent.footer.about}
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors telugu-nav">
                {currentContent.footer.privacy}
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors telugu-nav">
                {currentContent.footer.contact}
              </Link>
            </div>
            <button
              onClick={toggleLanguage}
              className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors hidden md:block"
            >
              {language === "te" ? "తెలుగు | English" : "Telugu | English"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
