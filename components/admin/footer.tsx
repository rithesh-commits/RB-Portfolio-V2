"use client"

import Link from "next/link"

export default function AdminFooter() {
  return (
    <footer className="bg-gray-900 text-white py-6 px-4 border-t border-blue-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold mb-1 telugu-heading bg-gradient-to-r from-[#0056D2] to-blue-600 bg-clip-text text-transparent">
            Ravindar Bejjarapu
          </h3>
          <p className="text-gray-400 text-xs">© 2024 Ravindar Bejjarapu. Admin Panel. All rights reserved.</p>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
            Main Site
          </Link>
          <a href="mailto:admin@ravindarbejjarapu.com" className="text-gray-400 hover:text-white transition-colors text-sm">
            Contact Admin
          </a>
        </div>
      </div>
    </footer>
  )
} 