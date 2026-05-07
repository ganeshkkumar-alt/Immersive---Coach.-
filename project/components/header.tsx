"use client"

import { Button } from "@/components/ui/button"
import { Users, FileText } from "lucide-react"

interface HeaderProps {
  currentView: "home" | "dashboard" | "editor"
  onTrainClick: () => void
  onCollaborationClick?: () => void
  onUserDashboardClick?: () => void
  onAnalysisVideo?: () => void
}

export function Header({
  currentView,
  onTrainClick,
  onCollaborationClick,
  onUserDashboardClick,
  onAnalysisVideo,
}: HeaderProps) {
  return (
    <header className="relative z-50 flex items-center justify-between px-6 py-1">
      <div>
        <img src="/images/logo-202.png" alt="Immersive Studio" className="h-10 w-auto object-contain" />
      </div>
      <div className="flex items-center gap-3">
        {currentView === "dashboard" && (
          <Button
            onClick={() => {
              window.open(
                "https://indegene123-my.sharepoint.com/:b:/g/personal/anish_m_indegene_com/IQDq1MmhpzhXT7gzLXkA-Y3JAeSsVrhOYhAISTr1IjfkZsI?download=1",
                "_blank",
                "noopener,noreferrer"
              )
            }}
            variant="outline"
            size="xs"
            className="flex items-center gap-1.5 text-xs px-2 py-1 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 bg-transparent text-emerald-700 dark:text-emerald-300"
          >
            <FileText className="w-3 h-3" />
            Sample Feedback
          </Button>
        )}
        {currentView === "dashboard" && onCollaborationClick && (
          <Button
            onClick={onCollaborationClick}
            variant="outline"
            size="xs"
            className="flex items-center gap-1.5 text-xs px-2 py-1 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/30 bg-transparent"
          >
            <Users className="w-3 h-3" />
            User Collaboration
          </Button>
        )}
      </div>
    </header>
  )
}
