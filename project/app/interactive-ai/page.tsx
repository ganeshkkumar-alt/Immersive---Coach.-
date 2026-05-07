"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Video, VideoOff, Volume2, VolumeX, MessageSquare, RotateCw, User } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function MetaCoachAIPage() {
  const router = useRouter()
  const [isMicOn, setIsMicOn] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(false)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)

  useEffect(() => {
    if (isVideoOn) {
      startWebcam()
    } else {
      stopWebcam()
    }

    return () => {
      stopWebcam()
    }
  }, [isVideoOn])

  const startWebcam = async () => {
    try {
      setCameraError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error("Error accessing webcam:", error)
      setCameraError("Unable to access camera. Please check permissions.")
      setIsVideoOn(false)
    }
  }

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  return (
    <div className="min-h-screen ml-16">
      <div className="flex items-center justify-end px-8 py-4">
        <Button
          onClick={() => router.push("/ai-coach?view=user")}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <User className="w-4 h-4" />
          User Dashboard
        </Button>
      </div>
      <main className="flex-1">
        <div className="container mx-auto p-8 pt-0">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-balance">MetaCoach AI</h1>
            <p className="text-lg text-muted-foreground">
              Practice your sales pitch with AI-powered real-time coaching
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                    <div>
                      <CardTitle className="text-lg">AI Coach Avatar</CardTitle>
                      <CardDescription className="text-sm">Dr. Emily Carter</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="relative aspect-video w-full bg-slate-950">
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <img
                          src="/professional-female-ai-coach-avatar.jpg"
                          alt="Dr. Emily Carter - AI Coach"
                          className="absolute inset-0 h-full w-full object-cover opacity-40"
                        />
                        <div className="relative z-10 text-center">
                          <div className="text-white/90 mb-4">
                            <h3 className="text-xl font-semibold mb-2">AI Coach Ready</h3>
                            <p className="text-sm text-white/70">Interactive avatar coaching placeholder</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-500/5">
                    <div>
                      <CardTitle className="text-lg">Your Webcam</CardTitle>
                      <CardDescription className="text-sm">Body language monitor</CardDescription>
                    </div>
                    {isVideoOn && (
                      <Badge variant="default" className="bg-blue-500 absolute right-4 top-4">
                        Active
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                      {isVideoOn ? (
                        <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <div className="text-center text-white/70">
                            <VideoOff className="mx-auto mb-3 h-12 w-12" />
                            <p className="text-base font-medium">Camera is off</p>
                            <p className="mt-1 text-xs text-white/50">Turn on to begin</p>
                          </div>
                        </div>
                      )}
                      {cameraError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90">
                          <div className="text-center text-red-400 p-4">
                            <p className="text-sm font-medium">{cameraError}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="flex items-center justify-center gap-3 p-4">
                  <Button
                    variant={isMicOn ? "default" : "outline"}
                    size="icon"
                    className="h-12 w-12 rounded-full"
                    onClick={() => setIsMicOn(!isMicOn)}
                  >
                    {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                  </Button>
                  <Button
                    variant={isVideoOn ? "default" : "outline"}
                    size="icon"
                    className="h-12 w-12 rounded-full"
                    onClick={() => setIsVideoOn(!isVideoOn)}
                  >
                    {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                  </Button>
                  <Button
                    variant={isAudioOn ? "default" : "outline"}
                    size="icon"
                    className="h-12 w-12 rounded-full"
                    onClick={() => setIsAudioOn(!isAudioOn)}
                  >
                    {isAudioOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Real-Time Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950">
                      <p className="text-sm font-medium text-green-900 dark:text-green-100">Great opening!</p>
                      <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                        You established credibility by mentioning the clinical trial results.
                      </p>
                    </div>
                    <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-950">
                      <p className="text-sm font-medium text-amber-900 dark:text-amber-100">Consider improving:</p>
                      <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                        Slow down when discussing dosage information. Maintain eye contact.
                      </p>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Body Language:</p>
                      <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                        Good posture detected. Try to gesture more naturally when emphasizing key points.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Coaching Scenarios</CardTitle>
                  <CardDescription>Select a practice scenario</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <div className="text-left">
                      <div className="font-medium">New Product Launch</div>
                      <div className="text-xs text-muted-foreground">Present a new cardiovascular drug</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <div className="text-left">
                      <div className="font-medium">Handling Objections</div>
                      <div className="text-xs text-muted-foreground">Overcome pricing concerns</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <div className="text-left">
                      <div className="font-medium">Clinical Data Review</div>
                      <div className="text-xs text-muted-foreground">Explain trial results effectively</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <div className="text-left">
                      <div className="font-medium">Compliance Check</div>
                      <div className="text-xs text-muted-foreground">FDA-compliant messaging</div>
                    </div>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Session Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Sessions Today</span>
                    <span className="text-lg font-semibold">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Score</span>
                    <span className="text-lg font-semibold">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Time</span>
                    <span className="text-lg font-semibold">2.5 hrs</span>
                  </div>
                  <Button variant="outline" className="mt-4 w-full gap-2 bg-transparent">
                    <RotateCw className="h-4 w-4" />
                    View History
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Improvements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <Badge variant="secondary" className="mt-0.5 shrink-0">
                        +15%
                      </Badge>
                      <span className="text-muted-foreground">Confidence in product knowledge</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="secondary" className="mt-0.5 shrink-0">
                        +22%
                      </Badge>
                      <span className="text-muted-foreground">Objection handling skills</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="secondary" className="mt-0.5 shrink-0">
                        +18%
                      </Badge>
                      <span className="text-muted-foreground">Communication clarity</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
