"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Camera, CameraOff, Video, VideoOff, Pencil } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { Training } from "@/app/ai-coach/page"
import { VisualCoachingFeedback } from "./visual-coaching-feedback"

interface VisualTrainingSessionProps {
  training: Training
  onBack: () => void
}

export function VisualTrainingSession({ training, onBack }: VisualTrainingSessionProps) {
  const [isCameraEnabled, setIsCameraEnabled] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [sessionStarted, setSessionStarted] = useState(true)
  const [sessionTime, setSessionTime] = useState(0)
  const [sessionName, setSessionName] = useState(training.title)
  const [isEditingName, setIsEditingName] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Timer for session
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (sessionStarted) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [sessionStarted])

  // Format time as HH:MM:SS
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    enableCamera()
    return () => {
      // Cleanup on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    if (videoRef.current && streamRef.current && isCameraEnabled) {
      videoRef.current.srcObject = streamRef.current
      videoRef.current.play().catch((playError) => {
        console.error("[v0] Error playing video:", playError)
      })
    }
  }, [isCameraEnabled, streamRef.current])

  const enableCamera = async () => {
    // If stream already exists, just enable it
    if (streamRef.current) {
      if (videoRef.current) {
        videoRef.current.srcObject = streamRef.current
        videoRef.current.play().catch((playError) => {
          console.error("[v0] Video play error:", playError)
        })
      }
      setIsCameraEnabled(true)
      return
    }

    // Otherwise request new stream
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: true,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play().catch((playError) => {
          console.error("[v0] Video play error:", playError)
        })
      }
      setIsCameraEnabled(true)
      setCameraError(null)
    } catch (error) {
      console.error("[v0] Camera access error:", error)
      setCameraError("Failed to access camera/microphone. Please check permissions.")
      setIsCameraEnabled(false)
    }
  }

  const disableCamera = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setIsCameraEnabled(false)
  }

  const handleEndSession = () => {
    setSessionStarted(false)
    setShowFeedback(true)
  }

  if (showFeedback) {
    return <VisualCoachingFeedback onBack={() => setShowFeedback(false)} />
  }

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Role-Play
        </Button>
        <h1 className="text-2xl font-bold">Coaching Session</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left: Video Panels - now takes 3 columns instead of 2 */}
        <div className="lg:col-span-3 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {/* Coach Video */}
            <Card className="border border-red-300 dark:border-red-800 bg-red-950/20">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Camera className="w-3 h-3 text-red-500" />
                    <span className="font-semibold text-xs">Coach</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] text-red-500">Disconnected</span>
                  </div>
                </div>
                <div className="aspect-video bg-red-900/30 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <p className="text-xs text-red-300 mb-2">
                      Failed to initialize avatar. API request failed with status 401
                    </p>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" className="text-xs h-7 px-2">
                        Retry Connection
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                        Dismiss
                      </Button>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2">
                      Avatar will not auto-reconnect to prevent loops
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Participant Video */}
            <Card className="border border-border">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CameraOff className="w-3 h-3" />
                    <span className="font-semibold text-xs">Participant</span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={isCameraEnabled ? disableCamera : enableCamera}
                      className={`h-7 w-7 p-0 ${isCameraEnabled ? "bg-green-500/10 border-green-500" : ""}`}
                    >
                      {isCameraEnabled ? <Video className="w-3 h-3" /> : <VideoOff className="w-3 h-3" />}
                    </Button>
                  </div>
                </div>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover scale-x-[-1] ${isCameraEnabled ? "block" : "hidden"}`}
                  />
                  {!isCameraEnabled && (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <CameraOff className="w-8 h-8 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Camera not available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Camera Access Error */}
          {cameraError && (
            <Card className="border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                    <CameraOff className="w-3 h-3 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-xs text-red-900 dark:text-red-100 mb-1">Camera Access Error</h4>
                    <p className="text-xs text-red-700 dark:text-red-300 mb-2">{cameraError}</p>
                    <Button size="sm" variant="destructive" onClick={enableCamera} className="h-7 text-xs">
                      Retry
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Do's and Don'ts */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
              <CardContent className="p-3">
                <h3 className="font-semibold text-xs text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-xs">👍</div>
                  Do&apos;s
                </h3>
                <ul className="space-y-1 text-xs text-blue-800 dark:text-blue-200">
                  <li className="flex gap-1">
                    <span>•</span>
                    <span>Sit upright with a professional posture — it helps convey confidence.</span>
                  </li>
                  <li className="flex gap-1">
                    <span>•</span>
                    <span>Maintain eye contact with the camera to build rapport.</span>
                  </li>
                  <li className="flex gap-1">
                    <span>•</span>
                    <span>Speak clearly and at a moderate pace.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
              <CardContent className="p-3">
                <h3 className="font-semibold text-xs text-red-900 dark:text-red-100 mb-2 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-xs">👎</div>
                  Don&apos;ts
                </h3>
                <ul className="space-y-1 text-xs text-red-800 dark:text-red-200">
                  <li className="flex gap-1">
                    <span>•</span>
                    <span>Don&apos;t slouch, recline, or lean too close to the screen.</span>
                  </li>
                  <li className="flex gap-1">
                    <span>•</span>
                    <span>Avoid looking away or multitasking during the session.</span>
                  </li>
                  <li className="flex gap-1">
                    <span>•</span>
                    <span>Don&apos;t speak too fast or interrupt the coach.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-3">
          {/* Session Details Card */}
          <Card className="border border-blue-500 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <CardContent className="p-3">
              <h2 className="text-sm font-bold mb-2">Session Details</h2>
              <div className="bg-white rounded-lg p-2 text-foreground">
                <div className="mb-2">
                  <label className="text-xs font-semibold mb-1 block">Session Name</label>
                  {isEditingName ? (
                    <div className="flex gap-1">
                      <Input
                        value={sessionName}
                        onChange={(e) => setSessionName(e.target.value)}
                        className="text-xs h-7"
                      />
                      <Button size="sm" onClick={() => setIsEditingName(false)} className="h-7 px-2 text-xs">
                        Save
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-xs line-clamp-2">{sessionName}</p>
                      <Button size="sm" variant="ghost" onClick={() => setIsEditingName(true)} className="h-6 w-6 p-0">
                        <Pencil className="w-2.5 h-2.5" />
                      </Button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1 block">Date</label>
                  <p className="text-xs">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Timer Card */}
          <Card className="border border-blue-500 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <CardContent className="p-3">
              <h2 className="text-sm font-bold mb-2">Session Timer</h2>
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-foreground font-mono mb-1">{formatTime(sessionTime)}</div>
                <div className="flex justify-center gap-2 text-[10px] text-muted-foreground">
                  <span>Hours</span>
                  <span>Minutes</span>
                  <span>Seconds</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* End Session Button */}
          <Button
            onClick={handleEndSession}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 text-sm"
          >
            End Session
          </Button>
        </div>
      </div>
    </div>
  )
}
