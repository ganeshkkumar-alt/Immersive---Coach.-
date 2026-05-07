"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, ThumbsDown } from "lucide-react"

interface FeedbackButtonsProps {
  onFeedback?: (type: "positive" | "negative", notes?: string) => void
  showNotes?: boolean
}

export function FeedbackButtons({ onFeedback, showNotes = true }: FeedbackButtonsProps) {
  const [selected, setSelected] = useState<"positive" | "negative" | null>(null)
  const [notes, setNotes] = useState("")
  const [showNotesInput, setShowNotesInput] = useState(false)

  const handleClick = (type: "positive" | "negative") => {
    setSelected(type)
    setShowNotesInput(true)
    console.log("[v0] Feedback button clicked:", type)
  }

  const handleSubmit = () => {
    if (selected) {
      onFeedback?.(selected, notes)
      console.log("[v0] Feedback submitted:", { type: selected, notes })
      // Reset after submission
      setTimeout(() => {
        setShowNotesInput(false)
        setNotes("")
      }, 500)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground mr-2">How was your experience?</span>
        <Button
          onClick={() => handleClick("positive")}
          variant="outline"
          size="sm"
          className={`gap-2 ${selected === "positive" ? "bg-green-50 border-green-500 text-green-700 dark:bg-green-950/20 dark:text-green-400" : ""}`}
        >
          <ThumbsUp className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => handleClick("negative")}
          variant="outline"
          size="sm"
          className={`gap-2 ${selected === "negative" ? "bg-red-50 border-red-500 text-red-700 dark:bg-red-950/20 dark:text-red-400" : ""}`}
        >
          <ThumbsDown className="w-4 h-4" />
        </Button>
      </div>

      {showNotes && showNotesInput && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <Textarea
            placeholder="Any improvement needed for the AI agent? (Optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[80px] resize-none"
          />
          <Button onClick={handleSubmit} size="sm" className="w-full">
            Submit Feedback
          </Button>
        </div>
      )}
    </div>
  )
}
