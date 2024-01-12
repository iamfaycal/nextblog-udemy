"use client"

import { Moon, Sun } from "lucide-react"
import React from "react"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")
  return (
    <Button
      className="flex justify-center"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
    >
      <Moon className="h-6 w-6 block dark:hidden" />
      <Sun className="h-6 w-6 hidden dark:block" />
    </Button>
  )
}
