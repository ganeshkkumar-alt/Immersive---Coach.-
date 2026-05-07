"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex flex-col">
      <header className="relative z-50 flex items-center justify-between px-6 py-3">
        <div>
          <img src="/images/logo-202.png" alt="Immersive Studio" className="h-10 w-auto object-contain" />
        </div>
        <div className="flex items-center gap-3">
          <Link href="/ai-coach?view=user">
            <Button
              variant="outline"
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700"
            >
              <Users className="h-4 w-4 mr-2" />
              User
            </Button>
          </Link>
          <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-primary/20 shadow-md hover:shadow-lg hover:border-primary/40 transition-all cursor-pointer">
            <img src="/images/ganesh.jpg" alt="User Account" className="h-full w-full object-cover" />
          </div>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-8 py-6">
        <div className="w-full max-w-3xl">
          <div className="mb-4 text-center">
            <h1 className="mb-2 text-3xl font-bold text-foreground text-balance">INTERACTIVE AI</h1>
            <p className="text-base text-muted-foreground max-w-xl mx-auto text-balance">
              Experience next-generation AI-powered interactions through immersive persona avatars and intelligent
              coaching
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {/* Persona Avatar Card */}
            <Link href="/interactive-ai/persona-avatars">
              <Card className="group relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 cursor-pointer h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative w-full aspect-[1/1] overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                  <img
                    src="/images/persona-20avatar-20home-20page-20card.png"
                    alt="Persona Avatars"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>

                <CardHeader className="relative pb-1 px-4 pt-2">
                  <CardTitle className="text-base font-bold">Persona Avatars</CardTitle>
                  <CardDescription className="text-xs">AI-Powered Role-Play Scenarios</CardDescription>
                </CardHeader>

                <CardContent className="relative px-4 pb-2">
                  <p className="mb-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    Engage with specialized AI personas including Healthcare Professional (HCP), Product, Brand, and Key
                    Account Manager (KAM) avatars to practice real-world pharmaceutical interactions.
                  </p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary"></div>
                      <span>Specialized Avatars</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary"></div>
                      <span>Persona-Aligned Interactions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary"></div>
                      <span>Guideline-Driven Communication</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-end gap-2">
                    <span className="text-xs font-medium text-primary">Click to Enter</span>
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <span className="text-primary text-sm">→</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* AI Coach Card */}
            <Link href="/ai-coach">
              <Card className="group relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 cursor-pointer h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative w-full aspect-[1/1] overflow-hidden bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                  <img
                    src="/images/ai-coach-card.jpg"
                    alt="AI Coach"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>

                <CardHeader className="relative pb-1 px-4 pt-2">
                  <CardTitle className="text-base font-bold">AI Coach</CardTitle>
                  <CardDescription className="text-xs">Advanced AI-Powered Coaching</CardDescription>
                </CardHeader>

                <CardContent className="relative px-4 pb-2">
                  <p className="mb-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    Advanced AI-powered coaching platform with real-time guidance, performance analytics, and
                    personalized learning paths.
                  </p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary"></div>
                      <span>Live Interactive Coaching</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary"></div>
                      <span>Advanced Analytics Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary"></div>
                      <span>Personalized Learning Paths</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-end gap-2">
                    <span className="text-xs font-medium text-primary">Click to Enter</span>
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <span className="text-primary text-sm">→</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
