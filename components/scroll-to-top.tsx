"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 60,
        left: 0,
        behavior: "smooth",
      })
    })
  }, [pathname])

  return null
}
