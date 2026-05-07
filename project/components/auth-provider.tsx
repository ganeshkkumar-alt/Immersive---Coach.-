"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from 'next/navigation'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const authStatus = sessionStorage.getItem("isAuthenticated")
    
    if (authStatus === "true") {
      setIsAuthenticated(true)
    } else if (pathname !== "/login") {
      // Redirect to login if not authenticated
      router.push("/login")
    }
    
    setIsLoading(false)
  }, [pathname, router])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  // If on login page, always show it
  if (pathname === "/login") {
    return <>{children}</>
  }

  // If authenticated, show content
  if (isAuthenticated) {
    return <>{children}</>
  }

  // Otherwise don't render (will redirect)
  return null
}
