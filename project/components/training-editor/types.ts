import type { Training } from "@/app/ai-coach/page"

export interface TrainingEditorProps {
  training?: Training
  onSave: (training: Training) => void
  onCancel: () => void
}
