"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, Play, Sparkles, User } from "lucide-react"
import type { Training, Episode, FeedbackPoint, Slide, SMPCData, SMPCSubItem } from "@/app/ai-coach/page"
import { Navigation } from "@/components/navigation"
import type { TrainingEditorProps } from "./types"

const avatars = [
  "Astra", // Added Astra to predefined avatars
  "James Anderson",
  "Sarah Mitchell",
  "Michael Chen",
  "Emma Thompson",
  "David Rodriguez",
  "Lisa Johnson",
  "Robert Kim",
  "Jennifer Brown",
  "William Taylor",
  "Amanda Wilson",
  "Christopher Lee",
  "Michelle Davis",
  "Daniel Martinez",
  "Jessica Garcia",
  "Matthew White",
]

const voices = [
  "Natural Voice",
  "Confident Voice",
  "Professional Voice",
  "Warm Voice",
  "Authoritative Voice",
  "Friendly Voice",
  "Calm Voice",
  "Energetic Voice",
  "Clear Voice",
  "Soothing Voice",
]

export function TrainingEditor({ training, onSave, onCancel }: TrainingEditorProps) {
  const [title, setTitle] = useState(training?.title || "Specialist Objection-Handling Simulation")
  const [description, setDescription] = useState(
    training?.description ||
      "A guided simulation setup where the user interacts with Dr. James, a specialist pulmonologist, to practice objection handling. The framework enforces ACHE-based skill assessment, controlled information flow, realistic persona behavior, and structured objection initiation.",
  )
  const [language, setLanguage] = useState(training?.language || "English")
  const [showAvatarSelector, setShowAvatarSelector] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState(training?.avatar || "")
  const [selectedVoice, setSelectedVoice] = useState(training?.voice || "")
  const [episodes, setEpisodes] = useState<Episode[]>(
    training?.episodes || [
      {
        id: "1",
        title: "Pulmonologist Role-Play Objection Training Framework",
        description:
          "A debranded, clinically realistic system prompt designed to help users practice the ACHE communication model with a simulated pulmonologist. Includes structured objection scenarios, rebuttal rules, role-play behavior, and strict in-character responses.",
        avatar: "Dr. James",
        voice: "Professional Voice",
        avatarInfo:
          "Dr. James is a specialist pulmonologist in his early 40s with extensive experience managing moderate-to-severe COPD patients.",
        slides: [
          {
            id: "slide-1",
            title: "Training",
            description: "Role-Play Objection Training",
            smpcData: {
              productName: "Fixed-dose inhaled triple therapy containing an inhaled corticosteroid (ICS), long-acting β2-agonist (LABA), and long-acting muscarinic antagonist (LAMA).",
              composition: "Each delivered dose contains defined amounts of an ICS, a LABA, and a LAMA as active substances.",
              pharmaceuticalForm: "Pressurised metered-dose inhaler delivering an inhalation suspension.",
              clinicalParticulars: [
                {
                  id: "default-clinical-1",
                  subCategory: "therapeutic-indications",
                  value: "Maintenance treatment of adult patients with moderate-to-severe chronic obstructive pulmonary disease (COPD) not adequately controlled on dual bronchodilator or ICS/LABA therapy.",
                },
              ],
              pharmacologicalProperties: [
                {
                  id: "default-pharma-1",
                  subCategory: "pharmacodynamic",
                  value: "The combination provides anti-inflammatory effects with dual bronchodilation, improving airflow, lung function, and symptom control.",
                },
              ],
              pharmaceuticalParticulars: "Contains standard inhalation excipients; store and handle according to inhaler-specific instructions to ensure dose consistency.",
              regulatoryInfo: "Marketing authorisation held by the respective regulatory-approved pharmaceutical company.",
            },
            systemPrompt: `FINAL OBJECTION HANDLING SYSTEM PROMPT

Introduction Requirement
Before the objection-handling scenario begins, the system must generate a short, professional introduction.

This introduction should:
* Welcome the user into the objection-handling simulation
* Clarify that they will be practicing ACHE with a simulated pulmonologist
* Set expectations for the purpose and nature of the exercise

(Example tone: "Welcome to this objection-handling practice scenario. You will interact with a simulated pulmonologist to practice applying the ACHE model.")

Avatar Opening Line Requirement
Once the scenario begins, Dr. James must initiate the conversation first, using an appropriate, realistic opening line consistent with his persona.

The opener should be:
* Polite but efficient
* Reflective of a specialist's time pressures
* Aligned with his clinical, direct communication style

(Example tone: "Alright, I'm ready when you are. Which topic would you like to discuss today?")

Start
* Always begin by asking which objection the user wants to practice, referencing only the provided list.
* Confirm the objection is on the list before continuing.
* After confirmation, ask if the user is ready to start.
* After the user confirms, fully assume Dr. James's role, naturally raise the chosen objection, and stay in character throughout.

Role and Objective
* Your role: Simulated Specialist HCP for objection-handling practice
* Name: Dr. James
* Position: Pulmonologist
* Age: Early 40s
* Nationality: English
* Experience: Highly experienced in managing moderate-to-severe COPD
* Practice Setting: Specialized outpatient respiratory clinic
* User role: Medical / field representative practicing objection handling
* User's objective: Successfully apply the ACHE model and rebuttals to address Dr. James's objection and move toward product consideration.

Instructions
* Never ask questions to help the user reach their objective unless they effectively apply ACHE and objection-rebuttal techniques.
* Never proactively reveal information intended to help the user reach their objective unless they effectively apply ACHE or directly ask for it.
* Always stay fully in character as Dr. James, responding with his personality, beliefs, tone, attitudes, and clinical reasoning.
* If asked anything the role would not reasonably answer, respond succinctly while maintaining professional boundaries.
* Off-label comments are strictly not permitted.
* Use your own creativity and judgment to:
  1. Write an appropriate introduction before the users engage with the scenario.
  2. Have the avatar open the conversation with an appropriate opening line.
     (These two requirements must always be followed.)

Reasoning Steps
* Evaluate the user's input against the ACHE skill model:

  Effective Behavior
  * If the user applies ACHE effectively → Gradually and incrementally move toward resolving the objection and opening consideration for the product.

  Moderately Effective Behavior
  * Offer a balanced response → Acknowledge their effort, highlight missing components, but maintain some resistance.

  Low-Effectiveness Behavior
  * Respond in a way that naturally maintains the objection → Provide little movement, remain skeptical, and do not advance toward the user's objective.

* Never reveal these reasoning steps to the user.

Output Format
* Always respond in character as Dr. James.
* Use natural medical language, keep replies concise (1–2 short paragraphs).
* No meta-commentary, no instructions, no breaking character.
* Maintain clinical realism, time pressure, and his evidence-driven style.

Objection List & Rebuttals
* Only raise these objections when the user chooses one.
* Reveal rebuttal information only when earned through the ACHE model.

1. "I prefer to use LAMA/LABA for my COPD patients because of the risk of pneumonia associated with inhaled corticosteroids (ICS)."
   Rebuttal points (only reveal when earned):
   * Meta-analysis of multiple RCTs (>10,000 patients): no significant increase in pneumonia risk with certain ICS formulations.
   * The therapy's safety profile aligns with its component classes.
   * Relative pneumonia rates observed in studies vary across regimens; present comparative data only when earned.

2. "This triple therapy appears to have larger particles than other triple therapies. I believe extra-fine particles are better."
   Rebuttal points (only reveal when earned):
   * Particle diameter typically reported in the 3.1–3.8 µm range, which lies within an effective deposition window (1–5 µm).
   * Particles <1 µm risk exhalation; >5 µm tend to deposit in the oropharynx.
   * The delivery technology used supports consistent deposition across central and peripheral airways.

3. "I prefer once-daily dosing over twice-daily dosing."
   Rebuttal points (only reveal when earned):
   * Once-daily dosing is convenient, but onset of action and exacerbation reduction are also highly valued by patients and clinicians.
   * Some formulations show rapid<bos>achiever action (e.g., measurable FEV1 improvement within minutes) and meaningful reductions in exacerbations versus LAMA/LABA in trials.
   * Twice-daily dosing may support better day/night symptom control for some patients.
   * Dosing frequency is one of several factors influencing adherence.

Skill Model — ACHE
* Acknowledge: Show understanding of the clinician's concern.
* Clarify: Ask questions or paraphrase to ensure deeper understanding.
* Handle: Provide relevant, accurate, on‑label information that directly addresses the real reason behind the objection.
* Evaluate: Check if the concern has been adequately resolved and guide toward a partial next step.

Final Instructions
* Think step-by-step according to the Reasoning Steps, but output only Dr. James's final spoken response.
* Remain realistic, concise, and aligned with the pulmonologist persona.
* If the user demonstrates effective ACHE behavior, allow gradual progress.
* If not, maintain your position and do not help them reach the objective.
* Always preserve professional boundaries and avoid off-label guidance.

Mandatory: Introduction & Opening Line
* The system must always generate the short introduction (per "Introduction Requirement") before the scenario begins, and the avatar must always open with the specified style of line (per "Avatar Opening Line Requirement").

Notes
* This version removes specific product names and company branding and replaces them with neutral, clinical references while preserving the educational structure, ACHE framework, and role-play mechanics.
* Replace any remaining product-specific placeholders with neutral terms (e.g., "the therapy", "the formulation") when needed.`,
            feedbackPoints: [
              {
                id: "1",
                title: "Acknowledge the Objection",
                prompt:
                  "Evaluate whether the user clearly recognised and acknowledged Dr. James's objection in a respectful, non-defensive way that reflects his clinical concern back to him.",
                positiveMessage:
                  "You acknowledged Dr. James's concern clearly and respectfully. Your response demonstrated understanding of his clinical perspective and reflected his objection in his own language. This helps build rapport and shows you value his reasoning as a specialist.",
                negativeMessage:
                  "You missed the opportunity to acknowledge Dr. James's concern. The response either jumped too quickly into information, sounded dismissive, or didn't reflect the clinical impact of what he raised. This can make him feel unheard and less open to discussion.",
                useCustomGrades: false,
                ignoreFormatting: false,
              },
              {
                id: "2",
                title: "Clarify the Concern",
                prompt:
                  "Evaluate whether the user asked thoughtful clarifying questions or paraphrased Dr. James's concern to understand the true root of the objection before attempting to address it.",
                positiveMessage:
                  "You used effective clarifying questions to explore what truly lies behind Dr. James's concern. Your paraphrasing showed active listening and helped ensure you fully understood the priority from his clinical point of view.",
                negativeMessage:
                  "You did not sufficiently clarify Dr. James's concern. The response either assumed the underlying issue, skipped clarifying questions, or came across as interrogative. Without deeper understanding, the real driver of his objection remains unclear.",
                useCustomGrades: false,
                ignoreFormatting: false,
              },
              {
                id: "3",
                title: "Handle the Objection",
                prompt:
                  "Evaluate whether the user provided accurate, relevant, on-label information that directly addressed the true root of Dr. James's objection in a clear, clinically meaningful way.",
                positiveMessage:
                  "You addressed Dr. James's underlying concern effectively with clear, relevant, and on-label information. Your message stayed focused on what matters to him clinically and helped reduce his resistance in a balanced, evidence-based manner.",
                negativeMessage:
                  "Your handling did not fully address Dr. James's core concern. The response may have included irrelevant points, overly detailed information, or may have sounded defensive instead of supportive. This can make your message less convincing to him.",
                useCustomGrades: false,
                ignoreFormatting: false,
              },
              {
                id: "4",
                title: "Evaluate and Move Forward",
                prompt:
                  "Evaluate whether the user checked if Dr. James's concern was addressed and gently tested his comfort in considering a small, realistic next step.",
                positiveMessage:
                  "You evaluated Dr. James's comfort effectively by checking whether his concern was addressed and inviting him to share his perspective. This helps confirm alignment and supports a natural, clinically appropriate step forward in the discussion.",
                negativeMessage:
                  "You did not check whether Dr. James felt his concern was resolved. The response assumed agreement or pushed ahead without confirming comfort, which can create resistance and limit progress in the conversation.",
                useCustomGrades: false,
                ignoreFormatting: false,
              },
            ],
          },
        ],
      },
      // ADDING SECOND EPISODE FOR OBJECTOR FRAMEWORK
      {
        id: "2",
        title: "Pulmonologist Objection Practice — Objector Framework",
        description:
          "A concise, debranded role-play framework designed for training objection-handling skills. The AI acts as the objector, maintaining resistance until the learner effectively applies the ACHE model.",
        avatar: "Dr. James",
        voice: "Professional Voice",
        avatarInfo:
          "Dr. James is a specialist pulmonologist in his early 40s with extensive experience managing moderate-to-severe COPD patients.",
        slides: [
          {
            id: "slide-2-1",
            title: "Objection-Handling Objector Simulation Prompt",
            description:
              "A minimal system prompt where the AI plays the role of Dr. James, a clinically focused pulmonologist, raising realistic objections so learners can practice ACHE-based objection handling in a controlled simulation.",
            smpcData: {
              productName: "Fixed-dose inhaled triple therapy containing an inhaled corticosteroid (ICS), long-acting β2-agonist (LABA), and long-acting muscarinic antagonist (LAMA).",
              composition: "Each delivered dose contains defined amounts of an ICS, a LABA, and a LAMA as active substances.",
              pharmaceuticalForm: "Pressurised metered-dose inhaler delivering an inhalation suspension.",
              clinicalParticulars: [
                {
                  id: "default-clinical-2",
                  subCategory: "therapeutic-indications",
                  value: "Maintenance treatment of adult patients with moderate-to-severe chronic obstructive pulmonary disease (COPD) not adequately controlled on dual bronchodilator or ICS/LABA therapy.",
                },
              ],
              pharmacologicalProperties: [
                {
                  id: "default-pharma-2",
                  subCategory: "pharmacodynamic",
                  value: "The combination provides anti-inflammatory effects with dual bronchodilation, improving airflow, lung function, and symptom control.",
                },
              ],
              pharmaceuticalParticulars: "Contains standard inhalation excipients; store and handle according to inhaler-specific instructions to ensure dose consistency.",
              regulatoryInfo: "Marketing authorisation held by the respective regulatory-approved pharmaceutical company.",
            },
            systemPrompt: `Role: You are the objector that the learner must respond to.
Name: Dr. James
Persona:

Pulmonologist, early 40s

Direct, time-pressured, clinically focused

Evidence-driven and concise

Resistant until the learner applies ACHE skills effectively

Objective:
Help the learner practice objection-handling by raising realistic, clinically grounded objections and maintaining resistance until the learner successfully applies Acknowledge, Clarify, Handle, Evaluate (ACHE).

Start of Scenario

Ask the learner which objection they want to practice from the provided list.

Confirm it is valid.

Ask if they are ready.

When they confirm, raise the chosen objection in character as Dr. James.

Your Behavior (as the Objector)

Stay strictly in character as Dr. James.

Keep responses short, realistic, and clinically grounded.

Do not help the learner unless they demonstrate ACHE behaviors.

If they fail ACHE steps: maintain resistance politely.

If they apply ACHE well: gradually soften and move the conversation forward.

Never break character.

No off-label discussion.

Objection List (Depersonalised / Debranded)

"I prefer LAMA/LABA due to pneumonia risk with ICS."

"This formulation seems to have larger particles than extra-fine options."

"I prefer once-daily options over twice-daily dosing."

(Only raise vulnerabilities or rebuttal info when the learner earns it through ACHE.)

ACHE Reference (Internal Use Only — never reveal)

Acknowledge: Did they recognise and reflect your concern?

Clarify: Did they explore or paraphrase the real issue?

Handle: Did they respond with clear, on-label, relevant information?

Evaluate: Did they check your comfort before progressing?

Your replies must reflect how well they perform these steps.`,
            feedbackPoints: [
              {
                id: "2-1",
                title: "Acknowledge the Objection",
                prompt:
                  "Evaluate whether the user clearly recognised and acknowledged Dr. James's objection in a respectful, non-defensive way that reflects his clinical concern back to him.",
                positiveMessage:
                  "You acknowledged Dr. James's concern clearly and respectfully. Your response demonstrated understanding of his clinical perspective and reflected his objection in his own language. This helps build rapport and shows you value his reasoning as a specialist.",
                negativeMessage:
                  "You missed the opportunity to acknowledge Dr. James's concern. The response either jumped too quickly into information, sounded dismissive, or didn't reflect the clinical impact of what he raised. This can make him feel unheard and less open to discussion.",
                useCustomGrades: false,
                ignoreFormatting: false,
              },
              {
                id: "2-2",
                title: "Clarify the Concern",
                prompt:
                  "Evaluate whether the user asked thoughtful clarifying questions or paraphrased Dr. James's concern to understand the true root of the objection before attempting to address it.",
                positiveMessage:
                  "You used effective clarifying questions to explore what truly lies behind Dr. James's concern. Your paraphrasing showed active listening and helped ensure you fully understood the priority from his clinical point of view.",
                negativeMessage:
                  "You did not sufficiently clarify Dr. James's concern. The response either assumed the underlying issue, skipped clarifying questions, or came across as interrogative. Without deeper understanding, the real driver of his objection remains unclear.",
                useCustomGrades: false,
                ignoreFormatting: false,
              },
              {
                id: "2-3",
                title: "Handle the Objection",
                prompt:
                  "Evaluate whether the user provided accurate, relevant, on-label information that directly addressed the true root of Dr. James's objection in a clear, clinically meaningful way.",
                positiveMessage:
                  "You addressed Dr. James's underlying concern effectively with clear, relevant, and on-label information. Your message stayed focused on what matters to him clinically and helped reduce his resistance in a balanced, evidence-based manner.",
                negativeMessage:
                  "Your handling did not fully address Dr. James's core concern. The response may have included irrelevant points, overly detailed information, or may have sounded defensive instead of supportive. This can make your message less convincing to him.",
                useCustomGrades: false,
                ignoreFormatting: false,
              },
              {
                id: "2-4",
                title: "Evaluate and Move Forward",
                prompt:
                  "Evaluate whether the user checked if Dr. James's concern was addressed and gently tested his comfort in considering a small, realistic next step.",
                positiveMessage:
                  "You evaluated Dr. James's comfort effectively by checking whether his concern was addressed and inviting him to share his perspective. This helps confirm alignment and supports a natural, clinically appropriate step forward in the discussion.",
                negativeMessage:
                  "You did not check whether Dr. James felt his concern was resolved. The response assumed agreement or pushed ahead without confirming comfort, which can create resistance and limit progress in the conversation.",
                useCustomGrades: false,
                ignoreFormatting: false,
              },
            ],
          },
        ],
      },
    ],
  )
  const [expandedEpisode, setExpandedEpisode] = useState<string | null>(null)
  const [expandedSlide, setExpandedSlide] = useState<string | null>(null)

  const handleAddEpisode = () => {
    const newEpisode: Episode = {
      id: Date.now().toString(),
      title: "",
      description: "",
      avatar: "",
      voice: "",
      slides: [],
    }
    setEpisodes([...episodes, newEpisode])
    setExpandedEpisode(newEpisode.id)
  }

  const handleRemoveEpisode = (episodeId: string) => {
    setEpisodes(episodes.filter((ep) => ep.id !== episodeId))
  }

  const handleUpdateEpisode = (episodeId: string, updates: Partial<Episode>) => {
    setEpisodes(episodes.map((ep) => (ep.id === episodeId ? { ...ep, ...updates } : ep)))
  }

  const handleAddSlide = (episodeId: string) => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: "",
      description: "",
      systemPrompt: "",
      smpcData: {
        productName: "Fixed-dose inhaled triple therapy containing an inhaled corticosteroid (ICS), long-acting β2-agonist (LABA), and long-acting muscarinic antagonist (LAMA).",
        composition: "Each delivered dose contains defined amounts of an ICS, a LABA, and a LAMA as active substances.",
        pharmaceuticalForm: "Pressurised metered-dose inhaler delivering an inhalation suspension.",
        clinicalParticulars: [
          {
            id: "default-clinical-1",
            subCategory: "therapeutic-indications",
            value: "Maintenance treatment of adult patients with moderate-to-severe chronic obstructive pulmonary disease (COPD) not adequately controlled on dual bronchodilator or ICS/LABA therapy.",
          },
        ],
        pharmacologicalProperties: [
          {
            id: "default-pharma-1",
            subCategory: "pharmacodynamic",
            value: "The combination provides anti-inflammatory effects with dual bronchodilation, improving airflow, lung function, and symptom control.",
          },
        ],
        pharmaceuticalParticulars: "Contains standard inhalation excipients; store and handle according to inhaler-specific instructions to ensure dose consistency.",
        regulatoryInfo: "Marketing authorisation held by the respective regulatory-approved pharmaceutical company.",
      },
      feedbackPoints: [],
    }
    setEpisodes(episodes.map((ep) => (ep.id === episodeId ? { ...ep, slides: [...ep.slides, newSlide] } : ep)))
  }

  const handleRemoveSlide = (episodeId: string, slideId: string) => {
    setEpisodes(
      episodes.map((ep) =>
        ep.id === episodeId ? { ...ep, slides: ep.slides.filter((slide) => slide.id !== slideId) } : ep,
      ),
    )
  }

  const handleUpdateSlide = (episodeId: string, slideId: string, updates: Partial<Slide>) => {
    setEpisodes(
      episodes.map((ep) =>
        ep.id === episodeId
          ? {
              ...ep,
              slides: ep.slides.map((slide) => (slide.id === slideId ? { ...slide, ...updates } : slide)),
            }
          : ep,
      ),
    )
  }

  const handleAddFeedbackPoint = (episodeId: string, slideId: string) => {
    const newFeedbackPoint: FeedbackPoint = {
      id: Date.now().toString(),
      title: "",
      prompt: "",
      useCustomGrades: false,
      positiveMessage: "",
      negativeMessage: "",
      ignoreFormatting: false,
    }
    setEpisodes(
      episodes.map((ep) =>
        ep.id === episodeId
          ? {
              ...ep,
              slides: ep.slides.map((slide) =>
                slide.id === slideId
                  ? { ...slide, feedbackPoints: [...slide.feedbackPoints, newFeedbackPoint] }
                  : slide,
              ),
            }
          : ep,
      ),
    )
  }

  const handleRemoveFeedbackPoint = (episodeId: string, slideId: string, feedbackPointId: string) => {
    setEpisodes(
      episodes.map((ep) =>
        ep.id === episodeId
          ? {
              ...ep,
              slides: ep.slides.map((slide) =>
                slide.id === slideId
                  ? {
                      ...slide,
                      feedbackPoints: slide.feedbackPoints.filter((fp) => fp.id !== feedbackPointId),
                    }
                  : slide,
              ),
            }
          : ep,
      ),
    )
  }

  const handleUpdateFeedbackPoint = (
    episodeId: string,
    slideId: string,
    feedbackPointId: string,
    updates: Partial<FeedbackPoint>,
  ) => {
    setEpisodes(
      episodes.map((ep) =>
        ep.id === episodeId
          ? {
              ...ep,
              slides: ep.slides.map((slide) =>
                slide.id === slideId
                  ? {
                      ...slide,
                      feedbackPoints: slide.feedbackPoints.map((fp) =>
                        fp.id === feedbackPointId ? { ...fp, ...updates } : fp,
                      ),
                    }
                  : slide,
              ),
            }
          : ep,
      ),
    )
  }

  // SMPC Data handlers
  const getDefaultSMPCData = (): SMPCData => ({
    productName: "Fixed-dose inhaled triple therapy containing an inhaled corticosteroid (ICS), long-acting β2-agonist (LABA), and long-acting muscarinic antagonist (LAMA).",
    composition: "Each delivered dose contains defined amounts of an ICS, a LABA, and a LAMA as active substances.",
    pharmaceuticalForm: "Pressurised metered-dose inhaler delivering an inhalation suspension.",
    clinicalParticulars: [
      {
        id: "default-clinical-1",
        subCategory: "therapeutic-indications",
        value: "Maintenance treatment of adult patients with moderate-to-severe chronic obstructive pulmonary disease (COPD) not adequately controlled on dual bronchodilator or ICS/LABA therapy.",
      },
    ],
    pharmacologicalProperties: [
      {
        id: "default-pharma-1",
        subCategory: "pharmacodynamic",
        value: "The combination provides anti-inflammatory effects with dual bronchodilation, improving airflow, lung function, and symptom control.",
      },
    ],
    pharmaceuticalParticulars: "Contains standard inhalation excipients; store and handle according to inhaler-specific instructions to ensure dose consistency.",
    regulatoryInfo: "Marketing authorisation held by the respective regulatory-approved pharmaceutical company.",
  })

  const handleUpdateSMPCField = (
    episodeId: string,
    slideId: string,
    field: keyof SMPCData,
    value: string,
  ) => {
    setEpisodes(
      episodes.map((ep) =>
        ep.id === episodeId
          ? {
              ...ep,
              slides: ep.slides.map((slide) =>
                slide.id === slideId
                  ? {
                      ...slide,
                      smpcData: { ...(slide.smpcData || getDefaultSMPCData()), [field]: value },
                    }
                  : slide,
              ),
            }
          : ep,
      ),
    )
  }

  const handleAddClinicalParticular = (episodeId: string, slideId: string) => {
    const newItem: SMPCSubItem = {
      id: Date.now().toString(),
      subCategory: "therapeutic-indications",
      value: "",
    }
    setEpisodes(
      episodes.map((ep) =>
        ep.id === episodeId
          ? {
              ...ep,
              slides: ep.slides.map((slide) =>
                slide.id === slideId
                  ? {
                      ...slide,
                      smpcData: {
                        ...(slide.smpcData || getDefaultSMPCData()),
                        clinicalParticulars: [...(slide.smpcData?.clinicalParticulars || []), newItem],
                      },
                    }
                  : slide,
              ),
            }
          : ep,
      ),
    )
  }

  const handleRemoveClinicalParticular = (episodeId: string, slideId: string, itemId: string) => {
    setEpisodes(
      episodes.map((ep) =>
        ep.id === episodeId
          ? {
              ...ep,
              slides: ep.slides.map((slide) =>
                slide.id === slideId
                  ? {
                      ...slide,
                      smpcData: {
                        ...(slide.smpcData || getDefaultSMPCData()),
                        clinicalParticulars: (slide.smpcData?.clinicalParticulars || []).filter(
                          (item) => item.id !== itemId,
                        ),
                      },
                    }
                  : slide,
              ),
            }
          : ep,
      ),
    )
  }

  const handleUpdateClinicalParticular = (
    episodeId: string,
    slideId: string,
    itemId: string,
    updates: Partial<SMPCSubItem>,
  ) => {
    setEpisodes(
      episodes.map((ep) =>
        ep.id === episodeId
          ? {
              ...ep,
              slides: ep.slides.map((slide) =>
                slide.id === slideId
                  ? {
                      ...slide,
                      smpcData: {
                        ...(slide.smpcData || getDefaultSMPCData()),
                        clinicalParticulars: (slide.smpcData?.clinicalParticulars || []).map((item) =>
                          item.id === itemId ? { ...item, ...updates } : item,
                        ),
                      },
                    }
                  : slide,
              ),
            }
          : ep,
      ),
    )
  }

  const handleAddPharmacologicalProperty = (episodeId: string, slideId: string) => {
    const newItem: SMPCSubItem = {
      id: Date.now().toString(),
      subCategory: "pharmacodynamic",
      value: "",
    }
    setEpisodes(
      episodes.map((ep) =>
        ep.id === episodeId
          ? {
              ...ep,
              slides: ep.slides.map((slide) =>
                slide.id === slideId
                  ? {
                      ...slide,
                      smpcData: {
                        ...(slide.smpcData || getDefaultSMPCData()),
                        pharmacologicalProperties: [...(slide.smpcData?.pharmacologicalProperties || []), newItem],
                      },
                    }
                  : slide,
              ),
            }
          : ep,
      ),
    )
  }

  const handleRemovePharmacologicalProperty = (episodeId: string, slideId: string, itemId: string) => {
    setEpisodes(
      episodes.map((ep) =>
        ep.id === episodeId
          ? {
              ...ep,
              slides: ep.slides.map((slide) =>
                slide.id === slideId
                  ? {
                      ...slide,
                      smpcData: {
                        ...(slide.smpcData || getDefaultSMPCData()),
                        pharmacologicalProperties: (slide.smpcData?.pharmacologicalProperties || []).filter(
                          (item) => item.id !== itemId,
                        ),
                      },
                    }
                  : slide,
              ),
            }
          : ep,
      ),
    )
  }

  const handleUpdatePharmacologicalProperty = (
    episodeId: string,
    slideId: string,
    itemId: string,
    updates: Partial<SMPCSubItem>,
  ) => {
    setEpisodes(
      episodes.map((ep) =>
        ep.id === episodeId
          ? {
              ...ep,
              slides: ep.slides.map((slide) =>
                slide.id === slideId
                  ? {
                      ...slide,
                      smpcData: {
                        ...(slide.smpcData || getDefaultSMPCData()),
                        pharmacologicalProperties: (slide.smpcData?.pharmacologicalProperties || []).map((item) =>
                          item.id === itemId ? { ...item, ...updates } : item,
                        ),
                      },
                    }
                  : slide,
              ),
            }
          : ep,
      ),
    )
  }

  const handleSave = () => {
    const newTraining: Training = {
      id: training?.id || Date.now().toString(),
      title,
      description,
      language,
      avatar: selectedAvatar,
      voice: selectedVoice,
      episodes,
      totalSessions: training?.totalSessions || 0,
      latestSession: training?.latestSession || "1/1/70",
    }
    onSave(newTraining)
  }

  const handleNavigate = (index: number) => {
    if (index === 0) {
      onCancel()
    } else if (index === 1) {
      onCancel()
    }
  }

  return (
    <div className="container max-w-5xl mx-auto py-4 px-6 min-h-screen bg-background">
      <Navigation path={["Home", "Dashboard", "Training"]} onNavigate={handleNavigate} />
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold mb-1">Training Editor</h2>
          <p className="text-xs text-muted-foreground">Create and configure your training scenario</p>
        </div>
        <Button
          onClick={() => {
            const event = new CustomEvent("openPromptHub")
            window.dispatchEvent(event)
          }}
          variant="outline"
          className="gap-2 h-8 text-xs"
          size="sm"
        >
          <Sparkles className="w-3 h-3" />
          Prompt Hub
        </Button>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="title" className="text-xs font-medium">
                  Training Name
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="compliance"
                  className="h-9 text-[8px]"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="language" className="text-xs font-medium">
                  Language
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language" className="h-9 text-[8px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-xs font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter training description"
                rows={2}
                className="text-[8px]"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Episodes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {episodes.map((episode, index) => (
              <Card key={episode.id} className="border-primary/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      {index + 1}. {episode.title || "New Episode"}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setExpandedEpisode(expandedEpisode === episode.id ? null : episode.id)}
                        className="h-7 w-7 p-0"
                      >
                        <Play className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveEpisode(episode.id)}
                        className="h-7 w-7 p-0"
                      >
                        <X className="w-3 h-3 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {expandedEpisode === episode.id && (
                  <CardContent className="space-y-3 pt-0">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium">Title</Label>
                      <Input
                        value={episode.title}
                        onChange={(e) => handleUpdateEpisode(episode.id, { title: e.target.value })}
                        placeholder="Episode title"
                        className="h-9 text-[8px]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium">Description</Label>
                      <Textarea
                        value={episode.description}
                        onChange={(e) => handleUpdateEpisode(episode.id, { description: e.target.value })}
                        placeholder="Episode description"
                        rows={2}
                        className="text-[8px]"
                      />
                    </div>

                    {/* Avatar & Voice */}
                    <div className="space-y-3">
                      <Card className="border-muted bg-gradient-to-br from-pink-50 via-pink-100/50 to-rose-50 dark:from-pink-950 dark:via-pink-900/30 dark:to-rose-950">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-medium">Avatar & Voice</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-0">
                          {/* Avatar Image Preview */}
                          <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-full border-2 border-pink-300 dark:border-pink-700 overflow-hidden bg-white dark:bg-slate-800 flex items-center justify-center">
                              {episode.avatar ? (
                                <img
                                  src={
                                    episode.avatar === "Astra"
                                      ? "/images/image.png"
                                      : episode.avatar === "Dr. Roberts"
                                        ? "/images/HCP.png"
                                        : episode.avatar === "James Anderson"
                                          ? "/images/KAM.png"
                                          : episode.avatar === "Sarah Mitchell"
                                            ? "/images/Brand.png"
                                            : episode.avatar === "Dr. James"
                                              ? "https://img.freepik.com/premium-photo/serious-businessman-looking-camera_13339-71095.jpg"
                                              : "/images/image.png"
                                  }
                                  alt={episode.avatar}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <User className="w-10 h-10 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="space-y-1">
                                <Label className="text-xs font-medium">Avatar</Label>
                                <Select
                                  value={episode.avatar || ""}
                                  onValueChange={(value) => handleUpdateEpisode(episode.id, { avatar: value })}
                                >
                                  <SelectTrigger className="h-9 text-xs">
                                    <SelectValue placeholder="Select avatar" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Astra">Astra</SelectItem>
                                    <SelectItem value="Dr. Roberts">Dr. Roberts</SelectItem>
                                    <SelectItem value="James Anderson">James Anderson</SelectItem>
                                    <SelectItem value="Sarah Mitchell">Sarah Mitchell</SelectItem>
                                    <SelectItem value="Michael Chen">Michael Chen</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <Label className="text-xs font-medium">Voice</Label>
                            <Input
                              value={episode.voice || ""}
                              onChange={(e) => handleUpdateEpisode(episode.id, { voice: e.target.value })}
                              placeholder="Select voice"
                              className="h-9 text-xs"
                            />
                          </div>

                          {/* Avatar Info field */}
                          <div className="space-y-1">
                            <Label className="text-xs font-medium">Avatar Info (User view)</Label>
                            <Textarea
                              value={episode.avatarInfo || ""}
                              onChange={(e) => handleUpdateEpisode(episode.id, { avatarInfo: e.target.value })}
                              placeholder="Enter information about this avatar that users will see..."
                              className="min-h-[60px] text-xs resize-none"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-2 pt-1">
                      <Label className="text-[8px]">Slides</Label>
                      {episode.slides.map((slide, slideIndex) => (
                        <Card key={slide.id} className="border-muted bg-blue-50/50 dark:bg-blue-950/20">
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-xs font-medium">
                                Slide {slideIndex + 1}: {slide.title || "Untitled"}
                              </CardTitle>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setExpandedSlide(expandedSlide === slide.id ? null : slide.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Play className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleRemoveSlide(episode.id, slide.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <X className="w-3 h-3 text-destructive" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          {expandedSlide === slide.id && (
                            <CardContent className="space-y-2 pt-0">
                              <div className="space-y-1">
                                <Label className="text-xs font-medium">Title</Label>
                                <Input
                                  value={slide.title}
                                  onChange={(e) => handleUpdateSlide(episode.id, slide.id, { title: e.target.value })}
                                  placeholder="Slide title"
                                  className="h-8 text-xs"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs font-medium">Description</Label>
                                <Textarea
                                  value={slide.description}
                                  onChange={(e) =>
                                    handleUpdateSlide(episode.id, slide.id, { description: e.target.value })
                                  }
                                  placeholder="Slide description"
                                  rows={2}
                                  className="text-xs font-medium"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs font-medium">System Prompt</Label>
                                <Textarea
                                  value={slide.systemPrompt}
                                  onChange={(e) =>
                                    handleUpdateSlide(episode.id, slide.id, { systemPrompt: e.target.value })
                                  }
                                  placeholder="Enter system prompt for this slide"
                                  rows={4}
                                  className="text-xs font-medium"
                                />
                              </div>

                              {/* SMPC Card - Light Blue */}
                              <Card className="border-sky-200 dark:border-sky-800 bg-sky-50/70 dark:bg-sky-950/30">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-xs font-semibold text-sky-700 dark:text-sky-300">
                                    SMPC - A controlled knowledge boundary for the AI
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 pt-0">
                                  {/* 1. Name of the medicinal product */}
                                  <div className="space-y-1">
                                    <Label className="text-xs font-semibold">1. Name of the medicinal product</Label>
                                    <Input
                                      value={slide.smpcData?.productName || ""}
                                      onChange={(e) =>
                                        handleUpdateSMPCField(episode.id, slide.id, "productName", e.target.value)
                                      }
                                      placeholder="Enter product name"
                                      className="h-7 text-[6px]"
                                    />
                                  </div>

                                  {/* 2. Qualitative and quantitative composition */}
                                  <div className="space-y-1">
                                    <Label className="text-xs font-semibold">2. Qualitative and quantitative composition</Label>
                                    <Input
                                      value={slide.smpcData?.composition || ""}
                                      onChange={(e) =>
                                        handleUpdateSMPCField(episode.id, slide.id, "composition", e.target.value)
                                      }
                                      placeholder="Enter composition details"
                                      className="h-7 text-[6px]"
                                    />
                                  </div>

                                  {/* 3. Pharmaceutical form */}
                                  <div className="space-y-1">
                                    <Label className="text-xs font-semibold">3. Pharmaceutical form</Label>
                                    <Input
                                      value={slide.smpcData?.pharmaceuticalForm || ""}
                                      onChange={(e) =>
                                        handleUpdateSMPCField(episode.id, slide.id, "pharmaceuticalForm", e.target.value)
                                      }
                                      placeholder="Enter pharmaceutical form"
                                      className="h-7 text-[6px]"
                                    />
                                  </div>

                                  {/* 4. Clinical particulars - Dropdown + Add */}
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <Label className="text-xs font-semibold">4. Clinical particulars</Label>
                                      <Button
                                        onClick={() => handleAddClinicalParticular(episode.id, slide.id)}
                                        variant="outline"
                                        size="sm"
                                        className="h-5 text-[9px] px-2 border-sky-400/50 text-sky-600 hover:bg-sky-100 dark:hover:bg-sky-900 bg-transparent"
                                      >
                                        <Plus className="w-2 h-2 mr-1" />
                                        Add
                                      </Button>
                                    </div>
                                    {(slide.smpcData?.clinicalParticulars || []).map((item, idx) => (
                                      <div key={item.id} className="flex gap-2 items-start bg-sky-100/50 dark:bg-sky-900/30 p-2 rounded">
                                        <div className="flex-1 space-y-1">
                                          <Select
                                            value={item.subCategory}
                                            onValueChange={(value) =>
                                              handleUpdateClinicalParticular(episode.id, slide.id, item.id, { subCategory: value })
                                            }
                                          >
                                            <SelectTrigger className="h-7 text-xs">
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="therapeutic-indications" className="text-sm">4.1 Therapeutic indications</SelectItem>
                                              <SelectItem value="posology" className="text-sm">4.2 Posology and method of administration</SelectItem>
                                              <SelectItem value="contraindications" className="text-sm">4.3 Contraindications</SelectItem>
                                              <SelectItem value="warnings" className="text-sm">4.4 Special warnings and precautions</SelectItem>
                                              <SelectItem value="interactions" className="text-sm">4.5 Interaction with other medicinal products</SelectItem>
                                              <SelectItem value="fertility" className="text-sm">4.6 Fertility, pregnancy and lactation</SelectItem>
                                              <SelectItem value="driving" className="text-sm">4.7 Effects on ability to drive and use machines</SelectItem>
                                              <SelectItem value="undesirable-effects" className="text-sm">4.8 Undesirable effects</SelectItem>
                                              <SelectItem value="overdose" className="text-sm">4.9 Overdose</SelectItem>
                                            </SelectContent>
                                          </Select>
                                          <Input
                                            value={item.value}
                                            onChange={(e) =>
                                              handleUpdateClinicalParticular(episode.id, slide.id, item.id, { value: e.target.value })
                                            }
                                            placeholder="Enter details"
                                            className="h-6 text-[6px]"
                                          />
                                        </div>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={() => handleRemoveClinicalParticular(episode.id, slide.id, item.id)}
                                          className="h-5 w-5 p-0 mt-1"
                                        >
                                          <X className="w-2.5 h-2.5 text-destructive" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>

                                  {/* 5. Pharmacological properties - Dropdown + Add */}
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <Label className="text-xs font-semibold">5. Pharmacological properties</Label>
                                      <Button
                                        onClick={() => handleAddPharmacologicalProperty(episode.id, slide.id)}
                                        variant="outline"
                                        size="sm"
                                        className="h-5 text-[9px] px-2 border-sky-400/50 text-sky-600 hover:bg-sky-100 dark:hover:bg-sky-900 bg-transparent"
                                      >
                                        <Plus className="w-2 h-2 mr-1" />
                                        Add
                                      </Button>
                                    </div>
                                    {(slide.smpcData?.pharmacologicalProperties || []).map((item, idx) => (
                                      <div key={item.id} className="flex gap-2 items-start bg-sky-100/50 dark:bg-sky-900/30 p-2 rounded">
                                        <div className="flex-1 space-y-1">
                                          <Select
                                            value={item.subCategory}
                                            onValueChange={(value) =>
                                              handleUpdatePharmacologicalProperty(episode.id, slide.id, item.id, { subCategory: value })
                                            }
                                          >
                                            <SelectTrigger className="h-7 text-xs">
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="pharmacodynamic" className="text-sm">5.1 Pharmacodynamic properties</SelectItem>
                                              <SelectItem value="pharmacokinetic" className="text-sm">5.2 Pharmacokinetic properties</SelectItem>
                                              <SelectItem value="preclinical" className="text-sm">5.3 Preclinical safety data</SelectItem>
                                            </SelectContent>
                                          </Select>
                                          <Input
                                            value={item.value}
                                            onChange={(e) =>
                                              handleUpdatePharmacologicalProperty(episode.id, slide.id, item.id, { value: e.target.value })
                                            }
                                            placeholder="Enter details"
                                            className="h-6 text-[6px]"
                                          />
                                        </div>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={() => handleRemovePharmacologicalProperty(episode.id, slide.id, item.id)}
                                          className="h-5 w-5 p-0 mt-1"
                                        >
                                          <X className="w-2.5 h-2.5 text-destructive" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>

                                  {/* 6. Pharmaceutical particulars */}
                                  <div className="space-y-1">
                                    <Label className="text-xs font-semibold">6. Pharmaceutical particulars</Label>
                                    <Input
                                      value={slide.smpcData?.pharmaceuticalParticulars || ""}
                                      onChange={(e) =>
                                        handleUpdateSMPCField(episode.id, slide.id, "pharmaceuticalParticulars", e.target.value)
                                      }
                                      placeholder="Enter pharmaceutical particulars"
                                      className="h-7 text-[6px]"
                                    />
                                  </div>

                                  {/* 7-10. Regulatory & administrative info */}
                                  <div className="space-y-1">
                                    <Label className="text-xs font-semibold">7-10. Regulatory & administrative info</Label>
                                    <Input
                                      value={slide.smpcData?.regulatoryInfo || ""}
                                      onChange={(e) =>
                                        handleUpdateSMPCField(episode.id, slide.id, "regulatoryInfo", e.target.value)
                                      }
                                      placeholder="Enter regulatory and administrative information"
                                      className="h-7 text-[6px]"
                                    />
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Feedback Points Card - Yellow/Amber */}
                              <div className="space-y-2 pt-1">
                                <Label className="text-xs font-medium">Feedback Points</Label>
                                {slide.feedbackPoints.map((feedbackPoint, fpIndex) => (
                                  <Card
                                    key={feedbackPoint.id}
                                    className="border-muted/50 bg-amber-50/70 dark:bg-amber-950/30"
                                  >
                                    <CardHeader className="pb-2">
                                      <div className="flex items-center justify-between">
                                        <CardTitle className="text-xs font-semibold">
                                          Feedback Point {fpIndex + 1}
                                        </CardTitle>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={() =>
                                            handleRemoveFeedbackPoint(episode.id, slide.id, feedbackPoint.id)
                                          }
                                          className="h-5 w-5 p-0"
                                        >
                                          <X className="w-2.5 h-2.5 text-destructive" />
                                        </Button>
                                      </div>
                                    </CardHeader>
                                    <CardContent className="space-y-2 pt-0">
                                      <div className="space-y-1">
                                        <Label className="text-xs font-medium">Title</Label>
                                        <Input
                                          value={feedbackPoint.title}
                                          onChange={(e) =>
                                            handleUpdateFeedbackPoint(episode.id, slide.id, feedbackPoint.id, {
                                              title: e.target.value,
                                            })
                                          }
                                          placeholder="Feedback point title"
                                          className="h-7 text-[6px]"
                                        />
                                      </div>
                                      <div className="space-y-1">
                                        <Label className="text-xs font-medium">Prompt</Label>
                                        <Textarea
                                          value={feedbackPoint.prompt}
                                          onChange={(e) =>
                                            handleUpdateFeedbackPoint(episode.id, slide.id, feedbackPoint.id, {
                                              prompt: e.target.value,
                                            })
                                          }
                                          placeholder="Evaluation prompt"
                                          rows={2}
                                          className="text-xs font-medium"
                                        />
                                      </div>
                                      <div className="space-y-1">
                                        <Label className="text-xs font-medium">Positive Message</Label>
                                        <Textarea
                                          value={feedbackPoint.positiveMessage}
                                          onChange={(e) =>
                                            handleUpdateFeedbackPoint(episode.id, slide.id, feedbackPoint.id, {
                                              positiveMessage: e.target.value,
                                            })
                                          }
                                          placeholder="Message when condition is met"
                                          rows={2}
                                          className="text-xs font-medium"
                                        />
                                      </div>
                                      <div className="space-y-1">
                                        <Label className="text-xs font-medium">Negative Message</Label>
                                        <Textarea
                                          value={feedbackPoint.negativeMessage}
                                          onChange={(e) =>
                                            handleUpdateFeedbackPoint(episode.id, slide.id, feedbackPoint.id, {
                                              negativeMessage: e.target.value,
                                            })
                                          }
                                          placeholder="Message when condition is not met"
                                          rows={2}
                                          className="text-xs font-medium"
                                        />
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                                <Button
                                  onClick={() => handleAddFeedbackPoint(episode.id, slide.id)}
                                  variant="outline"
                                  size="sm"
                                  className="w-full border-primary/50 text-primary hover:bg-primary/10 h-8 text-xs bg-transparent"
                                >
                                  <Plus className="w-3 h-3 mr-2" />
                                  Add Feedback Point
                                </Button>
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      ))}
                      <Button
                        onClick={() => handleAddSlide(episode.id)}
                        variant="outline"
                        size="sm"
                        className="w-full border-primary/50 text-primary hover:bg-primary/10 h-8 text-xs bg-transparent"
                      >
                        <Plus className="w-3 h-3 mr-2" />
                        Add Slide
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </CardContent>
        </Card>

        <Button
          onClick={handleAddEpisode}
          variant="outline"
          className="w-full border-primary/50 text-primary hover:bg-primary/10 h-9 text-sm bg-transparent"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Episode
        </Button>

        <div className="flex justify-end gap-3 pt-2">
          <Button onClick={onCancel} variant="outline" size="sm" className="h-9 bg-transparent">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="gradient-pharma-1 text-primary-foreground hover:opacity-90 h-9"
            size="sm"
          >
            Save Training
          </Button>
        </div>
      </div>
    </div>
  )
}
