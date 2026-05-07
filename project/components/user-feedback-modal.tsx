"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, ThumbsDown, X } from "lucide-react"

interface UserFeedbackModalProps {
  onClose: () => void
  onSubmit?: (feedback: { type: "positive" | "negative"; message: string }) => void
}

export function UserFeedbackModal({ onClose, onSubmit }: UserFeedbackModalProps) {
  const [feedbackType, setFeedbackType] = useState<"positive" | "negative" | null>(null)
  const [message, setMessage] = useState("")

  const handleSubmit = () => {
    if (feedbackType) {
      console.log("[v0] Feedback submitted:", { type: feedbackType, message })
      onSubmit?.({ type: feedbackType, message })
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Share Your Feedback</h3>
            <button
              onClick={onClose}
              className="w-6 h-6 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-muted-foreground mb-6">How was your experience?</p>

          {/* Thumb buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setFeedbackType("positive")}
              className={`flex-1 p-6 rounded-lg border-2 transition-all ${
                feedbackType === "positive"
                  ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                  : "border-border hover:border-green-300"
              }`}
            >
              <ThumbsUp
                className={`w-8 h-8 mx-auto mb-2 ${feedbackType === "positive" ? "text-green-600" : "text-muted-foreground"}`}
              />
              <p className="text-sm font-medium">Good</p>
            </button>

            <button
              onClick={() => setFeedbackType("negative")}
              className={`flex-1 p-6 rounded-lg border-2 transition-all ${
                feedbackType === "negative"
                  ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                  : "border-border hover:border-red-300"
              }`}
            >
              <ThumbsDown
                className={`w-8 h-8 mx-auto mb-2 ${feedbackType === "negative" ? "text-red-600" : "text-muted-foreground"}`}
              />
              <p className="text-sm font-medium">Needs Work</p>
            </button>
          </div>

          {/* Message textarea */}
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">Additional Comments (Optional)</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us more about your experience..."
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Submit button */}
          <div className="flex gap-2">
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!feedbackType} className="flex-1">
              Submit Feedback
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
