"use client"

import { useTheme } from "@/contexts/theme-context"
import { Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const themes = [
    { value: "eco-clean", label: "Eco Clean", color: "#7FB77E" },
    { value: "home-fresh", label: "Home Fresh", color: "#A8E6CF" },
    { value: "pure-nature", label: "Pure Nature", color: "#9BBF83" },
  ] as const

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Palette size={16} />
          <span className="hidden sm:inline">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTheme(t.value)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-4 h-4 rounded-full border-2 border-border" style={{ backgroundColor: t.color }} />
            <span className={theme === t.value ? "font-semibold" : ""}>{t.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
