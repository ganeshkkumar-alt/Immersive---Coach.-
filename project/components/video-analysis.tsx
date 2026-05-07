"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Upload,
  Video,
  CheckCircle,
  AlertCircle,
  MessageSquare,
} from "lucide-react"
import { FeedbackButtons } from "@/components/feedback-buttons"

interface VideoAnalysisProps {
  onBack: () => void
}

export function VideoAnalysis({ onBack }: VideoAnalysisProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [webhookResponse, setWebhookResponse] = useState("")
  const [webhookError, setWebhookError] = useState("")

  interface ReviewSection {
    section_number: number
    section_title: string
    evidence: string
    strengths: string
    gaps: string
    coaching_suggestions: string
    score: number
  }

  interface StructuredResponse {
    review_framework: ReviewSection[]
  }

  const [structuredData, setStructuredData] = useState<StructuredResponse | null>(null)

  const sendToWebhook = async (file: File) => {
    const WEBHOOK_URL = "https://indegene-sbx.app.n8n.cloud/webhook/b07b5980-c322-4ee5-b322-e84a081e31f4"

    try {
      setWebhookError("")
      setWebhookResponse("")

      const formData = new FormData()
      formData.append("file", file)
      formData.append("filename", file.name)
      formData.append("fileType", file.type)
      formData.append("fileSize", String(file.size))

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Webhook returned status ${response.status}`)
      }

      const responseData = await response.json()

      // Try to parse as structured review_framework format
      let parsed: StructuredResponse | null = null
      if (Array.isArray(responseData)) {
        // Response is an array, check first item
        const first = responseData[0]
        if (first?.review_framework) {
          parsed = first as StructuredResponse
        }
      } else if (responseData?.review_framework) {
        parsed = responseData as StructuredResponse
      }

      if (parsed) {
        setStructuredData(parsed)
        setWebhookResponse("")
      } else {
        // Fallback: stringify for plain text display
        setStructuredData(null)
        setWebhookResponse(typeof responseData === "string" ? responseData : JSON.stringify(responseData, null, 2))
      }
      setAnalysisComplete(true)
    } catch (error) {
      console.error("[v0] Webhook error:", error)
      setWebhookError(
        error instanceof Error ? error.message : "Failed to get analysis from server"
      )
      setAnalysisComplete(true)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setVideoFile(file)
      setVideoUrl(URL.createObjectURL(file))
      setAnalysisComplete(false)
      setWebhookResponse("")
      setWebhookError("")
      setStructuredData(null)
      setIsAnalyzing(false)
      setUploadProgress(0)
    }
  }

  const handleAnalysis = () => {
    if (!videoFile) return
    setIsAnalyzing(true)
    setAnalysisComplete(false)
    setWebhookResponse("")
    setWebhookError("")
    setStructuredData(null)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + 10
      })
    }, 300)

    sendToWebhook(videoFile).finally(() => {
      clearInterval(interval)
      setUploadProgress(100)
      setIsAnalyzing(false)
    })
  }

  const sectionColors = [
    { heading: "text-blue-700 dark:text-blue-300", box: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800", scoreBg: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" },
    { heading: "text-emerald-700 dark:text-emerald-300", box: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800", scoreBg: "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300" },
    { heading: "text-amber-700 dark:text-amber-300", box: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800", scoreBg: "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300" },
    { heading: "text-purple-700 dark:text-purple-300", box: "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800", scoreBg: "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300" },
    { heading: "text-rose-700 dark:text-rose-300", box: "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800", scoreBg: "bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300" },
    { heading: "text-cyan-700 dark:text-cyan-300", box: "bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800", scoreBg: "bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300" },
    { heading: "text-orange-700 dark:text-orange-300", box: "bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800", scoreBg: "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300" },
  ]

  const parseTextContent = (text: string) => {
    const cleaned = text.replace(/\*\*/g, "").replace(/\\n/g, "\n")
    return cleaned
      .split("\n")
      .map((line) => line.replace(/^-\s*/, "").trim())
      .filter((line) => line.length > 0)
  }

  const renderStructuredFeedback = (data: StructuredResponse) => {
    const sections = data.review_framework
    return (
      <div className="space-y-5">
        {sections.map((section, idx) => {
          const color = sectionColors[idx % sectionColors.length]
          return (
            <div key={section.section_number} className={`rounded-lg border p-4 ${color.box}`}>
              {/* Section Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold uppercase tracking-wide ${color.heading} opacity-70`}>
                    Section {section.section_number}
                  </span>
                  <h3 className={`text-sm font-bold ${color.heading}`}>{section.section_title}</h3>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${color.scoreBg}`}>
                  {section.score}/5
                </span>
              </div>

              {/* Evidence */}
              {section.evidence && (
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Evidence</h4>
                  <div className="space-y-1">
                    {parseTextContent(section.evidence).map((line, i) => (
                      <p key={i} className="text-sm leading-relaxed text-foreground italic pl-3 border-l-2 border-current/20">
                        {`"${line.replace(/^"|"$/g, "")}"`}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Strengths */}
              {section.strengths && (
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1.5">Strengths</h4>
                  <ul className="space-y-1">
                    {parseTextContent(section.strengths).map((line, i) => (
                      <li key={i} className="text-sm leading-relaxed text-foreground flex gap-2">
                        <span className="text-emerald-500 mt-0.5 shrink-0">+</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gaps */}
              {section.gaps && (
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-1.5">Gaps</h4>
                  <ul className="space-y-1">
                    {parseTextContent(section.gaps).map((line, i) => (
                      <li key={i} className="text-sm leading-relaxed text-foreground flex gap-2">
                        <span className="text-amber-500 mt-0.5 shrink-0">!</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Coaching Suggestions */}
              {section.coaching_suggestions && (
                <div>
                  <h4 className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1.5">Coaching Suggestions</h4>
                  <ul className="space-y-1">
                    {parseTextContent(section.coaching_suggestions).map((line, i) => (
                      <li key={i} className="text-sm leading-relaxed text-foreground flex gap-2">
                        <span className="text-blue-500 mt-0.5 shrink-0">&#8594;</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  const renderPlainFeedback = (text: string) => {
    const cleaned = text.replace(/\*\*/g, "").replace(/\\n/g, "\n")
    return <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{cleaned}</div>
  }

  const handleFeedback = (type: "positive" | "negative", notes?: string) => {
    console.log("[v0] Video Analysis Feedback received:", { type, notes })
    // Here you can send the feedback to your backend
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button onClick={onBack} variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <FeedbackButtons onFeedback={handleFeedback} showNotes={true} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Video Analysis</h1>
          <p className="text-muted-foreground mt-1">Upload your meeting video for AI-powered feedback</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Side - Video Upload and Player */}
        <div className="lg:col-span-2 space-y-4">
          {/* Upload Section */}
          {!videoFile && (
            <Card className="border-dashed border-2">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Upload className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-1">Upload Meeting Video</h3>
                <p className="text-xs text-muted-foreground text-center mb-4 max-w-xs">
                  Upload a recording for AI analysis and feedback
                </p>
                <label htmlFor="video-upload">
                  <Button size="sm" asChild>
                    <span>
                      <Video className="w-4 h-4 mr-2" />
                      Choose Video File
                    </span>
                  </Button>
                </label>
                <input id="video-upload" type="file" accept="video/*" onChange={handleFileUpload} className="hidden" />
                <p className="text-xs text-muted-foreground mt-3">MP4, MOV, AVI (max 500MB)</p>
              </CardContent>
            </Card>
          )}

          {/* Video Player */}
          {videoFile && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Video Preview</CardTitle>
                  {analysisComplete && (
                    <Badge className="bg-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Analysis Complete
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                  <video src={videoUrl} controls className="w-full h-full" />
                </div>
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center justify-between mb-2">
                    <span>Filename: {videoFile.name}</span>
                    <span>Size: {(videoFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                  </div>
                </div>

                {isAnalyzing && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Analyzing video...</span>
                      <span className="font-semibold">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={handleAnalysis}
                    disabled={isAnalyzing || analysisComplete}
                    className="flex-1"
                  >
                    {isAnalyzing ? (
                      <>
                        <MessageSquare className="w-4 h-4 mr-2 animate-pulse" />
                        Analyzing...
                      </>
                    ) : analysisComplete ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Analysis Complete
                      </>
                    ) : (
                      <>
                        <Video className="w-4 h-4 mr-2" />
                        Analysis
                      </>
                    )}
                  </Button>
                  <label htmlFor="video-reupload">
                    <Button variant="outline" className="bg-transparent" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        Re-upload
                      </span>
                    </Button>
                  </label>
                  <input
                    id="video-reupload"
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Side - AI Feedback */}
        <div className="lg:col-span-3 flex flex-col min-h-[calc(100vh-160px)]">
          {!analysisComplete && !isAnalyzing ? (
            <Card className="border-dashed border-2 flex-1 flex">
              <CardContent className="flex flex-col items-center justify-center py-12 flex-1">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">AI Feedback</h3>
                <p className="text-sm text-muted-foreground text-center max-w-sm">
                  Upload a video to receive detailed AI-generated feedback on your performance
                </p>
              </CardContent>
            </Card>
          ) : isAnalyzing ? (
            <Card className="flex-1 flex">
              <CardContent className="flex flex-col items-center justify-center py-12 flex-1">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 animate-pulse">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Analyzing Video...</h3>
                <p className="text-sm text-muted-foreground text-center max-w-sm">
                  Your video is being sent for AI analysis. This may take a moment.
                </p>
                <div className="w-full max-w-xs mt-4">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground text-center mt-2">{uploadProgress}% complete</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="flex-1 flex flex-col">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  {webhookError ? (
                    <>
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      Analysis Error
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      AI Feedback
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)]">
                {webhookError ? (
                  <div className="text-sm text-red-600 dark:text-red-400">
                    <p className="mb-2 font-medium">Failed to analyze video:</p>
                    <p>{webhookError}</p>
                  </div>
                ) : structuredData ? (
                  renderStructuredFeedback(structuredData)
                ) : webhookResponse ? (
                  renderPlainFeedback(webhookResponse)
                ) : (
                  <p className="text-sm text-muted-foreground">No feedback received from the server.</p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
