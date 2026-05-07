"use client"

import { ChevronRight } from "lucide-react"

interface NavigationProps {
  path: string[]
  onNavigate?: (index: number) => void
}

export function Navigation({ path, onNavigate }: NavigationProps) {
  return (
    <nav className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center gap-2 text-sm">
          {path.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              {index < path.length - 1 ? (
                <button
                  onClick={() => onNavigate?.(index)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </button>
              ) : (
                <span className="text-foreground font-medium">{item}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}
