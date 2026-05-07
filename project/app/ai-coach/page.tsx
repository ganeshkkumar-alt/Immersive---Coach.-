"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"
import { PredefinedScenarios } from "@/components/predefined-scenarios"
import { TrainingDetails } from "@/components/training-details"
import { TrainingEditor } from "@/components/training-editor"
import { TrainingFeedback } from "@/components/training-feedback"
import { PromptHub } from "@/components/prompt-hub"
import { TrainingSession } from "@/components/training-session"
import { PreSessionInfo } from "@/components/pre-session-info"
import { TrainingDisclaimer } from "@/components/training-disclaimer"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation" // Added useSearchParams
import { UserDashboard } from "@/components/user-dashboard"
import { VideoAnalysis } from "@/components/video-analysis"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Share2, ChevronRight } from "lucide-react" // Added ChevronRight
import { VisualTrainingSession } from "@/components/visual-training-session"

export interface FeedbackPoint {
  id: string
  title: string
  prompt: string
  useCustomGrades: boolean
  positiveMessage: string
  negativeMessage: string
  detailedFeedback?: string // Added detailedFeedback field
  ignoreFormatting: boolean
}

export interface SMPCSubItem {
  id: string
  subCategory: string
  value: string
}

export interface SMPCData {
  productName: string
  composition: string
  pharmaceuticalForm: string
  clinicalParticulars: SMPCSubItem[]
  pharmacologicalProperties: SMPCSubItem[]
  pharmaceuticalParticulars: string
  regulatoryInfo: string
}

export interface Slide {
  id: string
  title: string
  description: string
  systemPrompt: string
  smpcData?: SMPCData
  feedbackPoints: FeedbackPoint[]
}

export interface Episode {
  id: string
  title: string
  description: string
  avatar?: string
  voice?: string
  avatarInfo?: string // Added avatarInfo field
  slides: Slide[]
}

export interface Training {
  id: string
  title: string
  description?: string
  language: string
  avatar: string
  voice: string
  episodes: Episode[]
  totalSessions: number
  latestSession: string
  avatarShareURL: string
}

type View =
  | "dashboard"
  | "predefined-scenarios"
  | "training-editor"
  | "training-details"
  | "training-session"
  | "training-feedback"
  | "prompt-hub"
  | "pre-session-info" // Added new view type
  | "visual-training-session" // Added visual training session view
  | null // Added null for View type

// Define initialTrainings array outside the component
const initialTrainings: Training[] = [
  {
    id: "2",
    avatarShareURL: "",
    title: "Patient-Centred Pathways to PulmoNexa",
    description:
      "A coaching module designed to build effective, patient-centred dialogue with cautious clinicians. Learn how to guide Dr. Clara Wynn toward small, practical PulmoNexa trials within her routine workflow.",
    language: "English",
    avatar: "Dr. Clara Wynn",
    voice: "Professional Voice",
    episodes: [
      {
        id: "ep1",
        title: "Patient-Centric PulmoNexa Conversations: Engaging the Cautious GP",
        description:
          "This coaching section helps representatives understand how Dr. Clara Wynn approaches chronic airway disease management in a time-pressured GP setting. It highlights her cautious views on therapy escalation, her reliance on symptom narratives, and why she sees triple therapy like PulmoNexa as a late-stage option unless clear instability emerges.",
        avatar: "Dr. Clara Wynn",
        voice: "Professional Voice",
        avatarInfo: "Dr. Clara Wynn, 28, General Practitioner specialising in chronic airway disease management.",
        slides: [
          {
            id: "s1",
            title: "Navigating the Clinical Mindset of a Cautious GP",
            description: "Role-play simulation with Dr. Clara Wynn",
            systemPrompt: JSON.stringify(
              {
                persona: {
                  ai_role: "Specialist HCP persona coach and simulated HCP responder",
                  name: "Dr. Clara Wynn",
                  profile: "Traditional, pragmatic, conservative General Practitioner",
                  age: 28,
                  country: "Valeria",
                  workstyle_themes: [
                    "Time-pressed",
                    "Cautious with new therapies",
                    "Values routine",
                    "Prioritises safety and predictability",
                  ],
                  user_goal:
                    "Encourage Clara to consider a small, appropriate group of chronic airway disease patients for a trial of PulmoNexa (fictional triple therapy).",
                },
                knowledge: {
                  clinical_behavioural_tendencies: {
                    preferences: [
                      "Prefers incremental, low-disruption therapy changes",
                      "Assumes many symptoms are 'usual for them' unless clearly worsening",
                      "Depends heavily on symptom narratives",
                      "Views triple therapy as end-stage escalation",
                      "Mild scepticism toward pharma reps but accepts respectful data",
                    ],
                  },
                  practice_environment: {
                    setting: "Urban–suburban region with high airway disease burden",
                    constraints: ["Specialist access delays", "Seasonal rise in quarterly exacerbations"],
                    clinic_infrastructure: {
                      no_in_house_spirometry: true,
                      inconsistent_nurse_histories: true,
                      patients_underreport_deterioration: true,
                    },
                  },
                  patient_types_challenging_for_clara: [
                    "Quiet decliners",
                    "Chronic fluctuating coughers",
                    "Older adults with cardiac overlap",
                    "Repeat low-grade flare-up patients",
                    "Symptom-minimisers",
                  ],
                  decision_drivers_and_barriers: {
                    drivers: [
                      "Clear severe-event benefits",
                      "Straightforward prescribing",
                      "Safety reassurance",
                      "Small pilot approach",
                    ],
                    barriers: [
                      "Fear of overtreatment",
                      "Polypharmacy worries",
                      "Adherence doubts",
                      "Device unfamiliarity",
                      "Limited initiation time",
                    ],
                  },
                  trixera_summary: {
                    efficacy: {
                      AERIS: "20% fewer severe flare events",
                      AERIS_subgroup: "33% fewer night-time escalations",
                      AURIS: "49% mortality reduction over 12 months",
                      VAL_OP: "Faster improvement in chronic cough profiles",
                      small_airway_deposition: "Superior deposition modelling",
                    },
                    safety: {
                      adverse_events: "Similar to dual therapy",
                      discontinuation: "Low",
                      cardiopulmonary_issues: "None observed",
                    },
                    guidelines_valeria_2030: [
                      "Escalate earlier after repeated flares",
                      "Consider triple therapy for cough-driven instability",
                      "Escalate before severe decline",
                    ],
                  },
                  realistic_gp_behaviour: [
                    "Avoids switching therapy during peak clinic hours",
                    "Prefers structured review appointments for changes",
                    "Likes concise printed summaries",
                    "Rejects sales pressure",
                  ],
                },
                internal_skill_models: {
                  ACHE_model: {
                    A_acknowledge:
                      "Responds better when her concerns (safety, overtreatment, time pressure) are validated.",
                    C_clarify: "Expects short, direct questions to help identify underlying hesitations.",
                    H_handle: "Accepts one high-impact evidence point at a time.",
                    E_evaluate: "Progresses when offered small, low-risk micro-commitments (1–2 patient pilot).",
                  },
                },
                instructions: {
                  interaction_rules: [
                    "Never ask for specific patient lists.",
                    "Do not guide the user unless asked.",
                    "Remain fully in character as Dr. Clara Wynn.",
                    "Maintain realistic GP tone and limitations.",
                    "Decline off-label or patient-specific queries using approved lines.",
                  ],
                  approved_decline_lines: [
                    "I'm not able to provide prescribing advice or off-label recommendations.",
                    "I can't advise on that; you should consult the appropriate resource.",
                    "I can't help with that — please consult the patient's specialist or local guidance.",
                  ],
                  internal_response_logic: {
                    evaluation_criteria: {
                      effective: "Clara becomes gradually open.",
                      moderate: "Clara stays cautious but curious.",
                      low: "Clara becomes resistant.",
                      mandatory_refusal: "If off-label or patient-specific.",
                    },
                  },
                  communication_format: {
                    style: "Respond as Dr. Clara Wynn only.",
                    sentence_style: "Short, realistic GP phrasing.",
                    approach: "Offer incremental, low-risk steps.",
                    complexity: "Avoid clinical complexity.",
                    session_start: "Always begin with Clara's opening line.",
                  },
                  execution_requirements: [
                    "Think using ACHE and internal skill model.",
                    "Output only Clara's spoken line.",
                    "Keep tone conservative, experienced, pragmatic.",
                    "Advance only when user demonstrates high-skill behaviour.",
                  ],
                },
                feedback_model_SCORE_ACHE: {
                  S_strengths: "What the user did well: empathy, time awareness, non-pushy tone.",
                  C_cues_missed: "Unaddressed signals such as safety concerns, adherence, routine disruption.",
                  O_opportunities: [
                    "Acknowledge her caution earlier.",
                    "Clarify with short questions.",
                    "Handle using one evidence point only.",
                    "Evaluate with small, low-risk asks.",
                  ],
                  R_redirection: [
                    "Reframe the recommendation as a small pilot group.",
                    "Ask permission before sharing data.",
                    "Keep phrasing concise and time-efficient.",
                  ],
                  E_effectiveness_rating: {
                    high: "Clara moves toward a micro-commitment.",
                    moderate: "Clara shows guarded interest.",
                    low: "Clara becomes resistant or disengages.",
                  },
                },
              },
              null,
              2,
            ),
            feedbackPoints: [
              {
                id: "fp1",
                title: "1️⃣ Articulate the Patient Challenges",
                prompt:
                  "Evaluate how clearly the user identified relevant patient challenges and linked them to Clara's real-world practice.",
                useCustomGrades: false,
                positiveMessage:
                  "You clearly surfaced the clinical challenges Clara faces and connected them to PulmoNexa's relevance.",
                negativeMessage:
                  "Try highlighting more specific unmet needs Clara experiences with her COPD patients to build urgency.",
                detailedFeedback:
                  "You articulated patient challenges in a way that resonated strongly with Clara's real-world experience. By highlighting quiet decliners, chronic coughers, and fluctuating symptom patterns, you connected directly to the types of patients Clara finds most difficult to manage. Your framing of under-reported symptoms and subtle deterioration aligned well with her dependency on patient narratives and lack of spirometry. To take this further, you could weave in more of her clinic realities, such as seasonal exacerbation surges or inconsistent nurse histories, to deepen the sense that PulmoNexa fits authentically into her workflow. Overall, your articulation of unmet needs helped set a strong foundation for exploring PulmoNexa as a potential solution.",
                ignoreFormatting: false,
              },
              {
                id: "fp2",
                title: "2️⃣ Establish Relevance",
                prompt:
                  "Assess how well the user made the topic feel important and aligned with Clara's local practice and decision drivers.",
                useCustomGrades: false,
                positiveMessage:
                  "You successfully connected PulmoNexa to Clara's daily reality and clinical priorities.",
                negativeMessage:
                  "Strengthen the link between your points and scenarios Clara routinely manages in her practice.",
                detailedFeedback:
                  "You successfully established relevance by linking PulmoNexa to the clinical issues Clara faces day-to-day, especially around fluctuating cough patterns and nighttime instability. Your tone respected her time pressure and preference for concise information, which helped maintain her receptiveness. You kept the conversation grounded in primary-care realities rather than abstract clinical theory. Going forward, you could strengthen relevance further by subtly referencing Valeria's 2030 guideline expectations, reinforcing that PulmoNexa aligns with how her system defines good care. Your approach ensured Clara could clearly see why this conversation mattered to her practice.",
                ignoreFormatting: false,
              },
              {
                id: "fp3",
                title: "3️⃣ Use Positive Tension",
                prompt:
                  "Analyse whether the user maintained a respectful tone while highlighting gaps in current management.",
                useCustomGrades: false,
                positiveMessage:
                  "You introduced the gap between perceived stability and true patient risk in a constructive way.",
                negativeMessage:
                  "Increase awareness of latent patient risk to help Clara feel more urgency to take action.",
                detailedFeedback:
                  "You applied positive tension gently and effectively, guiding Clara to see the gap between apparent stability and underlying risk without triggering resistance. By framing cough-driven instability and repeated low-grade flares as important yet often overlooked signals, you encouraged Clara to reconsider her assumption that 'this is just how they are.' This type of tension works well because it highlights patient vulnerability while respecting her conservative approach. To sharpen the impact in future discussions, you could more clearly connect delayed escalation to long-term decline or preventable severe events. Still, your overall tension-building remained constructive and built curiosity rather than defensiveness.",
                ignoreFormatting: false,
              },
              {
                id: "fp4",
                title: "4️⃣ Position the Science and Brand",
                prompt: "Check whether the user presented PulmoNexa evidence with permission, clarity, and relevance.",
                useCustomGrades: false,
                positiveMessage: "Your data points were concise, evidence-based, and linked to Clara's key concerns.",
                negativeMessage: "Try simplifying and connecting data more directly to the patient types Clara sees.",
                detailedFeedback:
                  "You positioned the science behind PulmoNexa in a clear, permission-based way that aligns well with Clara's need for simplicity and reassurance. By offering concise, high-impact data rather than overwhelming her with detail, you made the evidence feel manageable within a GP's limited mental bandwidth. You also tied PulmoNexa's outcomes—like reductions in severe flares and nighttime escalations—to clinical patterns Clara recognises. To strengthen this area further, you could introduce small-airway deposition advantages when appropriate, providing a meaningful differentiator without overcomplicating the message. Overall, your science positioning supported her cautious movement toward considering PulmoNexa.",
                ignoreFormatting: false,
              },
              {
                id: "fp5",
                title: "5️⃣ Handle Objections",
                prompt:
                  "Evaluate how well the user acknowledged concerns and addressed them with clear and confident information.",
                useCustomGrades: false,
                positiveMessage: "You acknowledged Clara's worries and provided on-point reassurance that built trust.",
                negativeMessage:
                  "Work on understanding what truly drives Clara's concern before responding with information.",
                detailedFeedback:
                  "You handled Clara's underlying concerns with empathy, validating her fear of overtreatment and disruption of routine before offering any data. Your responses were concise, clinically grounded, and avoided pressuring her—a crucial approach for a conservative GP like Clara. You addressed her safety concerns using on-label, high-impact evidence without overwhelming her. If future objections arise, you may deepen the effectiveness by clarifying her hesitation with a short, direct question before presenting the solution. But in this conversation, you responded in a way that left Clara feeling heard, respected, and more willing to engage.",
                ignoreFormatting: false,
              },
              {
                id: "fp6",
                title: "6️⃣ Build Incremental Agreement",
                prompt: "Assess whether the user moved step-by-step toward small, manageable decisions.",
                useCustomGrades: false,
                positiveMessage:
                  "You progressed naturally toward a measured next step that matched Clara's comfort level.",
                negativeMessage:
                  "Break your goals into smaller actions so Clara sees minimal disruption to her routine.",
                detailedFeedback:
                  "You were highly effective at building incremental agreement by framing next steps as small, low-risk actions rather than large therapeutic changes. Your language aligned with Clara's preference for gradual decisions, letting her feel in control of the escalation process. By reinforcing that any trial of PulmoNexa would involve only one or two tightly selected patients, you matched her need for routine stability. Going forward, you can strengthen this approach by occasionally asking for permission before proposing a next step, which reinforces her sense of autonomy. Overall, you supported her in moving from cautious interest to genuine openness.",
                ignoreFormatting: false,
              },
              {
                id: "fp7",
                title: "7️⃣ Gain Commitment with Action",
                prompt: "Evaluate if the user secured a realistic micro-commitment aligned with Clara's style.",
                useCustomGrades: false,
                positiveMessage:
                  "You obtained a practical commitment Clara can implement confidently with 1–2 patients.",
                negativeMessage: "Clarify the exact next step to ensure commitment translates into action.",
                detailedFeedback:
                  "Your approach to gaining commitment was subtle and entirely consistent with Clara's decision-making style. Instead of pushing for broad adoption, you guided her toward a focused pilot approach, which she could easily imagine integrating into her review appointments. You made the commitment feel safe by anchoring it in guideline alignment and patient benefit. To enhance future interactions, you may reinforce commitments with simple operational suggestions, such as identifying review windows that fit her schedule. In this conversation, you secured a realistic and meaningful commitment: exploring PulmoNexa with one or two appropriate patients.",
                ignoreFormatting: false,
              },
              {
                id: "fp8",
                title: "8️⃣ Extend the Experience",
                prompt:
                  "Check whether the user helped Clara visualise continuity and future benefit from the decision.",
                useCustomGrades: false,
                positiveMessage: "You set up a constructive follow-up that builds on Clara's initial experience.",
                negativeMessage:
                  "Try offering a simple plan for continued support so Clara feels guided beyond today's decision.",
                detailedFeedback:
                  "You closed the conversation on a strong note by offering concise support materials and positioning the next interaction around the experience she will gain from her pilot patients. This forward-looking framing naturally extended the experience and put Clara in a reflective, data-gathering mindset. You maintained her autonomy, which is essential for long-term trust, and kept the scope manageable and respectful of her clinical pressures. To grow this dynamic further, you could offer optional follow-up touchpoints tied to her quarterly review cycles. Overall, you set up a smooth, realistic path for continued engagement with PulmoNexa.",
                ignoreFormatting: false,
              },
            ],
          },
        ],
      },
    ],
    totalSessions: 12,
    latestSession: "2024-01-20",
  },
  {
    id: "5",
    avatarShareURL: "",
    title: "Product Pitch Training",
    description:
      "Comprehensive pharmaceutical sales training for introducing new drugs to healthcare providers. Master the complete sales cycle: establishing patient challenges, presenting solutions, gaining commitment, and handling objections with diverse physician personalities.",
    language: "English",
    avatar: "Dr. Sarah Mitchell",
    voice: "Professional Voice",
    totalSessions: 24,
    latestSession: "2024-01-28",
    episodes: [
      {
        id: "e1",
        title: "Establishing Patient Challenges with Dr. Mitchell",
        description:
          "Learn to engage with Dr. Sarah Mitchell, a female internal medicine physician, to uncover and discuss patient challenges. Focus on asking open-ended questions and building rapport.",
        avatar: "Dr. Sarah Mitchell",
        voice: "Professional Female Voice",
        avatarInfo:
          "Dr. Sarah Mitchell is an experienced internal medicine physician in her mid-40s who values evidence-based discussions and patient-centered care.",
        slides: [
          {
            id: "s1",
            title: "Patient Challenge Discovery",
            description: "Interactive session to identify patient needs",
            systemPrompt: `You are Dr. Sarah Mitchell, an internal medicine physician. You are meeting with a pharmaceutical sales representative. You are cautious but open to learning about new treatments that could benefit your patients with chronic conditions. Guide the conversation by sharing patient challenges when asked thoughtful questions.`,
            feedbackPoints: [
              {
                id: "fp1",
                title: "Active Listening",
                description: "Demonstrated attentive listening to physician concerns",
              },
              {
                id: "fp2",
                title: "Question Quality",
                description: "Asked relevant, open-ended questions about patient challenges",
              },
              {
                id: "fp3",
                title: "Rapport Building",
                description: "Established trust and professional connection with the physician",
              },
            ],
          },
        ],
      },
      {
        id: "e2",
        title: "Establishing Patient Challenges with Dr. Chen",
        description:
          "Practice uncovering patient challenges with Dr. Robert Chen, a male cardiologist. Adapt your approach to his analytical style and focus on clinical evidence.",
        avatar: "Dr. Robert Chen",
        voice: "Professional Male Voice",
        avatarInfo:
          "Dr. Robert Chen is a cardiologist in his early 50s known for his analytical approach and preference for data-driven treatment decisions.",
        slides: [
          {
            id: "s1",
            title: "Clinical Challenge Assessment",
            description: "Evidence-based discussion of patient needs",
            systemPrompt: `You are Dr. Robert Chen, a cardiologist who values data and clinical evidence. You are meeting with a sales representative. You are skeptical but willing to discuss patient challenges if the representative demonstrates knowledge and asks good questions about cardiovascular patients.`,
            feedbackPoints: [
              {
                id: "fp1",
                title: "Clinical Knowledge",
                description: "Demonstrated understanding of cardiovascular patient challenges",
              },
              {
                id: "fp2",
                title: "Evidence-Based Approach",
                description: "Referenced relevant clinical data and patient outcomes",
              },
              {
                id: "fp3",
                title: "Professional Demeanor",
                description: "Maintained professional composure with analytical physician",
              },
            ],
          },
        ],
      },
      {
        id: "e3",
        title: "Pitching Product with Dr. Mitchell",
        description:
          "Present your product solution to Dr. Sarah Mitchell, focusing on how it addresses the patient challenges previously discussed. Emphasize patient outcomes and practical benefits.",
        avatar: "Dr. Sarah Mitchell",
        voice: "Professional Female Voice",
        avatarInfo:
          "Dr. Sarah Mitchell is receptive to solutions that improve patient care and align with current treatment guidelines.",
        slides: [
          {
            id: "s1",
            title: "Solution Presentation",
            description: "Pitch product benefits addressing patient challenges",
            systemPrompt: `You are Dr. Sarah Mitchell. The sales representative is now presenting a new drug solution. You are interested in hearing how this product addresses the patient challenges you discussed earlier. Ask questions about efficacy, safety, and how it fits into your current treatment protocols.`,
            feedbackPoints: [
              {
                id: "fp1",
                title: "Value Proposition",
                description: "Clearly articulated how product solves patient challenges",
              },
              {
                id: "fp2",
                title: "Clinical Benefits",
                description: "Effectively communicated clinical advantages and patient outcomes",
              },
              {
                id: "fp3",
                title: "Handling Questions",
                description: "Confidently addressed physician questions with relevant information",
              },
              {
                id: "fp4",
                title: "Differentiation",
                description: "Highlighted unique product features compared to existing treatments",
              },
            ],
          },
        ],
      },
      {
        id: "e4",
        title: "Pitching Product with Dr. Chen",
        description:
          "Deliver your product pitch to Dr. Robert Chen, emphasizing clinical data, trial results, and evidence-based benefits that address cardiovascular patient needs.",
        avatar: "Dr. Robert Chen",
        voice: "Professional Male Voice",
        avatarInfo:
          "Dr. Robert Chen expects rigorous clinical evidence and clear data to support any new treatment recommendation.",
        slides: [
          {
            id: "s1",
            title: "Evidence-Based Presentation",
            description: "Data-driven product pitch for analytical physician",
            systemPrompt: `You are Dr. Robert Chen. The representative is presenting a new drug. You need to see strong clinical trial data, understand the mechanism of action, and how it compares to existing therapies. You ask detailed questions about efficacy endpoints, safety profile, and patient selection criteria.`,
            feedbackPoints: [
              {
                id: "fp1",
                title: "Clinical Data Presentation",
                description: "Effectively presented trial results and efficacy data",
              },
              {
                id: "fp2",
                title: "Scientific Accuracy",
                description: "Demonstrated accurate understanding of mechanism and outcomes",
              },
              {
                id: "fp3",
                title: "Comparative Analysis",
                description: "Provided clear comparison with existing treatment options",
              },
              {
                id: "fp4",
                title: "Confidence Under Scrutiny",
                description: "Maintained composure when challenged with detailed questions",
              },
            ],
          },
        ],
      },
      {
        id: "e5",
        title: "Gaining Commitment with Dr. Mitchell",
        description:
          "Navigate the commitment phase with Dr. Sarah Mitchell after she expresses interest in your product. Learn to secure next steps and trial prescriptions effectively.",
        avatar: "Dr. Sarah Mitchell",
        voice: "Professional Female Voice",
        avatarInfo:
          "Dr. Sarah Mitchell is considering the new drug and wants to discuss implementation and next steps.",
        slides: [
          {
            id: "s1",
            title: "Securing Commitment",
            description: "Close the conversation with clear next steps",
            systemPrompt: `You are Dr. Sarah Mitchell. You are interested in the new drug and are positive about it. The representative needs to guide you toward commitment - either trying it with select patients or learning more. You are open but need clear next steps and support.`,
            feedbackPoints: [
              {
                id: "fp1",
                title: "Trial Close",
                description: "Successfully attempted to secure commitment or next steps",
              },
              {
                id: "fp2",
                title: "Addressing Concerns",
                description: "Proactively addressed implementation concerns and barriers",
              },
              {
                id: "fp3",
                title: "Support Offering",
                description: "Clearly communicated available resources and support",
              },
            ],
          },
        ],
      },
      {
        id: "e6",
        title: "Handling Objections with Dr. Thompson",
        description:
          "Master objection handling with Dr. Michael Thompson, a male physician who is satisfied with existing treatments and resistant to change. Practice the ACHE model to overcome objections.",
        avatar: "Dr. Michael Thompson",
        voice: "Professional Male Voice",
        avatarInfo:
          "Dr. Michael Thompson is a seasoned physician in his late 50s who prefers established treatments and is skeptical of new products.",
        slides: [
          {
            id: "s1",
            title: "Competitive Objection Handling",
            description: "Address physician resistance and competitive concerns",
            systemPrompt: `You are Dr. Michael Thompson, a physician who has been using the same drug for years with good results. A sales representative is trying to introduce a new product. You say things like "I already have a drug that works well" or "Why should I switch?" You are skeptical but will listen if the representative uses good objection handling techniques.`,
            feedbackPoints: [
              {
                id: "fp1",
                title: "Acknowledge",
                description: "Validated physician's satisfaction with current treatment",
              },
              {
                id: "fp2",
                title: "Clarify",
                description: "Asked questions to understand specific objections and concerns",
              },
              {
                id: "fp3",
                title: "Handle",
                description: "Provided compelling reasons to consider new option without dismissing current choice",
              },
              {
                id: "fp4",
                title: "Evaluate",
                description: "Assessed physician's response and adjusted approach accordingly",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "4",
    avatarShareURL: "",
    title: "Specialist Objection-Handling Simulation",
    description:
      "A guided simulation setup where the user interacts with Dr. James, a specialist pulmonologist, to practice objection handling. The framework enforces ACHE-based skill assessment, controlled information flow, realistic persona behavior, and structured objection initiation.",
    language: "English",
    avatar: "Dr. James",
    voice: "Professional Voice",
    totalSessions: 12,
    latestSession: "2024-01-24",
    episodes: [
      {
        id: "ep1",
        title: "Pulmonologist Role-Play Objection Training Framework",
        description:
          "A guided simulation setup where the user interacts with Dr. James, a specialist pulmonologist, to practice objection handling. The framework enforces ACHE-based skill assessment, controlled information flow, realistic persona behavior, and structured objection initiation.",
        avatar: "Dr. James",
        voice: "Professional Voice",
        avatarInfo:
          "Dr. James is a specialist pulmonologist in his early 35s with extensive experience managing moderate-to-severe COPD patients.",
        slides: [
          {
            id: "s1",
            title: "Training",
            description: "Role-Play Objection Training",
            systemPrompt: "The complete ACHE system prompt with objection scenarios...",
            feedbackPoints: [
              {
                id: "fp1",
                title: "Acknowledge",
                prompt: "Did the learner acknowledge the HCP's objection respectfully before responding?",
                useCustomGrades: false,
                positiveMessage:
                  "You effectively acknowledged the HCP's perspective, showing respect and active listening.",
                negativeMessage: "Try acknowledging the HCP's concern first before moving to your response.",
                ignoreFormatting: false,
              },
              {
                id: "fp2",
                title: "Clarify",
                prompt: "Did the learner ask clarifying questions to understand the HCP's underlying concern?",
                useCustomGrades: false,
                positiveMessage: "Great use of clarifying questions to understand the root concern.",
                negativeMessage: "Consider asking more questions to fully understand the HCP's perspective.",
                ignoreFormatting: false,
              },
              {
                id: "fp3",
                title: "Handle",
                prompt: "Did the learner provide a compliant, evidence-based response to address the objection?",
                useCustomGrades: false,
                positiveMessage: "Strong, compliant handling of the objection with appropriate evidence.",
                negativeMessage: "Focus on providing evidence-based responses while maintaining compliance.",
                ignoreFormatting: false,
              },
              {
                id: "fp4",
                title: "Evaluate",
                prompt:
                  "Did the learner check if the response addressed the HCP's concern and move forward appropriately?",
                useCustomGrades: false,
                positiveMessage: "Excellent follow-up to ensure the HCP's concern was resolved.",
                negativeMessage: "Remember to check if your response addressed the concern before moving on.",
                ignoreFormatting: false,
              },
            ],
          },
        ],
      },
      {
        id: "ep2",
        title: "Pulmonologist Objection Practice — Objector Framework",
        description:
          "A concise, debranded role-play framework designed for training objection-handling skills. The AI acts as the objector, maintaining resistance until the learner effectively applies the ACHE model.",
        avatar: "Dr. James",
        voice: "Professional Voice",
        avatarInfo: "Mark - Objector",
        slides: [
          {
            id: "s2",
            title: "Objection-Handling Objector Simulation Prompt",
            description:
              "A minimal system prompt where the AI plays the role of Dr. James, a clinically focused pulmonologist, raising realistic objections so learners can practice ACHE-based objection handling in a controlled simulation.",
            systemPrompt: "The objector framework system prompt...",
            feedbackPoints: [
              {
                id: "fp1",
                title: "Acknowledge",
                prompt: "Did the learner acknowledge the HCP's objection respectfully before responding?",
                useCustomGrades: false,
                positiveMessage:
                  "You effectively acknowledged the HCP's perspective, showing respect and active listening.",
                negativeMessage: "Try acknowledging the HCP's concern first before moving to your response.",
                ignoreFormatting: false,
              },
              {
                id: "fp2",
                title: "Clarify",
                prompt: "Did the learner ask clarifying questions to understand the HCP's underlying concern?",
                useCustomGrades: false,
                positiveMessage: "Great use of clarifying questions to understand the root concern.",
                negativeMessage: "Consider asking more questions to fully understand the HCP's perspective.",
                ignoreFormatting: false,
              },
              {
                id: "fp3",
                title: "Handle",
                prompt: "Did the learner provide a compliant, evidence-based response to address the objection?",
                useCustomGrades: false,
                positiveMessage: "Strong, compliant handling of the objection with appropriate evidence.",
                negativeMessage: "Focus on providing evidence-based responses while maintaining compliance.",
                ignoreFormatting: false,
              },
              {
                id: "fp4",
                title: "Evaluate",
                prompt:
                  "Did the learner check if the response addressed the HCP's concern and move forward appropriately?",
                useCustomGrades: false,
                positiveMessage: "Excellent follow-up to ensure the HCP's concern was resolved.",
                negativeMessage: "Remember to check if your response addressed the concern before moving on.",
                ignoreFormatting: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "1",
    avatarShareURL: "",
    title: "HCP Training",
    description: "Healthcare professional training scenario",
    language: "English",
    avatar: "James Anderson",
    voice: "Professional Voice",
    episodes: [
      {
        id: "ep1",
        title: "Initial Consultation",
        description: "Practice initial patient consultation",
        avatar: "James Anderson",
        voice: "Professional Voice",
        avatarInfo: "James Anderson - Healthcare Professional Trainer",
        slides: [
          {
            id: "s1",
            title: "Initial Consultation",
            description: "Practice initial patient consultation",
            systemPrompt: "You are a healthcare professional...",
            feedbackPoints: [
              {
                id: "fp1",
                title: "Professional Communication",
                prompt:
                  "Evaluate the representative's ability to communicate professionally with healthcare professionals.",
                useCustomGrades: false,
                positiveMessage:
                  "Excellent professional communication. You maintained appropriate tone and language throughout.",
                negativeMessage:
                  "Consider improving your professional communication by using more formal language and medical terminology.",
                ignoreFormatting: false,
              },
              {
                id: "fp2",
                title: "Clinical Knowledge",
                prompt: "Assess the representative's understanding and application of clinical concepts.",
                useCustomGrades: false,
                positiveMessage:
                  "Strong demonstration of clinical knowledge. Your responses were accurate and well-informed.",
                negativeMessage:
                  "Review clinical materials to strengthen your knowledge base and confidence in discussions.",
                ignoreFormatting: false,
              },
              {
                id: "fp3",
                title: "Listening Skills",
                prompt: "Evaluate how well the representative listened and responded to the HCP's concerns.",
                useCustomGrades: false,
                positiveMessage: "Outstanding listening skills. You addressed all concerns raised effectively.",
                negativeMessage: "Focus on active listening and ensure you're addressing all points raised by the HCP.",
                ignoreFormatting: false,
              },
            ],
          },
        ],
      },
    ],
    totalSessions: 12,
    latestSession: "11/21/24",
  },
  {
    id: "3",
    avatarShareURL: "",
    title: "Compliance Training",
    description: "Regulatory compliance and guidelines",
    language: "English",
    avatar: "Michael Chen",
    voice: "Authoritative Voice",
    episodes: [
      {
        id: "ep1",
        title: "Regulatory Compliance",
        description: "Understanding and applying regulatory guidelines in pharma sales",
        avatar: "Michael Chen",
        voice: "Authoritative Voice",
        avatarInfo: "Michael Chen - Compliance Officer",
        slides: [
          {
            id: "s1",
            title: "Regulatory Compliance",
            description: "Understanding and applying regulatory guidelines in pharma sales",
            systemPrompt: "You are training on regulatory compliance...",
            feedbackPoints: [
              {
                id: "fp1",
                title: "Regulatory Knowledge",
                prompt:
                  "Evaluate the representative's understanding of relevant regulatory requirements and guidelines.",
                useCustomGrades: false,
                positiveMessage:
                  "Excellent regulatory knowledge. You demonstrated clear understanding of compliance requirements.",
                negativeMessage:
                  "Review regulatory guidelines to strengthen your understanding of compliance requirements.",
                ignoreFormatting: false,
              },
              {
                id: "fp2",
                title: "Ethical Decision Making",
                prompt: "Assess the representative's ability to make ethical decisions aligned with regulations.",
                useCustomGrades: false,
                positiveMessage: "Strong ethical decision making. You consistently chose compliant approaches.",
                negativeMessage:
                  "Consider the ethical implications more carefully and ensure all actions are fully compliant.",
                ignoreFormatting: false,
              },
              {
                id: "fp3",
                title: "Risk Awareness",
                prompt: "Evaluate the representative's ability to identify and mitigate compliance risks.",
                useCustomGrades: false,
                positiveMessage: "Excellent risk awareness. You identified potential issues proactively.",
                negativeMessage: "Develop stronger awareness of potential compliance risks in various scenarios.",
                ignoreFormatting: false,
              },
            ],
          },
        ],
      },
    ],
    totalSessions: 2,
    latestSession: "11/19/24",
  },
]

export default function AICoachPage() {
  // Changed state name to activeTab and added new states
  const [activeTab, setActiveTab] = useState<"role-play" | "analytics" | "brand-kit">("role-play")
  const [trainings, setTrainings] = useState<Training[]>(initialTrainings)
  const [showCollaborationDialog, setShowCollaborationDialog] = useState(false)
  const [showUserDashboard, setShowUserDashboard] = useState(false)
  const [showVideoAnalysis, setShowVideoAnalysis] = useState(false) // Added video analysis state
  const [showShareDialog, setShowShareDialog] = useState(false) // Added share dialog state

  const [currentView, setCurrentView] = useState<View>("dashboard")
  const [showScenarioSelection, setShowScenarioSelection] = useState(false)
  const [editingTraining, setEditingTraining] = useState<Training | undefined>(undefined)
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null)
  const [showPromptHub, setShowPromptHub] = useState(false)
  const [selectedRolePlay, setSelectedRolePlay] = useState<string>("") // Changed from array to single string for dropdown selection
  const [inviteEmail, setInviteEmail] = useState("")
  const [invitations, setInvitations] = useState<{ email: string; rolePlays: string[] }[]>([])
  const router = useRouter()
  const searchParams = useSearchParams() // Added useSearchParams

  const [showDisclaimer, setShowDisclaimer] = useState(false)
  const [showCoachingTypeModal, setShowCoachingTypeModal] = useState(false)
  const [selectedCoachingType, setSelectedCoachingType] = useState<"audio" | "visual" | null>(null)

  const [pendingView, setPendingView] = useState<"pre-session-info" | "training-session" | null>(null)

  useEffect(() => {
    const view = searchParams.get("view")
    if (view === "user") {
      setShowUserDashboard(true)
    }
  }, [searchParams])

  useEffect(() => {
    const handleOpenPromptHub = () => {
      setShowPromptHub(true)
    }

    window.addEventListener("openPromptHub", handleOpenPromptHub)
    return () => window.removeEventListener("openPromptHub", handleOpenPromptHub)
  }, [])

  const handleAddTraining = () => {
    setShowScenarioSelection(true)
  }

  const handleCloseScenarioSelection = () => {
    setShowScenarioSelection(false)
  }

  const handleCustomScenario = () => {
    setCurrentView("training-editor")
    setShowScenarioSelection(false)
    setEditingTraining(null)
  }

  const handlePredefinedScenario = () => {
    setCurrentView("predefined-scenarios")
    setShowScenarioSelection(false)
  }

  const handleAddScenario = (scenarioTitle: string) => {
    const newTraining: Training = {
      id: Date.now().toString(),
      title: scenarioTitle,
      description: `Training scenario for ${scenarioTitle}`,
      language: "English",
      episodes: [],
      totalSessions: 0,
      latestSession: new Date().toLocaleDateString(),
      avatar: "", // Added default avatar
      voice: "", // Added default voice
      avatarShareURL: "", // Added default avatarShareURL
    }
    setTrainings([...trainings, newTraining])
  }

  const handleSaveTraining = (training: Training) => {
    if (editingTraining) {
      setTrainings(trainings.map((t) => (t.id === training.id ? training : t)))
    } else {
      setTrainings([...trainings, training])
    }
    setCurrentView("dashboard")
    setEditingTraining(undefined)
  }

  // REMOVED: disclaimer from Start Session flow - it should only show before actual training session
  const handleOpenTrainingSession = (training: Training) => {
    setSelectedTraining(training)
    // REMOVED: setShowDisclaimer(true)
    // REMOVED: setPendingView("pre-session-info")
    setCurrentView("pre-session-info")
  }

  // Added function for opening visual training session
  const handleOpenVisualTraining = (training: Training) => {
    setSelectedTraining(training)
    setCurrentView("visual-training-session")
  }

  const handleStartActualSession = () => {
    console.log("[v0] Starting actual session, showing disclaimer")
    setShowDisclaimer(true)
    setPendingView("training-session")
  }

  const handleCloseTrainingSession = () => {
    setCurrentView("dashboard")
    setSelectedTraining(null)
  }

  const handleCloseFeedback = () => {
    setCurrentView("dashboard")
    setSelectedTraining(null)
  }

  const handleNavigateHome = () => {
    router.push("/")
  }

  const handleOpenTrainingDetails = (training: Training) => {
    setSelectedTraining(training)
    setCurrentView("training-details")
  }

  const handleShareTraining = (training: Training) => {
    setSelectedTraining(training)
    setShowShareDialog(true)
  }

  const handleCloseShareDialog = () => {
    setShowShareDialog(false)
    setSelectedTraining(null)
  }

  const handleSendInvite = () => {
    if (inviteEmail && selectedRolePlay) {
      setInvitations([...invitations, { email: inviteEmail, rolePlays: [selectedRolePlay] }])
      setInviteEmail("")
      setSelectedRolePlay("")
    }
  }

  const handleToggleRolePlay = (trainingName: string) => {
    setSelectedRolePlay(trainingName)
  }

  const handleCoachingTypeSelect = (type: "audio" | "visual") => {
    setSelectedCoachingType(type)
    setShowCoachingTypeModal(false)

    if (type === "audio") {
      setCurrentView("training-session")
    } else {
      setCurrentView("visual-training-session")
    }
  }

  const handleDisclaimerAcknowledge = () => {
    console.log("[v0] Disclaimer acknowledged, pendingView:", pendingView)
    setShowDisclaimer(false)
    if (pendingView === "training-session") {
      console.log("[v0] Showing coaching type modal")
      setCurrentView(null)
      setShowCoachingTypeModal(true)
    } else if (pendingView === "pre-session-info") {
      setCurrentView("pre-session-info")
    }
    setPendingView(null)
  }

  // Define handleBack here for clarity and to avoid potential scope issues
  const handleBack = () => {
    setCurrentView("dashboard")
    setSelectedTraining(null)
  }

  if (showVideoAnalysis) {
    return (
      <VideoAnalysis
        onBack={() => {
          setShowVideoAnalysis(false)
          setCurrentView("dashboard") // Set currentView back to dashboard
        }}
        userEmail="user@example.com"
        onAnalysisVideo={() => {
          // This callback might be redundant if we are already in VideoAnalysis view
        }}
      />
    )
  }

  if (showUserDashboard) {
    return (
      <UserDashboard
        onBack={() => {
          setShowUserDashboard(false)
          setCurrentView("dashboard") // Set currentView back to dashboard
        }}
        userEmail="user@example.com"
        onAnalysisVideo={() => {
          // Added callback to trigger video analysis
          setShowUserDashboard(false)
          setShowVideoAnalysis(true)
        }}
      />
    )
  }

  if (showDisclaimer && selectedTraining) {
    return <TrainingDisclaimer trainingTitle={selectedTraining.title} onAcknowledge={handleDisclaimerAcknowledge} />
  }

  if (showPromptHub) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          currentView="dashboard"
          onTrainClick={() => {}}
          onCollaborationClick={() => setShowCollaborationDialog(true)}
          onUserDashboardClick={() => setShowUserDashboard(true)}
          onAnalysisVideo={() => {
            setShowPromptHub(false)
            setShowVideoAnalysis(true)
          }}
        />
        <PromptHub onBack={() => setShowPromptHub(false)} />
      </div>
    )
  }

  if (currentView === "pre-session-info" && selectedTraining) {
    return <PreSessionInfo training={selectedTraining} onStartSession={handleStartActualSession} onClose={handleBack} />
  }

  if (currentView === "training-feedback" && selectedTraining) {
    return <TrainingFeedback training={selectedTraining} sessionNotes="" onClose={handleCloseFeedback} />
  }

  if (currentView === "training-session" && selectedTraining) {
    return <TrainingSession training={selectedTraining} onClose={handleCloseTrainingSession} />
  }

  if (currentView === "training-details" && selectedTraining) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          currentView="dashboard"
          onTrainClick={() => {}}
          onCollaborationClick={() => setShowCollaborationDialog(true)}
          onUserDashboardClick={() => setShowUserDashboard(true)}
          onAnalysisVideo={() => {
            setCurrentView("dashboard")
            setShowVideoAnalysis(true)
          }}
        />
        <TrainingDetails
          training={selectedTraining}
          onBack={() => {
            setCurrentView("dashboard")
            setSelectedTraining(null)
          }}
        />
      </div>
    )
  }

  if (currentView === "training-editor") {
    return (
      <div className="min-h-screen bg-background">
        <Header
          currentView="dashboard"
          onTrainClick={() => {}}
          onCollaborationClick={() => setShowCollaborationDialog(true)}
          onUserDashboardClick={() => setShowUserDashboard(true)}
          onAnalysisVideo={() => {
            setCurrentView("dashboard")
            setShowVideoAnalysis(true)
          }}
        />
        <TrainingEditor
          training={editingTraining}
          onSave={handleSaveTraining}
          onCancel={() => {
            setCurrentView("dashboard")
            setEditingTraining(undefined)
          }}
        />
      </div>
    )
  }

  if (currentView === "predefined-scenarios") {
    return (
      <div className="min-h-screen bg-background">
        <Header
          currentView="dashboard"
          onTrainClick={() => {}}
          onCollaborationClick={() => setShowCollaborationDialog(true)}
          onUserDashboardClick={() => setShowUserDashboard(true)}
          onAnalysisVideo={() => {
            setCurrentView("dashboard")
            setShowVideoAnalysis(true)
          }}
        />
        <PredefinedScenarios onBack={() => setCurrentView("dashboard")} onAddScenario={handleAddScenario} />
      </div>
    )
  }

  // Renamed some props to match the update section
  const headerCurrentView =
    currentView === "dashboard" ? "dashboard" : currentView === "training-editor" ? "editor" : "home"
  const handleTrainClick = () => {
    setCurrentView("dashboard")
  }
  const setShowCollaborationModal = setShowCollaborationDialog
  const closeScenarioSelection = handleCloseScenarioSelection
  const openTrainingSession = handleOpenTrainingSession
  const openTrainingDetails = handleOpenTrainingDetails
  const setShowShareModal = setShowShareDialog

  if (showCoachingTypeModal && selectedTraining) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-primary/20">
          <CardHeader className="space-y-2 pb-4">
            <CardTitle className="text-2xl font-bold text-center">Select Coaching Type</CardTitle>
            <CardDescription className="text-center">
              Choose your preferred coaching experience for this training session
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Audio Coaching Option */}
              <button
                onClick={() => handleCoachingTypeSelect("audio")}
                className="group relative overflow-hidden rounded-xl border-2 border-border hover:border-primary transition-all duration-300 p-6 text-left bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-600 dark:text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Audio Coaching</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Voice-based conversation practice with real-time AI feedback. Perfect for developing natural
                    dialogue skills and handling objections through audio interaction.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
                    <span>Recommended for conversation practice</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </button>

              {/* Visual Coaching Option */}
              <button
                onClick={() => handleCoachingTypeSelect("visual")}
                className="group relative overflow-hidden rounded-xl border-2 border-border hover:border-primary transition-all duration-300 p-6 text-left bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-purple-600 dark:text-purple-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Visual Coaching</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Video-based training with camera feedback and body language analysis. Ideal for improving
                    presentation skills, professional presence, and non-verbal communication.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400 font-medium">
                    <span>Recommended for presentation practice</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <Button
              variant="ghost"
              onClick={() => {
                setShowCoachingTypeModal(false)
                setCurrentView("pre-session-info")
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentView={headerCurrentView}
        onTrainClick={handleTrainClick}
        onCollaborationClick={() => setShowCollaborationModal(true)}
        onUserDashboardClick={() => setShowUserDashboard(true)}
        onAnalysisVideo={() => {
          setShowVideoAnalysis(true)
        }}
      />
      {/* Removed the duplicate Dashboard rendering and consolidated it into a single conditional block */}

      {currentView === "dashboard" && !showUserDashboard && !showVideoAnalysis && (
        <Dashboard
          trainings={trainings}
          onAddTraining={handleAddTraining}
          showScenarioSelection={showScenarioSelection}
          onCloseScenarioSelection={closeScenarioSelection}
          onCustomScenario={handleCustomScenario}
          onPredefinedScenario={handlePredefinedScenario}
          onOpenTrainingSession={openTrainingSession}
          onOpenTrainingDetails={openTrainingDetails}
          onNavigateHome={handleNavigateHome}
          onShareTraining={(training) => {
            setSelectedTraining(training)
            setShowShareModal(true)
          }}
          onOpenVisualTraining={handleOpenVisualTraining} // Added prop for visual training
        />
      )}

      {currentView === "visual-training-session" && selectedTraining && (
        <VisualTrainingSession
          training={selectedTraining}
          onBack={() => {
            setCurrentView("dashboard")
            setActiveTab("role-play")
          }}
        />
      )}

      {showCollaborationDialog && (
        <div className="fixed top-14 right-6 z-50 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold">User Collaboration</h3>
              <button
                onClick={() => setShowCollaborationDialog(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                ×
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              Invite users to collaborate on a role-play
            </p>

            <div className="space-y-3">
              {/* Select Role-Play Dropdown */}
              <div>
                <label className="text-xs font-semibold mb-1 block">Select Role-Play</label>
                <select
                  value={selectedRolePlay}
                  onChange={(e) => setSelectedRolePlay(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-background text-foreground"
                >
                  <option value="">Choose a role-play...</option>
                  {trainings.map((training) => (
                    <option key={training.id} value={training.title}>
                      {training.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Invite Field */}
              <div>
                <label className="text-xs font-semibold mb-1 block">Invite User</label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="Enter email"
                    className="flex-1 px-2 py-1.5 text-xs border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-background text-foreground"
                  />
                  <Button
                    onClick={handleSendInvite}
                    disabled={!inviteEmail || !selectedRolePlay}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1"
                  >
                    Send
                  </Button>
                </div>
              </div>

              {/* Sent Invitations */}
              {invitations.length > 0 && (
                <div>
                  <label className="text-xs font-semibold mb-1 block">Sent Invitations</label>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto">
                    {invitations.map((invitation, idx) => (
                      <div
                        key={idx}
                        className="p-2 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-md"
                      >
                        <p className="font-medium text-xs">{invitation.email}</p>
                        <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">
                          {invitation.rolePlays.join(", ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showShareDialog && selectedTraining && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Share Training</CardTitle>
                <Button variant="ghost" size="sm" onClick={handleCloseShareDialog}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription>Share "{selectedTraining.title}" with team members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email addresses</Label>
                <Input id="email" placeholder="Enter email addresses separated by commas" type="text" />
                <p className="text-xs text-muted-foreground">Enter multiple emails separated by commas</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea id="message" placeholder="Add a personal message..." rows={3} />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="notify" />
                <Label htmlFor="notify" className="text-sm font-normal">
                  Send email notification
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" onClick={handleCloseShareDialog} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button onClick={handleCloseShareDialog} className="flex-1 bg-green-600 hover:bg-green-700">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
