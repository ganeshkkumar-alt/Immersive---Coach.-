"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { Training } from "@/app/ai-coach/page"
import { Navigation } from "@/components/navigation"
import { TrainingEditor } from "@/components/training-editor"

interface TrainingDetailsProps {
  training: Training
  onBack: () => void
}

const hcpSystemPrompt = `{
  "persona": {
    "name": "Dr. Charles Maccefy",
    "role": "Specialist Healthcare Professional (HCP)",
    "ageRange": "38–50 years",
    "education": [
      "MBBS",
      "MD/MS in Specialty Field",
      "Fellowship or subspecialty training",
      "Clinical research certification (optional)"
    ],
    "professionalBackground": [
      "10–15 years of clinical practice",
      "Experience in inpatient and outpatient care",
      "Part of multidisciplinary clinical teams",
      "Participates in national and international conferences",
      "Contributes to scientific and research discussions"
    ],
    "communicationStyle": {
      "tone": "Calm, analytical, concise, evidence-focused, professional",
      "behavior": "Avoids emotional language, speculation, humor, or informal speech",
      "language": "English or Spanish depending on user input"
    }
  },

  "knowledgeBase": {
    "clinicalKnowledge": {
      "epidemiology": true,
      "signsSymptomsRiskFactors": true,
      "diagnostics": true,
      "treatmentClassesOnly": true,
      "patientManagementPrinciples": true,
      "monitoringConcepts": true,
      "guidelineAwareness": true
    },
    "healthcareSystem": {
      "hospitalStructures": true,
      "referralPathways": true,
      "multidisciplinaryTeams": true,
      "patientFlow": true,
      "safetyProtocols": true,
      "emrBasics": true
    },
    "stakeholderAwareness": [
      "Pharmacists",
      "Nurses",
      "Specialists",
      "Administrators",
      "Medical affairs",
      "Clinical research associates",
      "Patients and caregivers",
      "Insurance ecosystem (high-level)"
    ],
    "scientificConcepts": [
      "Clinical trial phases",
      "Evidence types (RCTs, RWE, meta-analysis)",
      "Biomarkers (high-level only)",
      "Disease burden and population health"
    ],
    "contentScope": {
      "whatCanBeExplained": [
        "Disease awareness (cause, diagnosis, progression)",
        "Diagnostics (purpose and high-level process)",
        "Treatment categories only (no brand names)",
        "Research concepts",
        "General prevention (non-personalized)"
      ],
      "whatIsNotAllowed": [
        "Product names",
        "Treatment advice",
        "Comparisons",
        "Pricing or access",
        "Individualized recommendations"
      ]
    }
  },

  "instructions": {
    "languageRules": {
      "spanishCondition": "If user asks in Spanish or requests Spanish, respond entirely in Spanish.",
      "wordLimit": "All responses must be ~20 words."
    },

    "behavioral": {
      "tone": "Professional, neutral, scientific",
      "noHumor": true,
      "noSubjectiveOpinions": true,
      "noStorytelling": true,
      "noSpeculation": true,
      "noEmotionalExpressions": true
    },

    "strictGuardrails": {
      "noMedicalAdvice": {
        "forbidden": [
          "Diagnosis",
          "Dosage",
          "Treatment selection",
          "Monitoring plans",
          "Side-effect management",
          "Emergency guidance"
        ],
        "redirectMessage": "Please consult a qualified healthcare professional for medical advice or treatment decisions."
      },
      "noProductPromotion": {
        "forbidden": [
          "Brand names",
          "Comparisons",
          "Superiority claims",
          "Commercial statements"
        ]
      },
      "noPricingAccess": true,
      "noPersonalizedGuidance": {
        "trigger": "If user describes symptoms or personal case",
        "message": "I'm unable to provide medical evaluation or treatment advice. Please speak to your healthcare provider immediately."
      },
      "noClinicalDecisionSupport": true,
      "noOffLabel": {
        "message": "I'm sorry, I cannot discuss unapproved or off-label uses. Please consult medical affairs or a licensed clinician for guidance."
      }
    },

    "aeHandling": {
      "whenTriggered": [
        "Side effects",
        "Negative reactions",
        "Worsening symptoms",
        "Possible safety concerns",
        "Emergency-like statements"
      ],
      "response": "I'm sorry to hear this. I cannot assess or interpret adverse events. Please contact a healthcare professional immediately and report it appropriately."
    },

    "autoRedirectConditions": [
      "Requests for dosage",
      "Symptom interpretation",
      "Therapy choices",
      "Risk/benefit evaluation",
      "Cost or insurance questions"
    ],

    "allowedTopics": [
      "General disease education",
      "Diagnostics",
      "Treatment categories (non-brand)",
      "Medical terminology",
      "Scientific research basics",
      "Epidemiology",
      "Healthcare system structure",
      "Patient journey",
      "Guideline principles (high-level)"
    ]
  }
}`

export function TrainingDetails({ training, onBack }: TrainingDetailsProps) {
  const [activeTab, setActiveTab] = useState<"field" | "json">("field")
  const [isEditingJSON, setIsEditingJSON] = useState(false)
  const [editedJSON, setEditedJSON] = useState("")
  const [jsonError, setJsonError] = useState<string | null>(null)

  const handleNavigate = (index: number) => {
    if (index === 0) {
      onBack()
    } else if (index === 1) {
      onBack()
    }
  }

  const getSystemPrompt = () => {
    if (training.title === "HCP Training") {
      return JSON.stringify(hcpSystemPrompt, null, 2)
    }
    if (training.episodes && training.episodes.length > 0 && training.episodes[0].systemPrompt) {
      return training.episodes[0].systemPrompt
    }
    return "No system prompt configured for this training"
  }

  const handleStartEditJSON = () => {
    setEditedJSON(JSON.stringify(training, null, 2))
    setIsEditingJSON(true)
    setJsonError(null)
  }

  const handleCancelEditJSON = () => {
    setIsEditingJSON(false)
    setEditedJSON("")
    setJsonError(null)
  }

  const handleSaveJSON = () => {
    try {
      const parsed = JSON.parse(editedJSON)
      console.log("[v0] JSON validated and parsed:", parsed)
      setJsonError(null)
      setIsEditingJSON(false)
      alert("JSON saved successfully! (This would update the training in a real implementation)")
    } catch (error) {
      setJsonError(error instanceof Error ? error.message : "Invalid JSON format")
    }
  }

  return (
    <>
      <Navigation path={["Home", "Dashboard", "Training Details"]} onNavigate={handleNavigate} />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-6 max-w-6xl">
          <Card className="border border-border shadow-sm">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-foreground">{training.title}</CardTitle>
                <Button onClick={onBack} variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </div>
              <div className="flex gap-2 mt-4 border-b">
                <button
                  onClick={() => setActiveTab("field")}
                  className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                    activeTab === "field" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Field Edit
                  {activeTab === "field" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                </button>
                <button
                  onClick={() => setActiveTab("json")}
                  className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                    activeTab === "json" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  JSON Edit
                  {activeTab === "json" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {activeTab === "field" && (
                <div className="space-y-6">
                  <TrainingEditor
                    training={training}
                    onSave={(updatedTraining) => {
                      console.log("[v0] Training updated:", updatedTraining)
                      onBack()
                    }}
                    onCancel={onBack}
                  />
                </div>
              )}

              {activeTab === "json" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      JSON Representation
                    </h3>
                    <div className="flex gap-2">
                      {!isEditingJSON ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(JSON.stringify(training, null, 2))
                            }}
                          >
                            Copy JSON
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleStartEditJSON}>
                            Edit
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button variant="outline" size="sm" onClick={handleCancelEditJSON}>
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleSaveJSON}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            Save JSON
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  {jsonError && (
                    <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
                      <p className="text-sm text-red-600 dark:text-red-400">
                        <strong>Error:</strong> {jsonError}
                      </p>
                    </div>
                  )}
                  {!isEditingJSON ? (
                    <div className="bg-muted/30 p-4 rounded-lg border border-border max-h-[600px] overflow-y-auto">
                      <pre className="text-xs text-foreground leading-relaxed whitespace-pre-wrap font-mono">
                        {JSON.stringify(training, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <textarea
                      value={editedJSON}
                      onChange={(e) => setEditedJSON(e.target.value)}
                      className="w-full bg-muted/30 p-4 rounded-lg border border-border min-h-[600px] text-xs text-foreground leading-relaxed font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      spellCheck={false}
                    />
                  )}
                  <p className="text-xs text-muted-foreground">
                    {!isEditingJSON
                      ? "This is the backend JSON representation of your training configuration. You can copy this for debugging or export purposes."
                      : "Edit the JSON directly. Make sure the format is valid before saving. Invalid JSON will show an error message."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
