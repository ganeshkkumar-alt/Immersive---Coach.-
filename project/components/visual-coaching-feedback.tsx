"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { FeedbackButtons } from "@/components/feedback-buttons"

interface VisualCoachingFeedbackProps {
  onBack: () => void
}

export function VisualCoachingFeedback({ onBack }: VisualCoachingFeedbackProps) {
  const router = useRouter()

  const handleDownload = () => {
    // Generate PDF or download functionality
    window.print()
  }

  const handleBackToSessions = () => {
    window.location.href = "/ai-coach"
  }

  const handleFeedback = (type: "positive" | "negative", notes?: string) => {
    console.log("[v0] Visual Coaching Feedback received:", { type, notes })
    // Here you can send the feedback to your backend
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Visual Coaching Feedback</h1>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Main Title Card */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">🎭</div>
              Facial Sentiment & Emotional State Analysis (User-Only)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-2">Session Type:</p>
              <p className="text-lg">AI coaching conversation</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-2">Primary Signals Analyzed:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Micro-expressions", "Eye behavior", "Facial tension", "Head movement", "Emotional consistency"].map(
                  (signal) => (
                    <div key={signal} className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-sm">{signal}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overall Summary */}
        <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {/* Placeholder for Brain icon */}
              <span className="w-5 h-5 text-green-600">🧠</span>
              Overall Facial Sentiment Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Dominant Emotional State</p>
                <p className="text-lg font-bold text-green-600">Calm Confidence</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Secondary States</p>
                <p className="text-lg font-semibold">Thoughtfulness, Empathy</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Absent States</p>
                <p className="text-lg text-muted-foreground">Panic, Anxiety, Aggression</p>
              </div>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-200 flex items-center gap-2">
                <span className="text-lg">✅</span>
                Your face consistently projected control, credibility, and emotional safety.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Emotion Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {/* Placeholder for TrendingUp icon */}
              <span className="w-5 h-5">📈</span>
              Facial Emotion Timeline (Simulated)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Emotion Signal</th>
                    <th className="text-left py-3 px-4 font-semibold">Detection Level</th>
                    <th className="text-left py-3 px-4 font-semibold">Interpretation</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      emoji: "😌",
                      emotion: "Calm / Composed",
                      level: "High",
                      interpretation: "You appeared mentally prepared and in control",
                    },
                    {
                      emoji: "🤔",
                      emotion: "Thoughtful / Analytical",
                      level: "Moderate–High",
                      interpretation: "Reflective pauses and slight brow focus",
                    },
                    {
                      emoji: "🙂",
                      emotion: "Empathy / Warmth",
                      level: "Moderate",
                      interpretation: "Soft eye contact + relaxed mouth corners",
                    },
                    { emoji: "😐", emotion: "Neutral", level: "Low", interpretation: "You rarely appeared disengaged" },
                    {
                      emoji: "😟",
                      emotion: "Anxiety / Panic",
                      level: "None Detected",
                      interpretation: "No lip compression, no rapid blinking",
                    },
                    {
                      emoji: "😞",
                      emotion: "Sadness",
                      level: "None Detected",
                      interpretation: "No downward gaze or mouth droop",
                    },
                    {
                      emoji: "🤨",
                      emotion: "Doubt / Uncertainty",
                      level: "Very Low",
                      interpretation: "No asymmetrical eyebrow raise",
                    },
                    {
                      emoji: "😤",
                      emotion: "Frustration",
                      level: "None Detected",
                      interpretation: "Jaw remained relaxed",
                    },
                  ].map((row) => (
                    <tr key={row.emotion} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{row.emoji}</span>
                          <span className="font-medium">{row.emotion}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            row.level.includes("High")
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                              : row.level.includes("Moderate")
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                                : row.level.includes("Low") || row.level.includes("None")
                                  ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                          }`}
                        >
                          {row.level}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{row.interpretation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Facial Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {/* Placeholder for Eye icon */}
              <span className="w-5 h-5">👀</span>
              Detailed Facial Feedback by Behavior
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Eye Behavior */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">👀 Eye Behavior</h3>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold">Observed:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Steady eye contact with occasional natural breaks</li>
                  <li>No darting or avoidance</li>
                  <li>Blink rate remained stable</li>
                </ul>
                <p className="text-sm font-semibold mt-3">Sentiment Interpretation:</p>
                <p className="text-sm text-muted-foreground">
                  Indicates confidence and cognitive clarity. No fear response or uncertainty spike.
                </p>
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mt-3">
                  <p className="text-sm text-blue-800 dark:text-blue-200 flex items-center gap-2">
                    <span>💡</span>
                    <span className="font-semibold">AI Coaching Insight:</span>
                    <span>Stable gaze = high perceived authority and honesty</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Mouth & Jaw Tension */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">😐 Mouth & Jaw Tension</h3>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold">Observed:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Neutral or slight smile during affirmations</li>
                  <li>No jaw clenching</li>
                  <li>No lip pressing during data delivery</li>
                </ul>
                <p className="text-sm font-semibold mt-3">Sentiment Interpretation:</p>
                <p className="text-sm text-muted-foreground">
                  Absence of stress or internal conflict. Data was delivered with internal confidence.
                </p>
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mt-3">
                  <p className="text-sm text-amber-800 dark:text-amber-200 flex items-center gap-2">
                    <span>⚠️</span>
                    <span className="font-semibold">Micro-Optimization:</span>
                    <span>
                      A slight smile while stating benefits could increase warmth without reducing seriousness.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Brow & Forehead */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">🤔 Brow & Forehead</h3>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold">Observed:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Light brow engagement during reflective questions</li>
                  <li>No furrowing during push moments</li>
                </ul>
                <p className="text-sm font-semibold mt-3">Sentiment Interpretation:</p>
                <p className="text-sm text-muted-foreground">
                  Shows curiosity, not pressure. No skepticism or doubt projected.
                </p>
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mt-3">
                  <p className="text-sm text-blue-800 dark:text-blue-200 flex items-center gap-2">
                    <span>🧠</span>
                    <span className="font-semibold">AI Insight:</span>
                    <span>This brow pattern signals thinking with the listener, not thinking against them.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Head Movement & Posture */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">🧍 Head Movement & Posture</h3>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold">Observed:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Subtle nods when affirming cautious approaches</li>
                  <li>Upright posture maintained throughout</li>
                </ul>
                <p className="text-sm font-semibold mt-3">Sentiment Interpretation:</p>
                <p className="text-sm text-muted-foreground">
                  Reinforced alignment and respect. No submissive tilt or dominance posture.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stress / Panic Detection */}
        <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {/* Placeholder for AlertCircle icon */}
              <span className="w-5 h-5 text-green-600">⚠️</span>
              Stress / Panic Detection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-semibold mb-3">AI Panic Indicators Checked:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {[
                "Rapid blinking",
                "Facial flushing",
                "Micro head shakes",
                "Sudden posture collapse",
                "Voice-face mismatch",
              ].map((indicator) => (
                <div key={indicator} className="flex items-center gap-2 bg-white dark:bg-gray-900 rounded-lg px-3 py-2">
                  <span className="text-red-500">❌</span>
                  <span className="text-sm">{indicator}</span>
                </div>
              ))}
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <p className="text-lg font-bold text-green-800 dark:text-green-200 mb-2">
                🟢 Result: NO PANIC RESPONSE DETECTED
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                This is ideal for high-credibility AI-mediated conversations.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Confidence Signals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {/* Placeholder for TrendingUp icon */}
              <span className="w-5 h-5">📈</span>
              Doubt & Confidence Micro-Signals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-semibold mb-3">Confidence Signals Detected:</p>
              <div className="space-y-2">
                {[
                  "Even facial muscle activation",
                  "Controlled facial transitions",
                  "No self-soothing behaviors (face touching, lip biting)",
                ].map((signal) => (
                  <div key={signal} className="flex items-center gap-2">
                    <span className="text-green-500">✔</span>
                    <span className="text-sm">{signal}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-3">Doubt Signals:</p>
              <div className="flex items-center gap-2">
                <span className="text-red-500">❌</span>
                <span className="text-sm">None significant</span>
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-lg font-bold text-blue-800 dark:text-blue-200">
                🟢 Net Facial Confidence Score: 8.8 / 10
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Key Coaching Insights */}
        <Card className="border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {/* Placeholder for MessageSquare icon */}
              <span className="w-5 h-5 text-purple-600">💬</span>
              Key Coaching Insights (Facial-Only)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-semibold mb-3 text-green-700 dark:text-green-400">✅ Strengths to Keep:</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Calm baseline face → builds trust instantly</li>
                <li>Emotionally stable during data mention</li>
                <li>No facial pressure when asking for agreement</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold mb-3 text-amber-700 dark:text-amber-400">⚠️ Subtle Improvements:</p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold">Warmth Boost:</p>
                  <p className="text-sm text-muted-foreground">Add a micro-smile during validation lines</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Emphasis Cue:</p>
                  <p className="text-sm text-muted-foreground">Slight eyebrow lift when stating key numbers</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Closing Signal:</p>
                  <p className="text-sm text-muted-foreground">Final nod + soft smile to visually mark closure</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Product Usage */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              How Your AI Coaching Product Can Use This
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">Your product can output real-time cues like:</p>
            <div className="space-y-2">
              {[
                { color: "green", text: "Facial stress low — maintain pace" },
                { color: "yellow", text: "Consider warmth cue (micro-smile detected low)" },
                { color: "green", text: "Confidence stable — safe to introduce data" },
                { color: "green", text: "No panic or doubt detected" },
              ].map((cue, i) => (
                <div key={i} className="flex items-center gap-3 bg-muted/50 rounded-lg p-3">
                  <span
                    className={`h-3 w-3 rounded-full ${cue.color === "green" ? "bg-green-500" : "bg-yellow-500"}`}
                  />
                  <span className="text-sm font-medium">{cue.text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons - Bottom of Page */}
        <div className="flex flex-col items-center gap-6 pt-6 pb-12">
          <div className="w-full max-w-xl">
            <FeedbackButtons onFeedback={handleFeedback} showNotes={true} />
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button onClick={handleDownload} variant="outline" size="lg" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button onClick={handleBackToSessions} size="lg">
              Back to Sessions
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
