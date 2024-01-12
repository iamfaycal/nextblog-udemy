import React from "react"
import { Button } from "./ui/button"
import { Sun } from "lucide-react"
import PageContainer from "./page-container"
import HeaderNavigation from "./header-navigation"
import ProfileButton from "./profile-button"
import ResponsiveMenu from "./responsive-menu"
import ToggleTheme from "./toggle-theme"
import Link from "next/link"

export default function Header() {
  return (
    <header className="p-4 border-b sticky top-0 z-10 bg-background">
      <PageContainer>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ResponsiveMenu />
            <Link href="/">
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-blue-600">
                NextBlog
              </h1>
            </Link>
          </div>
          <HeaderNavigation />
          <div className="flex items-center gap-2">
            <ToggleTheme />
            <ProfileButton />
          </div>
        </div>
      </PageContainer>
    </header>
  )
}
