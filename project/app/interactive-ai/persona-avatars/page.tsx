"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Stethoscope,
  Package,
  Briefcase,
  ShoppingBag,
  Play,
  MessageSquare,
  X,
  StopCircle,
  Clock,
  ArrowLeft,
  LayoutDashboard,
  Users,
  ChevronDown,
  ChevronRight,
  Video,
} from "lucide-react"
import { useState, useEffect } from "react"
import HeygenStreamingEmbed from "@/components/HeygenStreamingEmbed"
import { useRouter } from "next/navigation"
import { PersonaVisualCoachingSession } from "@/components/persona-visual-coaching-session"

interface SessionLog {
  id: string
  personaTitle: string
  duration: number
  notes: string
  timestamp: Date
}

const personaAvatars = [
  {
    id: "hcp",
    title: "HCP Persona",
    subtitle: "Healthcare Professional",
    icon: Stethoscope,
    description:
      "HCP Avatar delivers accurate, evidence-based medical communication with clear terminology and guideline-aligned explanations. Designed to simulate peer-level interactions, it supports scientific discussions, clinical learning, and professional healthcare communication.",
    image: "/images/HCP.png",
    color: "from-blue-500 to-cyan-500",
    stats: {
      sessions: 47,
      specialty: "Internal Medicine",
    },
    avatarShareURL:
      "/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJHcmFoYW1fUHJvZmVzc2lvbmFsTG9vazJf%0D%0AcHVibGljIiwicHJldmlld0ltZyI6Imh0dHBzOi8vZmlsZXMyLmhleWdlbi5haS9hdmF0YXIvdjMv%0D%0AZmY1MGY4NzRkODIxNDAwY2JhZWZkZTlmZjkyYjZhNzNfNTU4NTAvcHJldmlld190YWxrXzEud2Vi%0D%0AcCIsIm5lZWRSZW1vdmVCYWNrZ3JvdW5kIjp0cnVlLCJrbm93bGVkZ2VCYXNlSWQiOiI0ZTkxZWVi%0D%0AMDM4ODQ0MWMyYjJhMjlhYjc1ZGYzOThmMSIsInVzZXJuYW1lIjoiZTU3YjIxNTEwMjljNGM3Mzk1%0D%0AYTQ1NDM2MzQyOTg5YWUifQ%3D%3D&inIFrame=1",
    skillsLabel: "Responsibilities",
    skills: [
      "Explain Disease & Clinical Mechanisms",
      "Communicate Clinical Symptoms & Diagnosis",
      "Engage in Peer-Level Medical Discussion",
      "Guide Clinical Narratives & Case Reasoning",
      "Support Day-to-Day Clinical Decision Making",
    ],
    scenarios: [
      "First Meeting With HCP",
      "Follow-Up Visit Discussion",
      "Lunch & Learn Session",
      "Clinical Trial Conversation",
    ],
  },
  {
    id: "kam",
    title: "KAM Persona",
    subtitle: "Key Account Manager",
    icon: Briefcase,
    description:
      "KAM Avatar delivers tailored, account-centric messaging such as access updates, formulary changes, and product reminders aligned to each account's needs. It enables scalable virtual detailing with structured, compliant communication without requiring direct interactions with account stakeholders.",
    image: "/images/KAM.png",
    color: "from-green-500 to-emerald-500",
    stats: {
      sessions: 28,
      specialty: "Hospital Networks",
    },
    avatarShareURL:
      "/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJQZWRyb19Qcm9mZXNzaW9uYWxMb29rMl9w%0D%0AdWJsaWMiLCJwcmV2aWV3SW1nIjoiaHR0cHM6Ly9maWxlczIuaGV5Z2VuLmFpL2F2YXRhci92My9m%0D%0AOWM5NGFlN2JkMTU0NWU4YjY1MzFhOTFiYTk3NmFkOV81NTkxMC9wcmV2aWV3X3RhbGtfMS53ZWJw%0D%0AIiwibmVlZFJlbW92ZUJhY2tncm91bmQiOnRydWUsImtub3dsZWRnZUJhc2VJZCI6IjY2YWM3MmQ1%0D%0ANTEwMDQ1ZjU4YjRkNDk5Y2Q2ZDk2OGZmIiwidXNlcm5hbWUiOiJlNTdiMjE1MTAyOWM0YzczOTVh%0D%0ANDU0MzYzNDI5ODlhZSJ9&inIFrame=1",
    skillsLabel: "Responsibilities",
    skills: [
      "Account-Specific Messaging",
      "Access & Formulary Updates",
      "Product & Value Communication",
      "Structured Virtual Detailing",
    ],
    scenarios: [
      "Account Review Conversation",
      "Access Update Discussion",
      "Virtual Detailing Simulation",
      "Product Value Reinforcement",
    ],
  },
  {
    id: "brand",
    title: "Brand Persona",
    subtitle: "Brand Manager Persona",
    icon: Package,
    description:
      "Brand Avatar maintains a consistent visual and verbal identity across campaigns, delivering narratives that reflect the brand's tone, values, and character. It ensures message continuity, builds trust, and reinforces the brand story across formats and markets.",
    image: "/images/Brand.png",
    color: "from-purple-500 to-pink-500",
    stats: {
      sessions: 32,
      specialty: "Oncology Portfolio",
    },
    avatarShareURL:
      "/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJBbnRob255X1Byb2Zlc3Npb25hbExvb2sy%0D%0AX3B1YmxpYyIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3Yz%0D%0ALzJkMDVlODUxZDI3ZjQ5YjBiNzg0ZjA4NzJjMzYwZDYzXzU1ODMwL3ByZXZpZXdfdGFsa18xLndl%0D%0AYnAiLCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6dHJ1ZSwia25vd2xlZGdlQmFzZUlkIjoiOWE1MjYy%0D%0AOTY5N2ZiNDhhMGI2MmVlMmU1NDc2YWExODUiLCJ1c2VybmFtZSI6ImU1N2IyMTUxMDI5YzRjNzM5%0D%0ANWE0NTQzNjM0Mjk4OWFlIn0%3D&inIFrame=1",
    skillsLabel: "Responsibilities",
    skills: [
      "Maintain Brand Consistency",
      "Reinforce Brand Values & Tone",
      "Ensure Message Continuity",
      "Strengthen Brand Storytelling",
    ],
    scenarios: [
      "Campaign Messaging Review",
      "Cross-Market Adaptation",
      "Multiformat Storytelling",
      "Brand Tone Alignment Check",
    ],
  },
  {
    id: "product",
    title: "Custom Avatar",
    subtitle: "Product Specialist",
    icon: ShoppingBag,
    description:
      "Product Avatar delivers clear, label-accurate explanations of MOA, clinical benefits, safety considerations, and dosing. It simplifies complex scientific concepts into structured, easy-to-understand narratives supported by visuals or data summaries to enhance product education and clinical clarity.",
    image: "/images/image.png",
    color: "from-orange-500 to-red-500",
    stats: {
      sessions: 41,
      specialty: "CNS Therapies",
    },
    avatarShareURL:
      "/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJLYXR5YV9Qcm9mZXNzaW9uYWxMb29rMl9w%0D%0AdWJsaWMiLCJwcmV2aWV3SW1nIjoiaHR0cHM6Ly9maWxlczIuaGV5Z2VuLmFpL2F2YXRhci92My9k%0D%0ANTJmZmExYjQ0N2Q0ZjJmOGViMTY5MTdlN2VjMjIyYV81NTg3MC9wcmV2aWV3X3RhbGtfMS53ZWJw%0D%0AIiwibmVlZFJlbW92ZUJhY2tncm91bmQiOnRydWUsImtub3dsZWRnZUJhc2VJZCI6IjBhODczMGU3%0D%0ANTAyOTRkNDY5Yzc1YWQ0N2E0Yzc0MmMxIiwidXNlcm5hbWUiOiJlNTdiMjE1MTAyOWM0YzczOTVh%0D%0ANDU0MzYzNDI5ODlhZSJ9&inIFrame=1",
    skillsLabel: "Responsibilities",
    skills: [
      "Explain Product Mechanism of Action (MOA)",
      "Communicate Clinical Benefits & Trial Outcomes",
      "Present Safety, Warnings & Dosing Guidance",
      "Simplify Complex Scientific Product Data",
      "Support On-Label, Compliant Product Education",
    ],
    scenarios: [
      "MOA Breakdown",
      "Clinical Benefits Presentation",
      "Safety & Dosing Review",
      "Data & Visual Summary Interpretation",
    ],
  },
]

const trainingHistory = [
  {
    id: 1,
    name: "HCP Clinical Discussion",
    persona: "HCP Persona",
    date: "2024-01-15",
    duration: "45 mins",
    score: 92,
  },
  {
    id: 2,
    name: "Product Launch Strategy",
    persona: "Brand Persona",
    date: "2024-01-12",
    duration: "38 mins",
    score: 88,
  },
  {
    id: 3,
    name: "Account Review Session",
    persona: "KAM Persona",
    date: "2024-01-10",
    duration: "52 mins",
    score: 95,
  },
]

export default function PersonaAvatarsPage() {
  const router = useRouter()
  const [currentView, setCurrentView] = useState<"dashboard" | "avatars">("dashboard")
  const [isPersonaMenuOpen, setIsPersonaMenuOpen] = useState(true)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)
  const [activeSession, setActiveSession] = useState<string | null>(null)
  const [sessionDuration, setSessionDuration] = useState(0)
  const [isSessionStarted, setIsSessionStarted] = useState(false)
  const [notes, setNotes] = useState("")
  const [isMicOn, setIsMicOn] = useState(true)
  const [sessionLogs, setSessionLogs] = useState<SessionLog[]>([])
  const [showDisclaimer, setShowDisclaimer] = useState(false)
  const [disclaimerProgress, setDisclaimerProgress] = useState(0)
  const [showCoachingTypeModal, setShowCoachingTypeModal] = useState(false)
  const [selectedCoachingType, setSelectedCoachingType] = useState<"audio" | "visual" | null>(null)

  useEffect(() => {
    const savedLogs = localStorage.getItem("sessionLogs")
    if (savedLogs) {
      const parsedLogs = JSON.parse(savedLogs)
      setSessionLogs(
        parsedLogs.map((log: any) => ({
          ...log,
          timestamp: new Date(log.timestamp),
        })),
      )
    }
  }, [])

  useEffect(() => {
    if (showDisclaimer) {
      setDisclaimerProgress(0)
      const interval = setInterval(() => {
        setDisclaimerProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setShowDisclaimer(false)
            return 100
          }
          return prev + 100 / 80 // 8 seconds = 80 intervals of 100ms
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [showDisclaimer])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (activeSession && isSessionStarted) {
      interval = setInterval(() => {
        setSessionDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeSession, isSessionStarted])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startSession = (personaId: string) => {
    setActiveSession(personaId)
    setSessionDuration(0)
    setNotes("")
    setIsSessionStarted(false)
    setShowCoachingTypeModal(true) // Show modal directly instead of disclaimer
  }

  const handleStartSessionTimer = () => {
    setIsSessionStarted(true)
  }

  const handleCoachingTypeSelect = (type: "audio" | "visual") => {
    setSelectedCoachingType(type)
    setShowCoachingTypeModal(false)
    if (type === "audio") {
      setShowDisclaimer(true) // Show disclaimer only for audio
    } else {
      setIsSessionStarted(true) // Start visual session directly
    }
    console.log(`[v0] Starting ${type} coaching session for persona:`, activeSession)
  }

  const endSession = () => {
    if (activeSession && activePersona && notes.trim()) {
      const newLog: SessionLog = {
        id: Date.now().toString(),
        personaTitle: activePersona.title,
        duration: sessionDuration,
        notes: notes,
        timestamp: new Date(),
      }
      const updatedLogs = [newLog, ...sessionLogs]
      setSessionLogs(updatedLogs)
      localStorage.setItem("sessionLogs", JSON.stringify(updatedLogs))
    }
    setActiveSession(null)
    setSessionDuration(0)
    setNotes("")
    setIsMicOn(true)
    setIsSessionStarted(false)
    setShowCoachingTypeModal(false)
    setSelectedCoachingType(null)
  }

  const activePersona = personaAvatars.find((p) => p.id === activeSession)

  if (activeSession && selectedCoachingType === "visual" && isSessionStarted) {
    return (
      <PersonaVisualCoachingSession
        personaTitle={activePersona!.title}
        personaImage={activePersona!.image}
        avatarShareURL={activePersona!.avatarShareURL}
        onBack={() => {
          setActiveSession(null)
          setSelectedCoachingType(null)
          setIsSessionStarted(false)
        }}
        onEndSession={() => {
          endSession()
        }}
      />
    )
  }

  if (activeSession && selectedCoachingType === "audio") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="w-full max-w-7xl h-[85vh] bg-gradient-to-br from-card via-card/95 to-card/90 rounded-2xl shadow-2xl border border-primary/20 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/50 bg-card/80 backdrop-blur-sm px-6 py-3">
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full bg-green-500 animate-pulse`} />
              <h3 className="text-lg font-bold">{activePersona?.title} Session</h3>
            </div>
            <Button size="sm" variant="ghost" onClick={endSession}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex gap-4 p-4 overflow-hidden">
            {/* Left: Avatar Section */}
            <div className="flex-[2] flex flex-col gap-3">
              <div className="relative flex-1 rounded-xl overflow-hidden border border-primary/20 bg-black/20">
                <HeygenStreamingEmbed shareURL={activePersona?.avatarShareURL} />

                {showDisclaimer && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm z-10">
                    <div className="max-w-xl mx-auto px-6 py-4 bg-card/95 rounded-xl border border-primary/30 shadow-2xl">
                      <div className="text-center space-y-3">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mb-1">
                          <MessageSquare className="h-5 w-5 text-primary" />
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Hello! I am an AI-generated virtual assistant designed to provide general informational
                          support. The insights I share are not medical advice, are not a substitute for professional
                          clinical judgment, and should not be used to diagnose, treat, or recommend therapy for any
                          patient.
                        </p>
                        {/* Progress bar */}
                        <div className="mt-3">
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-100"
                              style={{ width: `${disclaimerProgress}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            {Math.ceil(((100 - disclaimerProgress) / 100) * 8)}s remaining
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Session Control Section */}
            <div className="flex-1 flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-foreground">Session Control</h4>

              {/* Duration Display */}
              <Card className="border-primary/20 bg-card/50 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs font-medium">Session Duration</span>
                    </div>
                    <div className="text-3xl font-bold text-foreground">{formatDuration(sessionDuration)}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Session Control Buttons */}
              <div className="space-y-2 mt-auto">
                <Button
                  onClick={handleStartSessionTimer}
                  disabled={isSessionStarted}
                  className={`w-full gap-2 bg-gradient-to-r ${activePersona?.color} text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Play className="h-4 w-4" />
                  {isSessionStarted ? "Session In Progress" : "Start New Session"}
                </Button>

                <Button onClick={endSession} variant="destructive" className="w-full gap-2">
                  <StopCircle className="h-4 w-4" />
                  End Current Session
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <aside
        className={`border-r border-border bg-card/50 backdrop-blur-sm p-4 transition-all duration-300 ${
          isSidebarExpanded ? "w-64" : "w-16"
        }`}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
      >
        <div className="mb-6">
          <Button
            variant="ghost"
            className={`mb-4 gap-2 w-full ${isSidebarExpanded ? "justify-start" : "justify-center px-0"}`}
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            {isSidebarExpanded && <span>Back to Home</span>}
          </Button>
          {isSidebarExpanded && <h2 className="text-xl font-bold">Persona Dashboard</h2>}
        </div>

        <nav className="space-y-2">
          <Button
            variant={currentView === "dashboard" ? "default" : "ghost"}
            className={`w-full gap-2 ${isSidebarExpanded ? "justify-start" : "justify-center px-0"}`}
            onClick={() => setCurrentView("dashboard")}
          >
            <LayoutDashboard className="h-4 w-4" />
            {isSidebarExpanded && <span>Dashboard</span>}
          </Button>

          <div>
            <Button
              variant="ghost"
              className={`w-full ${isSidebarExpanded ? "justify-between" : "justify-center px-0"}`}
              onClick={() => setIsPersonaMenuOpen(!isPersonaMenuOpen)}
            >
              {isSidebarExpanded ? (
                <>
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Persona Avatars
                  </span>
                  {isPersonaMenuOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </>
              ) : (
                <Users className="h-4 w-4" />
              )}
            </Button>

            {isPersonaMenuOpen && isSidebarExpanded && (
              <div className="ml-4 mt-2 space-y-1">
                {personaAvatars.map((persona) => (
                  <Button
                    key={persona.id}
                    variant="ghost"
                    className="w-full justify-start gap-2 text-sm"
                    onClick={() => setCurrentView("avatars")}
                  >
                    <persona.icon className="h-3 w-3" />
                    {persona.title}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        {currentView === "dashboard" ? (
          <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="mb-2 text-4xl font-bold text-foreground">Dashboard</h1>
              <p className="text-lg text-muted-foreground">Track your training progress and session history</p>
            </div>

            {/* Stats Overview */}
            <div className="mb-8 grid gap-4 md:grid-cols-2">
              <Card className="border-primary/20 bg-gradient-to-br from-card to-card/50 backdrop-blur">
                <CardHeader className="pb-3">
                  <CardDescription>Total Sessions</CardDescription>
                  <CardTitle className="text-3xl">148</CardTitle>
                </CardHeader>
              </Card>
              <Card className="border-primary/20 bg-gradient-to-br from-card to-card/50 backdrop-blur">
                <CardHeader className="pb-3">
                  <CardDescription>Total Hours</CardDescription>
                  <CardTitle className="text-3xl">37</CardTitle>
                </CardHeader>
              </Card>
            </div>

            {/* Training Attended */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Training Attended</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {trainingHistory.map((training) => (
                  <Card
                    key={training.id}
                    className="border-primary/20 bg-card/50 backdrop-blur hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{training.name}</CardTitle>
                          <CardDescription className="text-xs">{training.persona}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {training.duration}
                        </span>
                        <span>{training.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Session Logs */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Session Logs</h2>
              <div className="space-y-4">
                {sessionLogs.length === 0 ? (
                  <Card className="border-primary/20 bg-card/50 backdrop-blur">
                    <CardContent className="py-8 text-center text-muted-foreground">
                      No session logs yet. Start a training session to create logs.
                    </CardContent>
                  </Card>
                ) : (
                  sessionLogs.map((log) => (
                    <Card key={log.id} className="border-primary/20 bg-card/50 backdrop-blur">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base">{log.personaTitle}</CardTitle>
                            <CardDescription className="text-xs">
                              {log.timestamp.toLocaleDateString()} at {log.timestamp.toLocaleTimeString()}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {formatDuration(log.duration)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground">
                          <div className="font-semibold mb-1">Session Notes:</div>
                          <p className="whitespace-pre-wrap">{log.notes}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="mb-2 text-4xl font-bold text-foreground">Persona Avatars</h1>
              <p className="text-lg text-muted-foreground">
                Experience AI-assisted coaching crafted for various real-world pharmaceutical interactions.
              </p>
            </div>

            <div className="space-y-4">
              {personaAvatars.map((persona) => (
                <Card
                  key={persona.id}
                  className="overflow-hidden border-primary/20 bg-card/50 backdrop-blur transition-all hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Left Section - Avatar with Gradient Background */}
                    <div
                      className={`flex flex-col items-center justify-center gap-3 p-6 bg-gradient-to-br ${persona.color} min-w-[240px]`}
                    >
                      <img
                        src={persona.image || "/placeholder.svg"}
                        alt={persona.title}
                        className="h-28 w-28 rounded-full border-4 border-white/30 object-cover shadow-xl"
                      />
                      <div className="text-white text-center">
                        <h2 className="text-xl font-bold flex items-center justify-center gap-2 mb-1.5">
                          <persona.icon className="h-5 w-5" />
                          {persona.title}
                        </h2>
                        <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur border-0 text-xs">
                          {persona.subtitle}
                        </Badge>
                      </div>
                    </div>

                    {/* Middle Section - Description and Details */}
                    <div className="flex-1 p-5">
                      <p className="mb-4 text-xs text-muted-foreground leading-relaxed">{persona.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Responsibilities */}
                        <div>
                          <h3 className="mb-2 text-[10px] font-bold uppercase tracking-wide text-foreground">
                            {persona.skillsLabel}
                          </h3>
                          <div className="space-y-1.5">
                            {persona.skills.map((skill) => (
                              <div key={skill} className="flex items-start gap-2 text-xs">
                                <span className={`mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0`} />
                                <span>{skill}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Practice Scenarios */}
                        <div>
                          <h3 className="mb-2 text-[10px] font-bold uppercase tracking-wide text-foreground">
                            Practice Scenarios
                          </h3>
                          <div className="space-y-1.5">
                            {persona.scenarios.map((scenario) => (
                              <div key={scenario} className="flex items-start gap-2 text-xs">
                                <MessageSquare className="mt-0.5 h-3 w-3 text-primary flex-shrink-0" />
                                <span>{scenario}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Stats and Action */}
                    <div className="flex flex-col items-center justify-between gap-4 p-5 bg-muted/30 border-l min-w-[180px]">
                      <div className="space-y-3 text-center w-full">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Sessions</p>
                          <p className="text-3xl font-bold">{persona.stats.sessions}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Specialty</p>
                          <p className="text-sm font-semibold">{persona.stats.specialty}</p>
                        </div>
                      </div>

                      <Button
                        onClick={() => startSession(persona.id)}
                        className={`w-full gap-2 bg-gradient-to-r ${persona.color} text-white hover:opacity-90 text-sm py-5`}
                      >
                        <Play className="h-4 w-4" />
                        Start Session
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      {showCoachingTypeModal && activeSession && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-3xl w-full border-primary/30 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold">Choose Your Coaching Type</CardTitle>
              <CardDescription className="text-base mt-2">
                Select how you&apos;d like to practice with {activePersona?.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4 p-6">
              {/* Audio Coaching Card */}
              <Card
                className="cursor-pointer border-2 hover:border-primary hover:shadow-lg transition-all group"
                onClick={() => handleCoachingTypeSelect("audio")}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Audio Coaching</h3>
                    <p className="text-sm text-muted-foreground">
                      Practice your conversation skills with voice-only interaction. Focus on your message delivery and
                      communication flow.
                    </p>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    Start Audio Session
                  </Button>
                </CardContent>
              </Card>

              {/* Visual Coaching Card */}
              <Card
                className="cursor-pointer border-2 hover:border-primary hover:shadow-lg transition-all group"
                onClick={() => handleCoachingTypeSelect("visual")}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Video className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Visual Coaching</h3>
                    <p className="text-sm text-muted-foreground">
                      Enhance your presence with video feedback. Practice body language, facial expressions, and
                      professional demeanor.
                    </p>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    Start Visual Session
                  </Button>
                </CardContent>
              </Card>
            </CardContent>
            <div className="px-6 pb-6">
              <Button variant="ghost" className="w-full" onClick={() => setShowCoachingTypeModal(false)}>
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
