"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Users, Building2, Plus, Sparkles, Stethoscope, Info, X } from "lucide-react"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface PredefinedScenariosProps {
  onBack: () => void
  onAddScenario: (scenarioTitle: string) => void
}

const productTrainingScenarios = [
  {
    id: "pt1",
    title: "HCP Questions AI Accuracy & Reliability",
    description:
      "A hospital/enterprise HCP challenges your AI model's inconsistent results and demands proof of accuracy and validation.",
  },
  {
    id: "pt2",
    title: "Delay in Delivering an AI Feature Update",
    description:
      "Your HCP is frustrated because a promised AI feature (e.g., summarization, risk scoring, agent workflow) wasn't delivered on time.",
  },
  {
    id: "pt3",
    title: "AI Product Demo Didn't Go Well",
    description:
      "During an HCP demo, the AI chatbot/agent produced incorrect answers and the HCP now doubts product maturity.",
  },
  {
    id: "pt4",
    title: "HCP Wants Custom AI Model Training",
    description:
      "A large enterprise requests a fully customized model fine-tuned on their data, but your team isn't sure it's feasible or within scope.",
  },
  {
    id: "pt5",
    title: "Data Privacy Concern After AI Usage",
    description:
      "The HCP raises concerns about how their data is stored, processed, or used by your AI system and demands clarification immediately.",
  },
]

const clientFacingScenarios = [
  {
    id: "1",
    title: "Brand Manager Presenting New Marketing Strategy to a Key HCP",
    description: "A hospital chain wants stronger justification for your brand's new positioning.",
  },
  {
    id: "2",
    title: "HCP Demands Better ROI on Marketing Activities",
    description: "A major healthcare HCP questions the effectiveness of your awareness campaigns.",
  },
  {
    id: "3",
    title: "Delay in Delivering Marketing Materials",
    description: "A physician network is upset because your patient education kits arrived late.",
  },
  {
    id: "4",
    title: "Digital Campaign Underperformed",
    description: "A clinic partner challenges the low engagement of the awareness campaign you ran.",
  },
  {
    id: "5",
    title: "Pricing Negotiation for a Long-Term Contract",
    description: "A corporate hospital wants big discounts before renewing your annual agreement.",
  },
  {
    id: "6",
    title: "Competitor's Campaign Outperformed Yours",
    description: "HCP asks why your brand's outreach campaign didn't match a rival's success.",
  },
  {
    id: "7",
    title: "HCP Wants Custom Marketing Support",
    description: "Hospital demands exclusive marketing events only for their doctors.",
  },
  {
    id: "8",
    title: "Miscommunication About Brand Claims",
    description: "HCP accuses the marketing team of overstating product benefits.",
  },
  {
    id: "9",
    title: "Patient Support Program Concerns",
    description: "HCP says your PSP hotline isn't responsive enough, affecting patient adherence.",
  },
  {
    id: "10",
    title: "Request for Unapproved Promotional Materials",
    description: "HCP pushes for marketing materials beyond compliance guidelines — you must refuse diplomatically.",
  },
]

const corporateInternalScenarios = [
  {
    id: "11",
    title: "Marketing Team Not Aligning with Sales",
    description: "Sales complains marketing isn't providing the right tools for field execution.",
  },
  {
    id: "12",
    title: "Cross-functional Meeting Conflict",
    description: "Medical, regulatory, and marketing teams disagree on campaign messaging.",
  },
  {
    id: "13",
    title: "Product Manager Rejects Your Campaign Idea",
    description: "Internal feedback that your creative proposal doesn't meet brand strategy.",
  },
  {
    id: "14",
    title: "Delay in Approvals",
    description: "Regulatory delays force the marketing team to postpone the launch.",
  },
  {
    id: "15",
    title: "Budget Cut Discussion",
    description: "Leadership informs the marketing team about reduced campaign budget.",
  },
  {
    id: "16",
    title: "Conflict Between Brand & Digital Teams",
    description: "Digital team says brand team is not giving timely content inputs.",
  },
  {
    id: "17",
    title: "Performance Review Conversation",
    description: "Your manager gives tough feedback on last quarter's execution.",
  },
  {
    id: "18",
    title: "Marketing Team Needs to Justify Spend",
    description: "Finance demands justification for the brand's high marketing expenditure.",
  },
  {
    id: "19",
    title: "Internal PPT Approval Goes Wrong",
    description: "Leadership rejects your strategy deck 30 minutes before the meeting.",
  },
  {
    id: "20",
    title: "Product Launch Readiness Gaps",
    description: "Internal audit shows lack of training, materials, or alignment before an upcoming launch.",
  },
]

const hcpEngagementScenarios = [
  {
    id: "hcp1",
    title: "HCP Questions Clinical Evidence Behind an Oncology Treatment Approach",
    description:
      "An oncology HCP challenges the scientific rationale and evidence supporting a general treatment approach in oncology (e.g., sequencing, biomarker relevance, response variability) and requests stronger clarity on the supporting clinical principles.",
  },
  {
    id: "hcp2",
    title: "HCP Seeks Clarity on Updated Cardiology Guidelines",
    description:
      "A cardiology HCP expresses confusion about a recent update in high-level treatment guidelines and requests a clearer scientific explanation.",
  },
  {
    id: "hcp3",
    title: "HCP Challenges Explanation of Disease Progression Pathways",
    description:
      "An immunology HCP doubts the explanation shared about disease progression mechanisms and asks for deeper, evidence-based reasoning.",
  },
  {
    id: "hcp4",
    title: "HCP Questions Diagnostic Workflow for Neurological Disorders",
    description:
      "A neurology HCP challenges the suggested diagnostic workflow and wants clarification on why specific assessments are important.",
  },
]

const clinicalCoachingFrameworks = [
  {
    id: "ccf1",
    title: "ACHE Model",
    description: "Used for objection handling by validating concerns and guiding subtle behavioural change.",
  },
  {
    id: "ccf2",
    title: "OARS",
    description: "Helps with deep discovery conversations and understanding patient adherence challenges.",
  },
  {
    id: "ccf3",
    title: "LEAP",
    description: "Supports empathy-driven interactions and builds trust when addressing objections.",
  },
  {
    id: "ccf4",
    title: "GROW Model",
    description: "Enables structured clinical coaching to improve decision-making and optimise outcomes.",
  },
  {
    id: "ccf5",
    title: "FRAME Model",
    description: "Provides evidence-based alignment and motivates HCPs with factual, guideline-linked insights.",
  },
  {
    id: "ccf6",
    title: "PEARLS",
    description: "Builds strong relationships and enhances rapport with HCPs through empathy and support.",
  },
]

const clinicalCoachingFrameworkDetails = {
  "ACHE Model": {
    fullForm: ["Acknowledge", "Curiosity", "Highlight Value", "Empower"],
    usefulFor: [
      "Overcoming HCP objections to new treatments",
      "Driving interest in updated guidelines",
      "Encouraging HCPs to reconsider routine prescribing habits",
      "Soft persuasive communication without pushing",
      "Initiating clinical behaviour change in a respectful way",
    ],
  },
  OARS: {
    fullForm: ["Open-ended questions", "Affirmations", "Reflections", "Summaries"],
    usefulFor: [
      "Deep discovery in field-force → HCP conversations",
      "Understanding clinical decision-making patterns",
      "Addressing patient adherence barriers",
      "Improving quality of patient counselling (support material, disease education)",
      "Creating non-promotional, evidence-based dialogue",
    ],
  },
  LEAP: {
    fullForm: ["Listen", "Empathize", "Agree", "Partner"],
    usefulFor: [
      "Handling tough HCP objections (cost, efficacy doubts, experience bias)",
      "Maintaining relationship even when HCP rejects the brand",
      "Creating collaborative discussions for treatment optimisation",
      "Enabling partner-like engagement vs. transactional sales",
    ],
  },
  "GROW Model": {
    fullForm: ["Goal", "Reality", "Options", "Will (or Way Forward)"],
    usefulFor: [
      "HCP education discussions (asthma control, diabetes HbA1c improvement, COPD management)",
      "Helping HCPs work towards better patient outcomes",
      "Structuring medical rep → doctor consultative conversations",
      "Motivating HCPs to move towards optimal treatment approaches",
    ],
  },
  "FRAME Model": {
    fullForm: ["Facts", "Reflect", "Align", "Motivate", "Empower"],
    usefulFor: [
      "Evidence-based medical communication",
      "Presenting new clinical data without being promotional",
      "Aligning treatment decisions with guidelines + patient needs",
      "Motivating HCPs to try small practice changes",
      "Very effective for new product launches & guideline updates",
    ],
  },
  PEARLS: {
    fullForm: ["Partnership", "Empathy", "Apology", "Respect", "Legitimisation", "Support"],
    usefulFor: [
      "Building long-term trust with conservative doctors",
      "Handling emotionally tense or skeptical HCP interactions",
      "Strengthening the rep–HCP relationship",
      "Supporting patient-centric dialogues",
      "Assisting HCPs who feel overwhelmed or resistant to change",
    ],
  },
}

const frameworkSystemPrompts: Record<string, any> = {
  "ACHE Model": {
    name: "ACHE_Model_Coach",
    role: "AI Coach for Pharma–HCP communication using ACHE model",
    objective: "Help users acknowledge concerns, explore with curiosity, highlight value, and empower next steps.",
    framework: {
      A: "Acknowledge – Validate the HCP's view respectfully.",
      C: "Curiosity – Ask exploratory, non-leading questions.",
      H: "Highlight Value – Share guideline-based insights without promotion.",
      E: "Empower – Suggest a small, comfortable next step.",
    },
    guidelines: [
      "Use a calm, consultative tone.",
      "Keep language evidence-based and unbiased.",
      "Avoid pushy or promotional behaviour.",
      "Guide subtly, never impose.",
    ],
    avoid: ["No arguing or challenging authority.", "No aggressive recommendations.", "No dismissing HCP concerns."],
  },
  OARS: {
    name: "OARS_Model_Coach",
    role: "AI Coach using OARS motivational interviewing for pharma communication.",
    objective: "Help users enhance discovery, empathy, and understanding in HCP conversations.",
    framework: {
      O: "Open-ended Questions – Encourage deeper exploration.",
      A: "Affirmations – Validate the HCP's intentions and efforts.",
      R: "Reflections – Mirror emotions or key points neutrally.",
      S: "Summaries – Consolidate important insights.",
    },
    guidelines: [
      "Prioritise understanding the reasoning behind decisions.",
      "Use supportive and patient-centric language.",
      "Encourage dialogue rather than giving answers directly.",
    ],
    avoid: ["No leading questions.", "No judgemental tone.", "No dismissive responses."],
  },
  LEAP: {
    name: "LEAP_Model_Coach",
    role: "AI Coach specialised in objection-handling using the LEAP model.",
    objective: "Support users in managing HCP resistance while preserving trust and collaboration.",
    framework: {
      L: "Listen – Capture the concern in neutral words.",
      E: "Empathize – Show understanding of the doctor's experience.",
      A: "Agree – Identify common ground or shared truth.",
      P: "Partner – Suggest a collaborative step forward.",
    },
    guidelines: [
      "Use warm, human, and empathetic tone.",
      "Focus on relationship maintenance.",
      "Offer partnership-based suggestions.",
    ],
    avoid: ["Avoid contradicting the doctor directly.", "Avoid pushiness.", "Avoid technical overload."],
  },
  "GROW Model": {
    name: "GROW_Model_Coach",
    role: "AI Coach guiding structured clinical coaching using the GROW model.",
    objective: "Help users support HCPs in clinical reasoning, treatment thinking, and patient outcome improvement.",
    framework: {
      G: "Goal – Clarify target clinical outcomes or objectives.",
      R: "Reality – Explore current practice, barriers, or patient challenges.",
      O: "Options – Identify evidence-supported possibilities.",
      W: "Will / Way Forward – Define a small, realistic next step.",
    },
    guidelines: [
      "Stay neutral and non-promotional.",
      "Facilitate reflection with thoughtful questions.",
      "Help HCPs self-identify improvements.",
    ],
    avoid: ["Do not dictate clinical goals.", "Do not overload with options.", "Do not recommend specific treatments."],
  },
  "FRAME Model": {
    name: "FRAME_Model_Coach",
    role: "AI Coach for evidence-based alignment using the FRAME model.",
    objective: "Help users present clinical facts, align with HCP priorities, and motivate subtle improvements.",
    framework: {
      F: "Facts – Provide neutral, guideline-driven information.",
      R: "Reflect – Show understanding of HCP perspective.",
      A: "Align – Connect evidence to the HCP's goals.",
      M: "Motivate – Highlight patient-benefit opportunities.",
      E: "Empower – Suggest simple, low-effort next steps.",
    },
    guidelines: [
      "Stay factual and balanced.",
      "Use bridging language to reduce resistance.",
      "Keep patient benefit central.",
    ],
    avoid: ["No competitive claims.", "No strong persuasive tone.", "No exaggerated clinical data."],
  },
  PEARLS: {
    name: "PEARLS_Model_Coach",
    role: "AI Coach for relationship-building using the PEARLS communication framework.",
    objective: "Help users strengthen trust and rapport in pharma–HCP conversations.",
    framework: {
      P: "Partnership – Position as a collaborative partner.",
      E: "Empathy – Acknowledge emotions or challenges.",
      A: "Apology – Apologize briefly when needed to maintain comfort.",
      R: "Respect – Highlight the HCP's expertise.",
      L: "Legitimise – Validate the concern or reasoning.",
      S: "Support – Provide reassurance and helpful guidance.",
    },
    guidelines: [
      "Use warm, supportive, respectful language.",
      "Prioritize long-term relationship over short-term outcomes.",
      "Be patient-centric at all times.",
    ],
    avoid: [
      "Avoid authoritative or technical tone unless necessary.",
      "Avoid minimising concerns.",
      "Avoid transactional conversation style.",
    ],
  },
}

export function PredefinedScenarios({ onBack, onAddScenario }: PredefinedScenariosProps) {
  const [showCustomAIForm, setShowCustomAIForm] = useState(false)
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null)
  const [customAIFormData, setCustomAIFormData] = useState({
    productName: "",
    pdfFile: null as File | null,
    webUrl: "",
    systemPrompt: "",
  })

  const [showTrainedScenarios, setShowTrainedScenarios] = useState(false)
  const [isEditingConversations, setIsEditingConversations] = useState(false)
  const [conversations, setConversations] = useState([
    {
      id: 1,
      user: "Hello doctor...",
      response:
        "Hello, I'm Dr. Charles Maccefy. I provide high-level, non-promotional medical information. Please consult a qualified professional for personal medical guidance.",
    },
    {
      id: 2,
      user: "What are common oncology treatment approaches?",
      response:
        "Oncology typically involves surgery, radiotherapy, and systemic therapies, each applied based on tumor characteristics and multidisciplinary guideline-aligned evaluations.",
    },
    {
      id: 3,
      user: "How do systemic therapies generally function?",
      response:
        "Systemic therapies act throughout the body, targeting biological pathways involved in tumor behavior, under structured clinical monitoring and multidisciplinary oversight.",
    },
    {
      id: 4,
      user: "Why is radiotherapy used in cancer?",
      response:
        "Radiotherapy delivers controlled energy to damage malignant cells, supporting localized disease control within established oncology protocols and safety frameworks.",
    },
    {
      id: 5,
      user: "What guides treatment category selection?",
      response:
        "Treatment categories depend on tumor type, disease stage, molecular features, and multidisciplinary assessments aligned with evidence-based oncology principles.",
    },
    {
      id: 6,
      user: "Thank you, doctor.",
      response:
        "You're welcome. I'm here to provide high-level scientific information. For any personal concerns, please consult a licensed healthcare professional.",
    },
  ])

  const handleNavigate = (index: number) => {
    if (index === 0) {
      onBack()
    } else if (index === 1) {
      onBack()
    }
  }

  const handleAddClick = (scenarioTitle: string) => {
    if (scenarioTitle === "HCP Wants Custom AI Model Training") {
      setShowCustomAIForm(true)
    } else {
      onAddScenario(scenarioTitle)
      onBack()
    }
  }

  const handleEditOncologyScenario = () => {
    setShowTrainedScenarios(true)
  }

  const handleBuildTraining = () => {
    onAddScenario("HCP Wants Custom AI Model Training")
    setShowCustomAIForm(false)
    setCustomAIFormData({
      productName: "",
      pdfFile: null,
      webUrl: "",
      systemPrompt: "",
    })
    onBack()
  }

  const handleConversationChange = (id: number, field: "user" | "response", value: string) => {
    setConversations(conversations.map((conv) => (conv.id === id ? { ...conv, [field]: value } : conv)))
  }

  const handleFrameworkEdit = (frameworkTitle: string) => {
    setSelectedFramework(frameworkTitle)
  }

  return (
    <>
      <Navigation path={["Home", "Dashboard", "Pre-defined Scenarios"]} onNavigate={handleNavigate} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Pre-defined Scenarios</h1>
            <p className="text-muted-foreground">
              Choose from our curated collection of professional training scenarios
            </p>
          </div>

          {/* Clinical Coaching Framework Scenarios */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Stethoscope className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Clinical Coaching Framework</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clinicalCoachingFrameworks.map((framework) => (
                <Card
                  key={framework.id}
                  className="border-primary/20 hover:border-primary/50 hover:shadow-md transition-all group relative"
                >
                  <button
                    onClick={() => handleFrameworkEdit(framework.title)}
                    className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-muted/80 transition-colors"
                  >
                    <Info className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </button>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-balance group-hover:text-primary transition-colors pr-8">
                      {framework.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CardDescription className="text-sm">{framework.description}</CardDescription>
                    <Button
                      onClick={() => handleAddClick(framework.title)}
                      size="sm"
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Product Training Scenarios */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Product Training Scenarios</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {productTrainingScenarios.map((scenario) => (
                <Card
                  key={scenario.id}
                  className="border-primary/20 hover:border-primary/50 hover:shadow-md transition-all group relative"
                >
                  <button className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-muted/80 transition-colors">
                    <Info className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </button>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-balance group-hover:text-primary transition-colors pr-8">
                      {scenario.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CardDescription className="text-sm">{scenario.description}</CardDescription>
                    <Button
                      onClick={() => handleAddClick(scenario.title)}
                      size="sm"
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* HCP Engagement Scenarios */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">HCP Engagement Scenarios</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hcpEngagementScenarios.map((scenario) => (
                <Card
                  key={scenario.id}
                  className="border-primary/20 hover:border-primary/50 hover:shadow-md transition-all group relative"
                >
                  {scenario.id === "hcp1" && (
                    <button
                      onClick={handleEditOncologyScenario}
                      className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-muted/80 transition-colors"
                    >
                      <Info className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  )}
                  <CardHeader className={scenario.id === "hcp1" ? "pb-3 pr-8" : "pb-3"}>
                    <CardTitle className="text-base font-semibold text-balance group-hover:text-primary transition-colors">
                      {scenario.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CardDescription className="text-sm">{scenario.description}</CardDescription>
                    <Button
                      onClick={() => handleAddClick(scenario.title)}
                      size="sm"
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Go To Market (GTM) Scenarios */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Go To Market (GTM)</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clientFacingScenarios.map((scenario) => (
                <Card
                  key={scenario.id}
                  className="border-primary/20 hover:border-primary/50 hover:shadow-md transition-all group relative"
                >
                  <button className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-muted/80 transition-colors">
                    <Info className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </button>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-balance group-hover:text-primary transition-colors pr-8">
                      {scenario.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CardDescription className="text-sm">{scenario.description}</CardDescription>
                    <Button
                      onClick={() => handleAddClick(scenario.title)}
                      size="sm"
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Corporate Internal Scenarios */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Corporate Internal</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {corporateInternalScenarios.map((scenario) => (
                <Card
                  key={scenario.id}
                  className="border-primary/20 hover:border-primary/50 hover:shadow-md transition-all group relative"
                >
                  <button className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-muted/80 transition-colors">
                    <Info className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </button>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-balance group-hover:text-primary transition-colors pr-8">
                      {scenario.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CardDescription className="text-sm">{scenario.description}</CardDescription>
                    <Button
                      onClick={() => handleAddClick(scenario.title)}
                      size="sm"
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Custom AI Model Training Form Modal */}
          {showCustomAIForm && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowCustomAIForm(false)}
            >
              <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <CardHeader className="border-b">
                  <CardTitle className="text-xl">Custom AI Model Training</CardTitle>
                  <CardDescription>Configure your custom AI model training parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="productName" className="text-sm font-medium">
                      Product Name
                    </Label>
                    <Input
                      id="productName"
                      placeholder="Enter product name"
                      value={customAIFormData.productName}
                      onChange={(e) => setCustomAIFormData({ ...customAIFormData, productName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pdfFile" className="text-sm font-medium">
                      PDF Document
                    </Label>
                    <Input
                      id="pdfFile"
                      type="file"
                      accept=".pdf"
                      onChange={(e) =>
                        setCustomAIFormData({
                          ...customAIFormData,
                          pdfFile: e.target.files?.[0] || null,
                        })
                      }
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">Upload training materials in PDF format</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="webUrl" className="text-sm font-medium">
                      Web URL
                    </Label>
                    <Input
                      id="webUrl"
                      type="url"
                      placeholder="https://example.com/training-materials"
                      value={customAIFormData.webUrl}
                      onChange={(e) => setCustomAIFormData({ ...customAIFormData, webUrl: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">Link to online training resources</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="systemPrompt" className="text-sm font-medium">
                      System Prompt
                    </Label>
                    <Textarea
                      id="systemPrompt"
                      placeholder="Enter custom system prompt for AI behavior..."
                      value={customAIFormData.systemPrompt}
                      onChange={(e) => setCustomAIFormData({ ...customAIFormData, systemPrompt: e.target.value })}
                      className="min-h-[150px] resize-y"
                    />
                    <p className="text-xs text-muted-foreground">Define how the AI should respond and behave</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleBuildTraining}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      Build Training
                    </Button>
                    <Button variant="outline" onClick={() => setShowCustomAIForm(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Trained Scenarios Dialog */}
          {showTrainedScenarios && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowTrainedScenarios(false)}
            >
              <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Trained Scenarios</CardTitle>
                      <CardDescription>
                        HCP Questions Clinical Evidence Behind an Oncology Treatment Approach
                      </CardDescription>
                    </div>
                    <button
                      onClick={() => setIsEditingConversations(!isEditingConversations)}
                      className="p-2 rounded-md hover:bg-muted/80 transition-colors"
                    >
                      <Info className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {conversations.map((conversation, index) => (
                    <div key={conversation.id} className="space-y-3 pb-4 border-b last:border-b-0">
                      <h3 className="font-semibold text-sm text-muted-foreground">
                        Conversation {conversation.id}
                        {conversation.id === 6 && " — Thank You"}
                      </h3>

                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">User:</Label>
                        {isEditingConversations ? (
                          <Textarea
                            value={conversation.user}
                            onChange={(e) => handleConversationChange(conversation.id, "user", e.target.value)}
                            className="min-h-[60px] text-sm"
                          />
                        ) : (
                          <p className="text-sm bg-muted/30 p-3 rounded-md">{conversation.user}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">Response:</Label>
                        {isEditingConversations ? (
                          <Textarea
                            value={conversation.response}
                            onChange={(e) => handleConversationChange(conversation.id, "response", e.target.value)}
                            className="min-h-[80px] text-sm"
                          />
                        ) : (
                          <p className="text-sm bg-primary/5 p-3 rounded-md">{conversation.response}</p>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => {
                        setShowTrainedScenarios(false)
                        setIsEditingConversations(false)
                      }}
                      className="flex-1"
                    >
                      {isEditingConversations ? "Save Changes" : "Close"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Dialog for showing framework details */}
      {selectedFramework && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedFramework(null)}
        >
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{selectedFramework}</CardTitle>
                  <CardDescription>
                    {clinicalCoachingFrameworks.find((f) => f.title === selectedFramework)?.description}
                  </CardDescription>
                </div>
                <button
                  onClick={() => setSelectedFramework(null)}
                  className="p-2 rounded-md hover:bg-muted/80 transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Full Form Section */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Full Form</h3>
                  <div className="space-y-2">
                    {clinicalCoachingFrameworkDetails[
                      selectedFramework as keyof typeof clinicalCoachingFrameworkDetails
                    ].fullForm.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-200/50 dark:border-blue-800/50"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best Practices Section */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Best Practices</h3>
                  <div className="space-y-2">
                    {clinicalCoachingFrameworkDetails[
                      selectedFramework as keyof typeof clinicalCoachingFrameworkDetails
                    ].usefulFor.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-green-50/50 dark:bg-green-950/20 rounded-lg border border-green-200/50 dark:border-green-800/50"
                      >
                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-500 mt-2"></div>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* System Prompt Section (JSON format) */}
              <div className="space-y-3 pt-4 border-t">
                <h3 className="text-lg font-semibold text-foreground">System Prompt (JSON)</h3>
                <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-xs text-slate-100 font-mono">
                    {JSON.stringify(frameworkSystemPrompts[selectedFramework], null, 2)}
                  </pre>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={() => setSelectedFramework(null)} className="flex-1">
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
