"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password === "studio") {
      sessionStorage.setItem("isAuthenticated", "true")
      router.push("/")
    } else {
      setError("Incorrect password. Please try again.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4">
      <header className="flex items-center justify-between px-6 py-6">
        <div>
          <Image
            src="/images/logo-202.png"
            alt="Immersive Studio Logo"
            width={120}
            height={35}
            className="h-10 w-auto"
            priority
          />
        </div>
      </header>

      {/* Login Form */}
      <div className="flex flex-1 items-center justify-center">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center space-y-4">
            <CardDescription className="text-base font-medium text-muted-foreground">
              Immersive Studio Interactive AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Enter Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button type="submit" className="h-11 w-full text-base" disabled={!email || !password}>
                Login
              </Button>
            </form>

            <div className="mt-6 text-center text-xs text-muted-foreground">
              <p>Professional pharmaceutical Interactive AI</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
