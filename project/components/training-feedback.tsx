"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, CheckCircle2, MessageSquare, Target, AlertCircle, Loader2 } from "lucide-react"
import type { Training } from "@/app/page"

interface ReviewSection {
  section_number: number
  section_title: string
  evidence: string
  strengths: string
  gaps: string
  coaching_suggestions: string
  score: number
}

interface TrainingFeedbackProps {
  training: Training
  sessionDuration?: string
  sessionNotes: string
  onClose: () => void
  webhookResponseData?: unknown
  isLoadingWebhook?: boolean
}

export function TrainingFeedback({ training, sessionDuration, sessionNotes, onClose, webhookResponseData, isLoadingWebhook }: TrainingFeedbackProps) {

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

  const parseWebhookResponse = (data: unknown): { structured: ReviewSection[] | null; plain: string; error: string } => {
    if (!data) return { structured: null, plain: "", error: "" }

    // Check for error
    if (typeof data === "object" && data !== null && "error" in data) {
      return { structured: null, plain: "", error: String((data as { error: string }).error) }
    }

    // Try to extract review_framework
    let parsed: { review_framework?: ReviewSection[] } | null = null
    if (Array.isArray(data)) {
      const first = data[0]
      if (first?.review_framework) parsed = first
    } else if (typeof data === "object" && data !== null && "review_framework" in data) {
      parsed = data as { review_framework: ReviewSection[] }
    }

    if (parsed?.review_framework) {
      return { structured: parsed.review_framework, plain: "", error: "" }
    }

    // Fallback to plain text
    const plainText = typeof data === "string" ? data : JSON.stringify(data, null, 2)
    const cleaned = plainText.replace(/\*\*/g, "").replace(/\\n/g, "\n").replace(/[{}[\]"]/g, "").replace(/"[^"]*":/g, "").trim()
    return { structured: null, plain: cleaned, error: "" }
  }

  const renderStructuredFeedback = (sections: ReviewSection[]) => (
    <div className="space-y-5">
      {sections.map((section, idx) => {
        const color = sectionColors[idx % sectionColors.length]
        return (
          <div key={section.section_number} className={`rounded-lg border p-4 ${color.box}`}>
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
  const handleDownload = () => {
    // Create feedback report
    const report = `
Training Session Feedback Report
================================

Training: ${training.title}
Date: ${new Date().toLocaleDateString()}

Session Duration: ${sessionDuration || "Not specified"}

Session Notes:
${sessionNotes || "No notes recorded"}

Performance Summary:
- Communication Clarity: Excellent
- Empathy & Active Listening: Very Good
- Problem Resolution: Good
- Compliance Adherence: Excellent

Areas of Strength:
✓ Clear and professional communication
✓ Demonstrated understanding of client concerns
✓ Followed compliance guidelines effectively

Areas for Improvement:
• Continue practicing objection handling
• Work on pace of conversation delivery

Overall Performance: Strong session with good engagement
    `.trim()

    // Create blob and download
    const blob = new Blob([report], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${training.title}_feedback_${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-auto">
      <div className="max-w-4xl mx-auto p-6 py-12 space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold">Training Session Complete!</h1>
          <p className="text-muted-foreground">Great job completing your {training.title} training session</p>
        </div>

        {/* Session Summary */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Session Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Training Type</p>
              <p className="text-lg font-semibold">{training.title}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Date Completed</p>
              <p className="text-lg font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* AI Coach Feedback - Webhook Response */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              AI Coach Feedback
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">Detailed feedback on your performance</p>
          </CardHeader>
          <CardContent>
            {isLoadingWebhook || (!webhookResponseData && !isLoadingWebhook) ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <h3 className="text-base font-semibold mb-1">Analyzing your session...</h3>
                <p className="text-sm text-muted-foreground text-center max-w-sm">
                  Your session is being analyzed by AI. This may take a moment.
                </p>
              </div>
            ) : (() => {
              const { structured, plain, error } = parseWebhookResponse(webhookResponseData)
              if (error) {
                return (
                  <div className="flex items-start gap-3 text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">Failed to get feedback:</p>
                      <p>{error}</p>
                    </div>
                  </div>
                )
              }
              if (structured) {
                return renderStructuredFeedback(structured)
              }
              if (plain) {
                return (
                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {plain}
                  </div>
                )
              }
              return (
                <p className="text-sm text-muted-foreground">No feedback received from the server.</p>
              )
            })()}
          </CardContent>
        </Card>



        {/* Session Notes */}
        {sessionNotes && (
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Your Session Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{sessionNotes}</p>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center pt-4">
          <Button onClick={handleDownload} size="lg" className="gap-2">
            <Download className="w-4 h-4" />
            Download Feedback Report
          </Button>
          <Button onClick={onClose} variant="outline" size="lg">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
