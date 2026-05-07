"use client"

import type React from "react"

import type { ReactElement } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Sparkles, Edit, Play, BarChart3, Package, Pencil, Share2, Search, ChevronRight, ChevronDown, FlaskConical } from "lucide-react"
import type { Training } from "@/app/ai-coach/page"
import { Navigation } from "@/components/navigation"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { VideoAnalysis } from "@/components/video-analysis"
import { PersonaManager } from "@/components/persona-manager"
import { ScenarioTesting } from "@/components/scenario-testing"

interface DashboardProps {
  trainings: Training[]
  onAddTraining: () => void
  showScenarioSelection: boolean
  onCloseScenarioSelection: () => void
  onCustomScenario: () => void
  onPredefinedScenario: () => void
  onOpenTrainingSession: (training: Training) => void
  onOpenTrainingDetails: (training: Training) => void
  onNavigateHome?: () => void
  onShareTraining?: (training: Training) => void
  onOpenVisualTraining?: (training: Training) => void // Added onOpenVisualTraining
  onAnalysisVideo?: () => void // Added callback for Analysis Meetings
}

export function Dashboard({
  trainings,
  onAddTraining,
  showScenarioSelection,
  onCloseScenarioSelection,
  onCustomScenario,
  onPredefinedScenario,
  onOpenTrainingSession,
  onOpenTrainingDetails,
  onNavigateHome,
  onShareTraining,
  onOpenVisualTraining, // Added onOpenVisualTraining
  onAnalysisVideo, // Added onAnalysisVideo
}: DashboardProps): ReactElement {
  const handleNavigate = (index: number) => {
    if (index === 0 && onNavigateHome) {
      onNavigateHome()
    }
  }

  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [activeTab, setActiveTab] = useState<
    "role-play" | "create-training" | "analytics" | "guardrail-engine" | "post-call-analysis" | "persona" | "scenario-testing" | "pdf-to-quiz"
  >("role-play")
  const [trainingType, setTrainingType] = useState<"audio" | "visual">("audio")
  const [createType, setCreateType] = useState<"predefined" | "custom">("predefined")
  
  // PDF to Quiz state
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [quizPrompt, setQuizPrompt] = useState<string>("")
  const [generatedQuestions, setGeneratedQuestions] = useState<string>("")
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState<boolean>(false)
  const pdfInputRef = React.useRef<HTMLInputElement>(null)
  
  const handleGenerateQuiz = async () => {
    if (!pdfFile || !quizPrompt.trim()) {
      return
    }
    
    setIsGeneratingQuiz(true)
    setGeneratedQuestions("")
    
    try {
      const formData = new FormData()
      formData.append("pdf", pdfFile)
      formData.append("prompt", quizPrompt)
      
      const response = await fetch("https://indegene-sbx.app.n8n.cloud/webhook-test/14385e1a-5cc2-451a-8c06-7da7b377e688", {
        method: "POST",
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error("Failed to generate quiz")
      }
      
      const data = await response.text()
      setGeneratedQuestions(data)
    } catch (error) {
      console.error("Error generating quiz:", error)
      setGeneratedQuestions("Error generating quiz. Please try again.")
    } finally {
      setIsGeneratingQuiz(false)
    }
  }
  
  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setPdfFile(file)
    }
  }

  // Fix for lint/correctness/useHookAtTopLevel and lint/correctness/noUndeclaredVariables
  // Declare local state for scenario selection visibility.
  // The prop `showScenarioSelection` is used for initialisation.
  const [isScenarioSelectionVisible, setIsScenarioSelectionVisible] = useState(showScenarioSelection)

  const [companyLogo, setCompanyLogo] = useState<File | null>(null)
  const [brandDocuments, setBrandDocuments] = useState<File | null>(null)
  const [showGuardrailsEditor, setShowGuardrailsEditor] = useState(false)
  const [guardrailsJson, setGuardrailsJson] = useState(
    JSON.stringify(
      {
        pharma_guardrails: {
          "1_off_label_restrictions": {
            purpose: "Prevent AI from providing any information beyond the approved product label.",
            must_not: [
              "Mention unapproved indications or uses.",
              "Suggest unapproved dosing, administration, or patient groups.",
              "Reference investigational, pipeline, or off-label uses.",
              "Imply unapproved clinical benefit.",
              "Compare off-label uses with competitor brands.",
            ],
            safe_alternatives: [
              "Provide only approved label information.",
              "Direct user to official prescribing information.",
              "Escalate scientific queries to Medical Affairs.",
              "Offer high-level disease awareness content only.",
            ],
          },
          "2_medical_advice_and_diagnosis": {
            purpose: "Ensure AI does not act as a clinician or make treatment decisions.",
            must_not: [
              "Provide medical diagnosis or confirm conditions.",
              "Recommend specific treatments, titration, or therapy switching.",
              "Give individual patient safety/risk advice.",
              "Interpret symptoms or recommend urgent medical actions.",
              "Provide clinical decision-making guidance.",
            ],
            safe_alternatives: [
              "Encourage discussion with a qualified healthcare professional.",
              "Suggest referring to clinical guidelines.",
              "Direct patient-specific questions to a clinician.",
              "Direct to Medical Affairs for scientific information.",
            ],
          },
          "3_promotional_compliance": {
            purpose: "Prevent promotional or persuasive messaging.",
            must_not: [
              "Make promotional claims or marketing statements.",
              "Exaggerate drug efficacy or benefits.",
              "State superiority without approved head-to-head evidence.",
              "Use persuasive selling language.",
              "Mention competitor brands negatively.",
            ],
            safe_alternatives: [
              "Use factual, balanced, non-promotional language.",
              "Share approved, objective brand information.",
              "Focus on disease awareness or guideline context.",
            ],
          },
          "4_fair_balance_and_risk_disclosure": {
            purpose: "Ensure balanced representation of benefits and risks.",
            must_not: [
              "Present benefits without including safety context.",
              "Downplay risks, side effects, or contraindications.",
              "Imply the drug has no risks or is universally safe.",
            ],
            safe_alternatives: [
              "Share safety information from the approved label.",
              "Recommend reviewing the full risk profile in PI/SmPC.",
              "Maintain balanced, factual phrasing.",
            ],
          },
          "5_privacy_and_patient_safety": {
            purpose: "Protect privacy and avoid personalised medical guidance.",
            must_not: [
              "Collect or store personal patient data.",
              "Request identifiable or sensitive health details.",
              "Provide personalised risk assessments.",
              "Infer medical conditions from limited information.",
              "Give advice based on patient identity.",
            ],
            safe_alternatives: [
              "Provide general, non-patient-specific information.",
              "Encourage data privacy practices.",
              "Direct complex issues to healthcare professionals.",
            ],
          },
          "6_scientific_information_controls": {
            purpose: "Maintain compliance between promotional and scientific exchange.",
            must_not: [
              "Provide unsolicited scientific content.",
              "Share unapproved study data or make interpretations.",
              "Answer complex scientific queries directly if off-label.",
              "Discuss mechanistic hypotheses not in approved materials.",
            ],
            safe_alternatives: [
              "Escalate scientific questions to Medical Affairs.",
              "Provide general high-level summaries aligned with label.",
              "Offer compliant, balanced scientific context.",
            ],
          },
          "7_competitor_and_market_comparisons": {
            purpose: "Prevent inappropriate competitive positioning.",
            must_not: [
              "Compare products directly unless in approved label.",
              "Claim superiority without evidence.",
              "Discuss competitor pricing or market share.",
              "Speak negatively or critically about other brands.",
            ],
            safe_alternatives: [
              "Use neutral, non-comparative language.",
              "Focus on disease-state or guideline information.",
              "Stick to approved brand claims only.",
            ],
          },
          "8_patient_support_and_adherence": {
            purpose: "Avoid risky or incorrect patient behaviour guidance.",
            must_not: [
              "Give dosing or schedule advice.",
              "Suggest adjusting medication independently.",
              "Offer financial counselling or reimbursement guarantees.",
              "Promise outcomes such as 'cure' or 'no side effects'.",
            ],
            safe_alternatives: [
              "Provide general adherence tips.",
              "Direct users to official patient support programs.",
              "Encourage discussion with the prescribing provider.",
            ],
          },
          "9_ethical_interaction_standards": {
            purpose: "Maintain ethical, respectful, compliant communication.",
            must_not: [
              "Use emotional manipulation or pressure.",
              "Make unrealistic benefit statements.",
              "Advise on legal, ethical, or regulatory matters.",
              "Use confrontational or authoritative tone.",
            ],
            safe_alternatives: [
              "Maintain respectful, patient-centered communication.",
              "Use neutral, fact-based explanations.",
              "Reinforce HCP autonomy and clinical judgment.",
            ],
          },
          "10_regulatory_alignment": {
            purpose: "Ensure alignment with FDA, EMA, MHRA, and global pharma regulatory codes.",
            must_not: [
              "Make globally uniform claims without regional approval.",
              "Misbrand or imply unverified claims.",
              "Promote prescription drugs to non-HCPs.",
              "Share content inconsistent with regional SmPC/PI.",
            ],
            safe_alternatives: [
              "Reference region-specific labels or guidelines.",
              "Use compliant, approved product information.",
              "Direct non-HCP users to disease awareness content only.",
            ],
          },
          "11_transparency_of_limitations": {
            purpose: "Ensure the AI clearly communicates its boundaries.",
            should_say: [
              "I cannot provide medical advice.",
              "I cannot give off-label information.",
              "I can only share approved, high-level guidance.",
              "For personalised recommendations, please consult a healthcare professional.",
            ],
          },
          "12_escalation_protocols": {
            purpose: "Ensure safe handover of inquiries beyond AI scope.",
            must_escalate: [
              "Requests involving off-label information.",
              "Adverse event or product complaint reports.",
              "Complex scientific questions.",
              "Patient-specific medical advice inquiries.",
            ],
            escalate_to: [
              "Medical Affairs team",
              "Pharmacovigilance / Safety team",
              "Customer support",
              "Official product website or PI/SmPC",
            ],
          },
        },
      },
      null,
      2,
    ),
  )

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCompanyLogo(e.target.files[0])
    }
  }

  const handleDocumentsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBrandDocuments(e.target.files[0])
    }
  }

  const generateHeatmapData = () => {
    const months = []
    const today = new Date()

    // Generate data for last 24 months (2 years)
    for (let i = 23; i >= 0; i--) {
      const monthDate = new Date(today)
      monthDate.setMonth(monthDate.getMonth() - i)

      const monthData = {
        month: monthDate.toLocaleDateString("en-US", { month: "short" }),
        year: monthDate.getFullYear().toString().slice(-2),
        weeks: [] as { week: number; count: number }[],
      }

      // Generate data for 4 weeks of the month
      for (let w = 1; w <= 4; w++) {
        // Simulate training creation count (0-8 trainings per week)
        const count = Math.floor(Math.random() * 9)

        monthData.weeks.push({
          week: w,
          count,
        })
      }

      months.push(monthData)
    }

    return months
  }

  const heatmapData = generateHeatmapData()

  const getHeatColor = (count: number) => {
    if (count === 0) return "bg-muted"
    if (count <= 2) return "bg-green-200 dark:bg-green-900/30"
    if (count <= 4) return "bg-green-400 dark:bg-green-700/50"
    if (count <= 6) return "bg-green-600 dark:bg-green-600/70"
    return "bg-green-800 dark:bg-green-500"
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-4 py-2">
        <div className="mb-6">
          <Navigation path={["Home", "Dashboard"]} onNavigate={handleNavigate} />
        </div>

        {!isScenarioSelectionVisible && (
          <div className="flex gap-6">
            {/* Side Navigation - Always visible */}
            <div className="w-44 flex-shrink-0">
              <Card className="border border-border p-3">
                <nav className="space-y-2">
                  <div className="space-y-1">
                    <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Persona
                    </div>
                    <button
                      onClick={() => setActiveTab("persona")}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                        activeTab === "persona"
                          ? "bg-pink-500 text-white"
                          : "text-foreground hover:bg-pink-100 dark:hover:bg-pink-900/30"
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      Create Persona
                    </button>
                  </div>

                  <div className="border-t border-border my-2" />

                  <div className="space-y-1">
                    <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Role-Play
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab("role-play")
                        setTrainingType("audio")
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === "role-play"
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      Pre-Call Coaching Sessions
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("post-call-analysis")
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === "post-call-analysis"
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      Post-Call Analysis
                    </button>
                  </div>

                  <div className="border-t border-border my-2" />

                  <div className="space-y-1">
                    <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Create Coaching
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab("create-training")
                        setCreateType("predefined")
                        onPredefinedScenario()
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === "create-training" && createType === "predefined"
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      Pre-defined Scenarios
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("create-training")
                        setCreateType("custom")
                        onCustomScenario()
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === "create-training" && createType === "custom"
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      Custom Scenarios
                    </button>
                  </div>

                  <div className="border-t border-border my-2" />

                  <div className="space-y-1">
                    <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Scenario Testing
                    </div>
                    <button
                      onClick={() => setActiveTab("scenario-testing")}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                        activeTab === "scenario-testing"
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <FlaskConical className="w-4 h-4" />
                      Scenario Testing
                    </button>
                  </div>

                  <div className="border-t border-border my-2" />

                  <button
                    onClick={() => setActiveTab("analytics")}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                      activeTab === "analytics"
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    Analytics
                  </button>

                  <button
                    onClick={() => setActiveTab("guardrail-engine")}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                      activeTab === "guardrail-engine"
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <Package className="w-4 h-4" />
                    Guardrail Engine
                  </button>

                  <button
                    onClick={() => setActiveTab("pdf-to-quiz")}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                      activeTab === "pdf-to-quiz"
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    PDF to Quiz
                  </button>

                  </nav>
              </Card>
            </div>

            {/* Main Content Area - Changes based on activeTab */}
            <div className="flex-1">
              {activeTab === "persona" ? (
                <PersonaManager />
              ) : activeTab === "scenario-testing" ? (
                <ScenarioTesting />
              ) : activeTab === "post-call-analysis" ? (
                <VideoAnalysis onBack={() => setActiveTab("role-play")} />
              ) : activeTab === "role-play" && trainingType === "audio" ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground">Pre-Call Coaching Sessions</h2>
                  </div>

                  {/* Coaching Cards - Horizontal Layout */}
                  <div className="space-y-3">
                    {trainings.map((training) => (
                      <Card
                        key={training.id}
                        className="border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden relative"
                      >
                        <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-blue-100/60 via-blue-50/30 to-transparent dark:from-blue-900/40 dark:via-blue-950/20 dark:to-transparent pointer-events-none" />

                        <div className="flex items-center gap-6 p-4 relative z-10">
                          {/* Title Section - Left */}
                          <div className="w-48 flex-shrink-0">
                            <h3 className="font-semibold text-base text-foreground mb-1 leading-tight">
                              {training.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                              <div className="flex items-center gap-1">
                                <span className="font-medium">{training.totalSessions}</span>
                                <span>sessions</span>
                              </div>
                              <span>•</span>
                              <span>{training.latestSession}</span>
                            </div>
                          </div>

                          {/* Description & Episodes - Center */}
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{training.description}</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1">
                              {training.episodes.slice(0, 3).map((episode) => (
                                <div key={episode.id} className="flex items-center gap-1.5">
                                  <div className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                                  <span className="text-xs text-foreground">{episode.title}</span>
                                </div>
                              ))}
                              {training.episodes.length > 3 && (
                                <div className="text-xs text-muted-foreground">
                                  +{training.episodes.length - 3} more
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons - Right */}
                          <div className="flex gap-2 flex-shrink-0">
                            <Button
                              onClick={() => onOpenTrainingDetails(training)}
                              variant="outline"
                              size="sm"
                              className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-emerald-950/30 hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-950/50 dark:hover:to-emerald-950/50 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                            >
                              <Edit className="w-3.5 h-3.5 mr-1.5" />
                              Edit
                            </Button>
                            <Button
                              onClick={() => onShareTraining?.(training)}
                              variant="outline"
                              size="sm"
                              className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-950/50 dark:hover:to-emerald-950/50 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
                            >
                              <Share2 className="w-3.5 h-3.5 mr-1.5" />
                              Share
                            </Button>
                            <Button
                              onClick={() => onOpenTrainingSession(training)}
                              size="sm"
                              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                            >
                              <Play className="w-3.5 h-3.5 mr-1.5" />
                              Start Session
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : activeTab === "role-play" && trainingType === "visual" ? (
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Visual Coaching</h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
                    {trainings.map((training) => (
                      <Card
                        key={training.id}
                        className="border border-border shadow-sm hover:shadow-lg transition-all overflow-hidden group cursor-pointer"
                        onClick={() => onOpenVisualTraining?.(training)}
                      >
                        <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 relative overflow-hidden flex items-center justify-center p-4">
                          <h3 className="font-semibold text-sm text-foreground text-center line-clamp-3">
                            {training.title}
                          </h3>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <CardContent className="p-2">
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{training.description}</p>
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-2">
                            <span className="font-medium">{training.totalSessions}</span>
                            <span>•</span>
                            <span>{training.latestSession}</span>
                          </div>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              onOpenVisualTraining?.(training)
                            }}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                            size="sm"
                          >
                            <Play className="w-3 h-3 mr-1" />
                            <span className="text-xs">Start Session</span>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                activeTab === "analytics" && (
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4">Analytics</h2>
                    <AnalyticsDashboard trainings={trainings} heatmapData={heatmapData} getHeatColor={getHeatColor} />
                  </div>
                )
              )}

              {activeTab === "guardrail-engine" && (
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">Guardrail Engine</h2>

                  <div className="space-y-6">
                    {/* Brand Guardrails */}
                    <Card className="border border-border">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-base font-semibold text-foreground mb-2">Brand Guardrails</h3>
                            <p className="text-sm text-muted-foreground">
                              Brand guardrails will be applied to every interaction to ensure compliance, maintain
                              consistency, and prevent unintended AI responses.
                            </p>
                          </div>
                          <Button
                            onClick={() => setShowGuardrailsEditor(true)}
                            variant="ghost"
                            size="sm"
                            className="flex-shrink-0"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="mt-4 bg-slate-950 rounded-lg p-4 max-h-96 overflow-auto">
                          <pre className="text-xs text-slate-200 font-mono whitespace-pre-wrap">{guardrailsJson}</pre>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === "pdf-to-quiz" && (
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">PDF to Quiz</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Side - Upload & Prompt */}
                    <Card className="border border-border">
                      <CardContent className="p-6 space-y-6">
                        {/* PDF Upload */}
                        <div>
                          <h3 className="text-base font-semibold text-foreground mb-3">Upload PDF Document</h3>
                          <input
                            ref={pdfInputRef}
                            type="file"
                            accept="application/pdf"
                            onChange={handlePdfFileChange}
                            className="hidden"
                          />
                          <div 
                            onClick={() => pdfInputRef.current?.click()}
                            className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                          >
                            {pdfFile ? (
                              <>
                                <FileText className="w-10 h-10 mx-auto text-primary mb-3" />
                                <p className="text-sm font-medium text-foreground mb-1">{pdfFile.name}</p>
                                <p className="text-xs text-muted-foreground">Click to change file</p>
                              </>
                            ) : (
                              <>
                                <FileText className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                                <p className="text-sm font-medium text-foreground mb-1">Drop your PDF here or click to browse</p>
                                <p className="text-xs text-muted-foreground">Supports PDF files up to 10MB</p>
                              </>
                            )}
                          </div>
                        </div>
                        
                        {/* Prompt Input */}
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Prompt</label>
                          <textarea
                            value={quizPrompt}
                            onChange={(e) => setQuizPrompt(e.target.value)}
                            placeholder="Enter instructions for quiz generation (e.g., focus on specific topics, difficulty level, etc.)"
                            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[120px] resize-none"
                          />
                        </div>
                        
                        <Button 
                          onClick={handleGenerateQuiz}
                          disabled={!pdfFile || !quizPrompt.trim() || isGeneratingQuiz}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
                        >
                          {isGeneratingQuiz ? "Generating..." : "Generate Quiz"}
                        </Button>
                      </CardContent>
                    </Card>
                    
                    {/* Right Side - Generated Questions */}
                    <Card className="border border-border">
                      <CardContent className="p-6">
                        <h3 className="text-base font-semibold text-foreground mb-4">Generated Questions</h3>
                        <div className="space-y-4">
                          {isGeneratingQuiz ? (
                            <div className="text-center py-12 text-muted-foreground">
                              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                              <p className="text-sm">Generating quiz questions...</p>
                            </div>
                          ) : generatedQuestions ? (
                            <div className="bg-muted/30 rounded-lg p-4 max-h-[400px] overflow-auto">
                              <pre className="text-sm text-foreground whitespace-pre-wrap font-sans">{generatedQuestions}</pre>
                            </div>
                          ) : (
                            <div className="text-center py-12 text-muted-foreground">
                              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                              <p className="text-sm">Upload a PDF and click Generate Quiz to see questions here</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        

        {/* Guardrails Editor Dialog */}
        <Dialog open={showGuardrailsEditor} onOpenChange={setShowGuardrailsEditor}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Edit Brand Guardrails</DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-auto">
              <Textarea
                value={guardrailsJson}
                onChange={(e) => setGuardrailsJson(e.target.value)}
                className="font-mono text-xs h-full min-h-[500px] resize-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowGuardrailsEditor(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  try {
                    JSON.parse(guardrailsJson)
                    setShowGuardrailsEditor(false)
                  } catch (e) {
                    alert("Invalid JSON format. Please fix the syntax errors.")
                  }
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Save Changes
              </Button>
            </div>
              </DialogContent>
            </Dialog>

            {/* Scenario Selection Modal */}
        {isScenarioSelectionVisible && (
          <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={onCloseScenarioSelection} />
            <Card className="border border-border shadow-lg bg-card p-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50">
              <h3 className="font-semibold text-base mb-4">Add New Coaching</h3>

              <div className="space-y-6">
                {/* Template Section */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Template</label>
                  <div className="space-y-2">
                    <Button
                      onClick={() => {
                        onCloseScenarioSelection()
                        onPredefinedScenario()
                      }}
                      variant="outline"
                      className="w-full justify-start gap-3 h-auto py-3 hover:bg-primary/5 hover:border-primary bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0"
                    >
                      <FileText className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">Pre-Defined Scenarios</div>
                        <div className="text-xs text-blue-100">Choose from 30+ ready scenarios</div>
                      </div>
                    </Button>
                    <Button
                      onClick={() => {
                        onCloseScenarioSelection()
                        onCustomScenario()
                      }}
                      variant="outline"
                      className="w-full justify-start gap-3 h-auto py-3 hover:bg-primary/5 hover:border-primary bg-gradient-to-r from-pink-500 to-pink-600 text-white border-0"
                    >
                      <Sparkles className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">Custom Build Scenarios</div>
                        <div className="text-xs text-pink-100">Build your own coaching</div>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Cancel Button */}
                <Button onClick={onCloseScenarioSelection} variant="ghost" size="sm" className="w-full">
                  Cancel
                </Button>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}

function AnalyticsDashboard({
  trainings,
  heatmapData,
  getHeatColor,
}: { trainings: Training[]; heatmapData: any; getHeatColor: any }): ReactElement {
  const [selectedUserId, setSelectedUserId] = React.useState<string>("")
  
  
  const totalSessions = trainings.reduce((sum, t) => sum + t.totalSessions, 0)
  const totalTrainings = trainings.length

  const sharedTrainings = [
    {
      id: "1",
      userId: "user-001",
      userName: "Sarah Johnson",
      email: "sarah.johnson@indegene.com",
      training: "Patient-Centred Pathways to PulmoNexa",
      attended: true,
      progress: 85,
      lastAccessed: "2024-01-28",
      sessionsCompleted: 3,
      totalTimeSpent: 145,
      improvementScore: 24,
      featuresUsed: ["Audio Coaching", "Visual Coaching", "Post Call Analysis"],
      feedbackSummary: "Sarah demonstrated excellent communication skills and effectively addressed patient concerns. Her ability to explain complex medical information in simple terms was particularly impressive. Areas for improvement include pacing during objection handling.",
    },
    {
      id: "2",
      userId: "user-002",
      userName: "Michael Chen",
      email: "michael.chen@indegene.com",
      training: "HCP Training",
      attended: true,
      progress: 92,
      lastAccessed: "2024-01-27",
      sessionsCompleted: 5,
      totalTimeSpent: 210,
      improvementScore: 32,
      featuresUsed: ["Audio Coaching", "Scenario Testing", "Create Persona"],
      feedbackSummary: "Michael shows strong clinical knowledge and confidently handles technical questions from HCPs. His presentation style is professional and engaging. Recommend focusing on building rapport earlier in conversations.",
    },
    {
      id: "3",
      userId: "user-003",
      userName: "Emily Rodriguez",
      email: "emily.rodriguez@indegene.com",
      training: "Specialist Objection-Handling Simulation",
      attended: false,
      progress: 0,
      lastAccessed: "Never",
      sessionsCompleted: 0,
      totalTimeSpent: 0,
      improvementScore: 0,
      featuresUsed: [],
      feedbackSummary: "No feedback available yet. Emily has not started this training session.",
    },
    {
      id: "4",
      userId: "user-004",
      userName: "David Kim",
      email: "david.kim@indegene.com",
      training: "Patient-Centred Pathways to PulmoNexa",
      attended: true,
      progress: 67,
      lastAccessed: "2024-01-26",
      sessionsCompleted: 2,
      totalTimeSpent: 78,
      improvementScore: 15,
      featuresUsed: ["Visual Coaching", "Post Call Analysis"],
      feedbackSummary: "David is making good progress in understanding patient-centered communication. He shows improvement in active listening skills. Should continue practicing responses to common patient objections.",
    },
    {
      id: "5",
      userId: "user-005",
      userName: "Lisa Wang",
      email: "lisa.wang@indegene.com",
      training: "Product Pitch Training",
      attended: true,
      progress: 78,
      lastAccessed: "2024-01-28",
      sessionsCompleted: 4,
      totalTimeSpent: 165,
      improvementScore: 28,
      featuresUsed: ["Audio Coaching", "Visual Coaching", "Guardrail Engine"],
      feedbackSummary: "Lisa excels at product positioning and value proposition delivery. Her pitch structure is clear and compelling. Continue working on handling unexpected questions and maintaining confidence under pressure.",
    },
    {
      id: "6",
      userId: "user-001",
      userName: "Sarah Johnson",
      email: "sarah.johnson@indegene.com",
      training: "Compliance Training",
      attended: false,
      progress: 0,
      lastAccessed: "Never",
      sessionsCompleted: 0,
      totalTimeSpent: 0,
      improvementScore: 0,
      featuresUsed: [],
      feedbackSummary: "Training not yet started. Compliance training is scheduled for next week.",
    },
  ]

  const trainingGroups = sharedTrainings.reduce(
    (acc, item) => {
      if (!acc[item.training]) {
        acc[item.training] = []
      }
      acc[item.training].push(item)
      return acc
    },
    {} as Record<string, typeof sharedTrainings>,
  )

  const [searchQuery, setSearchQuery] = useState("")
  const [expandedTrainings, setExpandedTrainings] = useState<Set<string>>(new Set())

  const toggleTraining = (trainingName: string) => {
    const newExpanded = new Set(expandedTrainings)
    if (newExpanded.has(trainingName)) {
      newExpanded.delete(trainingName)
    } else {
      newExpanded.add(trainingName)
    }
    setExpandedTrainings(newExpanded)
  }

  const filteredTrainingGroups = Object.entries(trainingGroups).filter(([trainingName, users]) => {
    const searchLower = searchQuery.toLowerCase()
    const trainingMatches = trainingName.toLowerCase().includes(searchLower)
    const userMatches = users.some(
      (user) => user.userName.toLowerCase().includes(searchLower) || user.email.toLowerCase().includes(searchLower),
    )
    return trainingMatches || userMatches
  })

  const attendedCount = sharedTrainings.filter((st) => st.attended).length
  const totalShared = 5
  const attendanceRate = totalShared > 0 ? Math.round((attendedCount / totalShared) * 100) : 0
  const uniqueUsers = Array.from(new Set(sharedTrainings.map((st) => st.userId))).length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border border-border">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Users</div>
            <div className="text-3xl font-bold text-foreground">{uniqueUsers}</div>
            <div className="text-xs text-muted-foreground mt-1">Active learners</div>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Trainings Shared</div>
            <div className="text-3xl font-bold text-foreground">{totalShared}</div>
            <div className="text-xs text-muted-foreground mt-1">Across all users</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Shared Trainings & User Progress</h3>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search user or training..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            {filteredTrainingGroups.map(([trainingName, users]) => {
              const isExpanded = expandedTrainings.has(trainingName)
              const totalUsers = users.length
              const attendedUsers = users.filter((u) => u.attended).length
              const totalDuration = users.reduce((sum, u) => sum + u.totalTimeSpent, 0)
              const avgDuration = Math.round(totalDuration / users.length)
              const durationDisplay = avgDuration > 60
                ? `${Math.floor(avgDuration / 60)}h ${avgDuration % 60}m`
                : `${avgDuration}m`

              return (
                <div key={trainingName} className="border border-border rounded-lg overflow-hidden">
                  {/* Training Header - Clickable */}
                  <button
                    onClick={() => toggleTraining(trainingName)}
                    className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <ChevronRight
                        className={`h-5 w-5 text-muted-foreground transition-transform ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                      />
                      <div className="text-left">
                        <div className="text-sm font-semibold text-foreground">{trainingName}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {totalUsers} user{totalUsers !== 1 ? "s" : ""} assigned • {attendedUsers} attended • Avg
                          duration: {durationDisplay}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* User Details - Expandable */}
                  {isExpanded && (
                    <div className="border-t border-border">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/20 border-b border-border">
                            <th className="text-left py-2 px-4 text-xs font-semibold text-foreground">User</th>
                            <th className="text-center py-2 px-4 text-xs font-semibold text-foreground">Attended</th>
                            <th className="text-center py-2 px-4 text-xs font-semibold text-foreground">Session Duration</th>
                            <th className="text-center py-2 px-4 text-xs font-semibold text-foreground">Sessions</th>
                            <th className="text-left py-2 px-4 text-xs font-semibold text-foreground">Last Accessed</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => {
                            const userDuration = user.totalTimeSpent > 60
                              ? `${Math.floor(user.totalTimeSpent / 60)}h ${user.totalTimeSpent % 60}m`
                              : `${user.totalTimeSpent}m`
                            return (
                              <tr key={user.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20">
                                <td className="py-2 px-4">
                                  <div>
                                    <div className="text-sm font-medium text-foreground">{user.userName}</div>
                                    <div className="text-xs text-muted-foreground">{user.email}</div>
                                  </div>
                                </td>
                                <td className="py-2 px-4 text-center">
                                  {user.attended ? (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                      Yes
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                                      No
                                    </span>
                                  )}
                                </td>
                                <td className="py-2 px-4 text-center">
                                  <span className="text-sm font-medium text-foreground">{userDuration}</span>
                                </td>
                                <td className="py-2 px-4 text-center">
                                  <span className="text-sm font-medium text-foreground">{user.sessionsCompleted}</span>
                                </td>
                                <td className="py-2 px-4">
                                  <span className="text-xs text-muted-foreground">{user.lastAccessed}</span>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border">
        <CardContent className="p-0">
          {(() => {
            const uniqueUsersData = sharedTrainings.reduce((acc, item) => {
              if (!acc[item.userId]) {
                acc[item.userId] = {
                  userName: item.userName,
                  email: item.email,
                  totalSessions: 0,
                  totalTimeSpent: 0,
                  highestScore: 0,
                  latestImprovement: 0,
                  sessionsDetails: [] as { name: string; attended: number; timeSpent: number; score: number; feedbackSummary: string }[],
                }
              }
              acc[item.userId].totalSessions += item.sessionsCompleted
              acc[item.userId].totalTimeSpent += item.totalTimeSpent
              if (item.improvementScore > acc[item.userId].highestScore) {
                acc[item.userId].highestScore = item.improvementScore
              }
              acc[item.userId].latestImprovement = item.improvementScore
              
              acc[item.userId].sessionsDetails.push({
                name: item.training,
                attended: item.sessionsCompleted,
                timeSpent: item.totalTimeSpent,
                score: item.improvementScore,
                feedbackSummary: item.feedbackSummary,
              })
              
              return acc
            }, {} as Record<string, { userName: string; email: string; totalSessions: number; totalTimeSpent: number; highestScore: number; latestImprovement: number; sessionsDetails: { name: string; attended: number; timeSpent: number; score: number; feedbackSummary: string }[] }>)

            const usersList = Object.entries(uniqueUsersData)
            const currentUserId = selectedUserId || (usersList.length > 0 ? usersList[0][0] : "")
            const selectedUser = currentUserId ? uniqueUsersData[currentUserId] : null

            return (
              <>
                {/* Card Header */}
                <div className="flex items-center justify-between p-6 pb-0">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">User Engagement Analytics</h3>
                    <p className="text-sm text-muted-foreground mt-1">Track rep usage and improvement metrics</p>
                  </div>
                  <select
                    value={currentUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    className="px-4 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-w-[200px]"
                  >
                    {usersList.map(([userId, data]) => (
                      <option key={userId} value={userId}>
                        {data.userName}
                      </option>
                    ))}
                  </select>
                </div>
                
                
                {/* Content */}
                <div className="p-6">
                  {!selectedUser ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="text-sm">No users available.</p>
                    </div>
                  ) : (
                    <div className="border border-border rounded-lg p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">
                            {selectedUser.userName.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{selectedUser.userName}</h4>
                          <p className="text-xs text-muted-foreground">{selectedUser.email}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-muted/30 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">Times Attended</p>
                          <p className="text-lg font-bold text-foreground">{selectedUser.totalSessions}</p>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">Total Time</p>
                          <p className="text-lg font-bold text-foreground">
                            {selectedUser.totalTimeSpent > 60
                              ? `${Math.floor(selectedUser.totalTimeSpent / 60)}h ${selectedUser.totalTimeSpent % 60}m`
                              : `${selectedUser.totalTimeSpent}m`}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Assigned Sessions</h4>
                        <div className="space-y-2">
                          {selectedUser.sessionsDetails.map((session, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-muted/30 rounded-md p-2.5">
                              <span className="text-sm text-foreground truncate flex-1 mr-2">{session.name}</span>
                              <div className="flex items-center gap-3 text-xs">
                                <span className="text-muted-foreground">{session.attended}x</span>
                                <span className="text-muted-foreground">{session.timeSpent}m</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )
          })()}
        </CardContent>
      </Card>
    </div>
  )
}
