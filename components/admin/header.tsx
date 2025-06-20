'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LanguageToggle } from "@/components/admin/language-toggle"

export function AdminHeader() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <LanguageToggle />
          <Avatar>
            <AvatarImage src="/avatar.png" alt="User" />
            <AvatarFallback>RB</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
} 