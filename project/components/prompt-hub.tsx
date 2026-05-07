"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { InfoIcon, Sparkles, Copy, Check } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { FeedbackButtons } from "@/components/feedback-buttons"

interface PromptHubProps {
  onBack: () => void
}

export function PromptHub({ onBack }: PromptHubProps) {
  const [objectives, setObjectives] = useState(
    "Practice pharma communication skills, specifically confident and compliant objection handling in HCP interactions.",
  )
  const [userRole, setUserRole] = useState("Pharma Sales Representative")
  const [aiRole, setAiRole] = useState("Astra – Pharma Sales Coach")
  const [tone, setTone] = useState("Warm, professional, conversational, compliant")
  const [depthLevel, setDepthLevel] = useState("Interactive, reflective coaching (medium depth)")
  const [situation, setSituation] = useState(
    'Handling the HCP objection: "I already prescribe the competitor\'s drug. Why should I change?"',
  )
  const [generatedPrompt, setGeneratedPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    setIsLoading(true)
    setGeneratedPrompt("")

    try {
      const response = await fetch(
        "https://indegene-sbx.app.n8n.cloud/webhook-test/cf2f6724-69c1-4e3f-8bae-cd66e7d529a4",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            objectives,
            userRole,
            aiRole,
            tone,
            depthLevel,
            situation,
          }),
        },
      )

      const data = await response.json()
      // Assuming the webhook returns the prompt in a field called 'prompt' or similar
      const prompt = data.prompt || data.generatedPrompt || data.result || JSON.stringify(data, null, 2)
      setGeneratedPrompt(prompt)
    } catch (error) {
      console.error("[v0] Error generating prompt:", error)
      setGeneratedPrompt("Error generating prompt. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("[v0] Error copying to clipboard:", error)
    }
  }

  const handleFeedback = (type: "positive" | "negative", notes?: string) => {
    console.log("[v0] Prompt Hub Feedback received:", { type, notes })
    // Here you can send the feedback to your backend
  }

  const handleNavigate = (index: number) => {
    if (index === 0) {
      onBack()
    } else if (index === 1) {
      onBack()
    } else if (index === 2) {
      onBack()
    }
  }

  return (
    <>
      <Navigation path={["Home", "Dashboard", "Training", "Prompt Hub"]} onNavigate={handleNavigate} />
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Role-Play / Scenario-Based</h2>
              <p className="text-muted-foreground text-sm">
                AI acts as a specific person for simulations, character-based responses, training scenarios, coaching,
                or realistic dialogue
              </p>
            </div>
            <FeedbackButtons onFeedback={handleFeedback} showNotes={true} />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Side - Required Information */}
            <Card className="border-border/50 shadow-sm h-fit">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <InfoIcon className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">Required Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="objectives">
                    Objectives <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="objectives"
                    value={objectives}
                    onChange={(e) => setObjectives(e.target.value)}
                    placeholder="What should be achieved in this interaction?"
                    rows={3}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userRole">
                    User Role <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="userRole"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    placeholder="e.g., Medical Sales Representative"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aiRole">
                    AI Role/Character <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="aiRole"
                    value={aiRole}
                    onChange={(e) => setAiRole(e.target.value)}
                    placeholder="e.g., Experienced Pharmacist, Clinical Trial Coordinator"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">Tone</Label>
                  <Input
                    id="tone"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    placeholder="e.g., Professional, Friendly, Authoritative"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="depthLevel">Depth Level</Label>
                  <Input
                    id="depthLevel"
                    value={depthLevel}
                    onChange={(e) => setDepthLevel(e.target.value)}
                    placeholder="e.g., Beginner, Intermediate, Advanced"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="situation">Situation</Label>
                  <Textarea
                    id="situation"
                    value={situation}
                    onChange={(e) => setSituation(e.target.value)}
                    placeholder="Describe the situation and setting..."
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="w-full gradient-pharma-1 text-primary-foreground hover:opacity-90 h-12 text-base font-semibold"
                >
                  {isLoading ? "Generating..." : "Generate"}
                </Button>
              </CardContent>
            </Card>

            {/* Right Side - Generated Prompt */}
            <Card className="border-border/50 shadow-sm h-fit">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 text-primary"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <CardTitle className="text-lg">Generated Prompt</CardTitle>
                  </div>
                  {generatedPrompt && !isLoading && (
                    <Button onClick={handleCopy} variant="outline" size="sm" className="gap-2 bg-transparent">
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mb-4" />
                    <p className="text-muted-foreground text-sm">Generating your prompt...</p>
                  </div>
                ) : generatedPrompt ? (
                  <div className="bg-muted/30 rounded-lg p-4 h-[500px] overflow-y-auto">
                    <pre className="text-sm whitespace-pre-wrap font-mono text-foreground">{generatedPrompt}</pre>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center mb-4">
                      <Sparkles className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm max-w-xs">
                      Fill in the required fields and click generate to see your compliant prompt
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
