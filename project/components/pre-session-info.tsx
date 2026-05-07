"use client"

import type { Training } from "@/app/ai-coach/page"
import { ChevronRight, ArrowLeft } from "lucide-react"

interface PreSessionInfoProps {
  training: Training
  onStartSession: () => void
  onClose: () => void
}

export function PreSessionInfo({ training, onStartSession, onClose }: PreSessionInfoProps) {
  const getAvatarImage = (avatarName?: string, episodeTitle?: string) => {
    if (!avatarName) return "/images/image.png"

    // Specific episode override
    if (episodeTitle === "Pulmonologist Objection Practice — Objector Framework") {
      return "https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg?w=2000"
    }

    // Define female and male name patterns
    const femaleNames = ["Dr. Sarah Mitchell", "Dr. Clara Wynn", "Sarah Mitchell", "Dr. Liana Mercer"]
    const maleNames = [
      "Dr. James",
      "Dr. Robert Chen",
      "Dr. Michael Thompson",
      "James Anderson",
      "Michael Chen",
      "Dr. Thompson",
      "Robert Chen",
    ]

    // Female avatar images - Dr. Clara Wynn gets specific image
    const claraWynnImage = "/images/image.png"
    const femaleAvatarImage = "/images/image.png"

    // Male avatar images
    const maleAvatarImage = "https://img.freepik.com/premium-photo/serious-businessman-looking-camera_13339-71095.jpg"

    // Check specifically for Dr. Clara Wynn
    if (avatarName === "Dr. Clara Wynn") {
      return claraWynnImage
    }

    // Check if the name is in female names list
    if (femaleNames.includes(avatarName)) {
      return femaleAvatarImage
    }

    // Check if the name is in male names list
    if (maleNames.includes(avatarName)) {
      return maleAvatarImage
    }

    // Try to detect gender from common patterns
    const nameLower = avatarName.toLowerCase()

    // Female indicators
    if (
      nameLower.includes("sarah") ||
      nameLower.includes("clara") ||
      nameLower.includes("liana") ||
      (nameLower.includes("dr. mitchell") && nameLower.includes("sarah"))
    ) {
      return femaleAvatarImage
    }

    // Male indicators
    if (
      nameLower.includes("james") ||
      nameLower.includes("robert") ||
      nameLower.includes("michael") ||
      nameLower.includes("chen") ||
      nameLower.includes("thompson") ||
      nameLower.includes("anderson")
    ) {
      return maleAvatarImage
    }

    // Default to female avatar for Dr. Roberts
    if (avatarName === "Dr. Roberts") {
      return femaleAvatarImage
    }

    // Default fallback
    return femaleAvatarImage
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
      <div className="h-8 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500" />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-12">{training.title}</h1>

        <div className="space-y-6">
          {training.episodes && training.episodes.length > 0 ? (
            training.episodes.map((episode) => (
              <div
                key={episode.id}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
              >
                <div className="px-8 py-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{episode.title}</h2>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700" />

                <div className="px-8 py-6 space-y-4">
                  <div className="flex items-start justify-between gap-8">
                    <div className="flex gap-6 flex-1">
                      {/* Avatar Image */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900">
                          <img
                            src={getAvatarImage(episode.avatar, episode.title) || "/placeholder.svg"}
                            alt={episode.avatar || "Avatar"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Avatar Info - Right side of image */}
                      <div className="flex-1 bg-blue-50/80 dark:bg-blue-950/30 rounded-lg px-3 py-2 border border-blue-200/50 dark:border-blue-800/50">
                        <p className="text-xs font-semibold text-slate-900 dark:text-white">
                          {episode.avatarInfo || episode.avatar || "Default Avatar"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={onStartSession}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors group flex-shrink-0"
                    >
                      <span>START</span>
                      <div className="flex">
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        <ChevronRight className="w-4 h-4 -ml-2 transition-transform group-hover:translate-x-0.5" />
                        <ChevronRight className="w-4 h-4 -ml-2 transition-transform group-hover:translate-x-0.5" />
                        <ChevronRight className="w-4 h-4 -ml-2 transition-transform group-hover:translate-x-0.5" />
                        <ChevronRight className="w-4 h-4 -ml-2 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </button>
                  </div>

                  {/* Description - Below avatar and info */}
                  <div className="bg-slate-50/80 dark:bg-slate-900/30 rounded-lg px-4 py-3 border border-slate-200/50 dark:border-slate-700/50">
                    <p className="text-sm text-slate-700 dark:text-slate-300">{episode.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
              <div className="px-8 py-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Coaching Session</h2>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700" />
              <div className="px-8 py-6 flex items-center justify-between gap-8">
                <p className="text-sm text-slate-700 dark:text-slate-300 flex-1">
                  {training.description || "Begin your coaching session"}
                </p>
                <button
                  onClick={onStartSession}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                >
                  <span>START</span>
                  <div className="flex">
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    <ChevronRight className="w-4 h-4 -ml-2 transition-transform group-hover:translate-x-0.5" />
                    <ChevronRight className="w-4 h-4 -ml-2 transition-transform group-hover:translate-x-0.5" />
                    <ChevronRight className="w-4 h-4 -ml-2 transition-transform group-hover:translate-x-0.5" />
                    <ChevronRight className="w-4 h-4 -ml-2 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {training.description && training.episodes.length > 1 && (
          <div className="mt-8 px-8 py-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">About This Coaching</h3>
            <p className="text-xs text-slate-700 dark:text-slate-300">{training.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}
