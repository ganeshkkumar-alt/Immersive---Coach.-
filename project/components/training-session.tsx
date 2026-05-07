"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Clock, FileText, MessageSquare, Mic, MicOff } from "lucide-react"
import type { Training } from "@/app/page"
import { TrainingFeedback } from "./training-feedback"
import { UserFeedbackModal } from "./user-feedback-modal"
import HeygenAvatar from "./heygen-avatar"

interface TranscriptEntry {
  id: number
  speaker: "user" | "ai"
  text: string
  timestamp: string
}

interface TrainingSessionProps {
  training: Training
  onClose: () => void
}

export function TrainingSession({ training, onClose }: TrainingSessionProps) {
  const [sessionTime, setSessionTime] = useState(0)
  const [notes, setNotes] = useState("")
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [disclaimerProgress, setDisclaimerProgress] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showUserFeedback, setShowUserFeedback] = useState(false)
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([])
  const [isListening, setIsListening] = useState(false)
  const [micSupported, setMicSupported] = useState(true)
  const [sessionStarted, setSessionStarted] = useState(false)
  const [webhookResponseData, setWebhookResponseData] = useState<unknown>(null)
  const [isSendingTranscript, setIsSendingTranscript] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const transcriptEndRef = useRef<HTMLDivElement>(null)
  const entryIdRef = useRef(0)
  const isListeningRef = useRef(false)
  const sessionTimeRef = useRef(0)

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
          return prev + 100 / 60 // 6 seconds = 60 intervals at 100ms each
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [showDisclaimer])

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime((prev) => {
        sessionTimeRef.current = prev + 1
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  const addTranscriptEntry = useCallback(
    (speaker: "user" | "ai", text: string) => {
      if (!text.trim()) return
      entryIdRef.current += 1
      const t = sessionTimeRef.current
      const mins = Math.floor(t / 60)
      const secs = t % 60
      const ts = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
      setTranscript((prev) => [
        ...prev,
        {
          id: entryIdRef.current,
          speaker,
          text: text.trim(),
          timestamp: ts,
        },
      ])
    },
    [],
  )

  // Handle AI transcript from HeyGen avatar
  const handleAITranscript = useCallback(
    (entry: { speaker: "ai"; text: string }) => {
      addTranscriptEntry("ai", entry.text)
    },
    [addTranscriptEntry],
  )

  // Auto-scroll transcript to bottom
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [transcript])

  // Initialize Web Speech API once on mount
  useEffect(() => {
    const SpeechRecognitionAPI =
      typeof window !== "undefined"
        ? window.SpeechRecognition || (window as unknown as { webkitSpeechRecognition: typeof window.SpeechRecognition }).webkitSpeechRecognition
        : null

    if (!SpeechRecognitionAPI) {
      setMicSupported(false)
      return
    }

    const recognition = new SpeechRecognitionAPI()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"
    recognition.maxAlternatives = 1

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          const userText = event.results[i][0].transcript
          if (userText.trim()) {
            entryIdRef.current += 1
            const t = sessionTimeRef.current
            const mins = Math.floor(t / 60)
            const secs = t % 60
            const ts = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
            setTranscript((prev) => [
              ...prev,
              { id: entryIdRef.current, speaker: "user", text: userText.trim(), timestamp: ts },
            ])
          }
        }
      }
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === "not-allowed") {
        setMicSupported(false)
        setIsListening(false)
        isListeningRef.current = false
      }
    }

    recognition.onend = () => {
      // Auto-restart if still supposed to be listening
      if (isListeningRef.current) {
        try {
          setTimeout(() => {
            if (isListeningRef.current && recognitionRef.current) {
              recognitionRef.current.start()
            }
          }, 200)
        } catch {
          // Ignore
        }
      }
    }

    recognitionRef.current = recognition

    return () => {
      isListeningRef.current = false
      recognition.abort()
      recognitionRef.current = null
    }
  }, [])

  // Start/stop speech recognition
  const startListening = useCallback(() => {
    if (!recognitionRef.current || !micSupported) return
    try {
      recognitionRef.current.start()
      isListeningRef.current = true
      setIsListening(true)
    } catch {
      // May already be running
    }
  }, [micSupported])

  const stopListening = useCallback(() => {
    isListeningRef.current = false
    setIsListening(false)
    try {
      recognitionRef.current?.abort()
    } catch {
      // Ignore
    }
  }, [])

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const handleStartSession = () => {
    setSessionStarted(true)
    // Small delay to let the HeyGen iframe acquire mic first
    setTimeout(() => {
      startListening()
    }, 1000)
  }

  const sendTranscriptToWebhook = async (transcriptData: TranscriptEntry[]) => {
    const WEBHOOK_URL =
      "https://indegene-sbx.app.n8n.cloud/webhook/4caf813d-c5d9-4f06-a7c6-33c2f23bc7ac"

    try {
      setIsSendingTranscript(true)
      const formattedTranscript = transcriptData.map((entry) => ({
        speaker: entry.speaker === "user" ? "User" : "AI Coach",
        text: entry.text,
        timestamp: entry.timestamp,
      }))

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          training: training.title,
          sessionDuration: formatTime(sessionTime),
          transcript: formattedTranscript,
        }),
      })

      if (!response.ok) {
        throw new Error(`Webhook returned status ${response.status}`)
      }

      const responseData = await response.json()
      setWebhookResponseData(responseData)
    } catch (error) {
      console.error("[v0] Webhook error:", error)
      setWebhookResponseData({ error: error instanceof Error ? error.message : "Failed to get feedback" })
    } finally {
      setIsSendingTranscript(false)
    }
  }

  const handleEndSession = () => {
    stopListening()
    // Send transcript to webhook
    sendTranscriptToWebhook(transcript)
    setShowUserFeedback(true)
  }

  const handleUserFeedbackClose = () => {
    setShowUserFeedback(false)
  }

  const handleUserFeedbackSubmit = (feedback: { type: "positive" | "negative"; message: string }) => {
    const hasEpisodes = training.episodes && training.episodes.length > 0
    const hasFeedbackPoints =
      hasEpisodes &&
      training.episodes.some(
        (ep) =>
          ep.slides &&
          ep.slides.length > 0 &&
          ep.slides.some((slide) => slide.feedbackPoints && slide.feedbackPoints.length > 0),
      )

    if (hasFeedbackPoints) {
      setShowFeedback(true)
    } else {
      onClose()
    }
  }

  if (showFeedback) {
    return (
      <TrainingFeedback
        training={training}
        sessionDuration={formatTime(sessionTime)}
        sessionNotes={notes}
        onClose={onClose}
        webhookResponseData={webhookResponseData}
        isLoadingWebhook={isSendingTranscript}
      />
    )
  }

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-[rgb(59,130,246)] to-[rgb(37,99,235)] text-white px-6 py-4">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">{training.title} - Training Session</h1>
              <p className="text-sm text-white/80">Healthcare Professional</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto p-6">
        <div className="flex gap-4 h-[calc(100vh-140px)]">
          {/* Left: Avatar Section (2/3 width) */}
          <div className="flex-[2] flex flex-col gap-3">
            <div className="flex-1 bg-black rounded-lg relative overflow-hidden">
              {!showDisclaimer && (
                <HeygenAvatar avatarShareURL={training.avatarShareURL} onTranscript={handleAITranscript} />
              )}

              {showDisclaimer && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
                  <div className="bg-background rounded-lg shadow-2xl p-6 max-w-xl mx-4">
                    <div className="text-center space-y-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mb-1">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-base font-bold text-foreground">Disclaimer</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Hello! I'm an AI-generated avatar. My responses are for informational purposes only and
                        shouldn't be taken as professional or medical advice.
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
                          {Math.ceil(((100 - disclaimerProgress) / 100) * 6)}s remaining
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Notes and Duration Section (1/3 width) */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Session Duration */}
            <Card className="border border-border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <Clock className="w-3 h-3" />
                  <span>Session Duration</span>
                </div>
                <div className="text-2xl font-bold tabular-nums">{formatTime(sessionTime)}</div>
              </CardContent>
            </Card>

            {/* Transcript */}
            <Card className="flex-1 border border-border shadow-sm flex flex-col min-h-0">
              <CardContent className="p-4 flex flex-col h-full min-h-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MessageSquare className="w-3 h-3" />
                    <span className="font-semibold">Live Transcript</span>
                    {isListening && (
                      <span className="flex items-center gap-1 text-emerald-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Listening
                      </span>
                    )}
                  </div>
                  <button
                    onClick={toggleListening}
                    className={`p-1.5 rounded-full transition-colors ${
                      isListening
                        ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                    title={isListening ? "Stop listening" : "Start listening"}
                  >
                    {isListening ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-2 min-h-0 scrollbar-thin">
                  {transcript.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <MessageSquare className="w-8 h-8 text-muted-foreground/30 mb-2" />
                      <p className="text-xs text-muted-foreground font-medium">
                        Conversation transcript will appear here...
                      </p>
                      {!micSupported ? (
                        <p className="text-xs text-red-500 mt-1">
                          Microphone access denied or not supported. Please allow mic access and use Chrome/Edge.
                        </p>
                      ) : isListening ? (
                        <p className="text-xs text-emerald-500 mt-1">
                          Microphone is active. Start speaking...
                        </p>
                      ) : !sessionStarted ? (
                        <p className="text-xs text-muted-foreground/60 mt-1">
                          Click "Start Session" to begin transcript capture
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground/60 mt-1">
                          Click the mic button to start capturing
                        </p>
                      )}
                    </div>
                  ) : (
                    transcript.map((entry) => (
                      <div
                        key={entry.id}
                        className={`flex gap-2 ${entry.speaker === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-lg px-3 py-2 ${
                            entry.speaker === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-[10px] font-bold uppercase tracking-wide opacity-70">
                              {entry.speaker === "user" ? "You" : "AI Coach"}
                            </span>
                            <span className="text-[10px] opacity-50">{entry.timestamp}</span>
                          </div>
                          <p className="text-xs leading-relaxed">{entry.text}</p>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={transcriptEndRef} />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-2">
              {!sessionStarted ? (
                <Button
                  onClick={handleStartSession}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  size="sm"
                  disabled={showDisclaimer}
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Start Session
                </Button>
              ) : (
                <Button onClick={handleEndSession} variant="destructive" className="w-full" size="sm">
                  <X className="w-4 h-4 mr-2" />
                  End Session
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {showUserFeedback && <UserFeedbackModal onClose={handleUserFeedbackClose} onSubmit={handleUserFeedbackSubmit} />}
    </div>
  )
}
