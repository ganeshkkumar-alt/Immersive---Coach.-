"use client"

import { Home, BookOpen, Bot, ClipboardList, Trophy, BookMarked, ChevronLeft, ChevronRight, ChevronDown, Users, MessageSquare, LogOut, Lock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"
import { useState } from "react"

const navigationItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    title: "Continue Learning",
    icon: BookOpen,
    href: "/continue-learning",
  },
  {
    title: "Immersive Modules",
    icon: Bot,
    href: "/interactive-ai",
    subItems: [
      {
        title: "Persona Avatars",
        icon: Users,
        href: "/interactive-ai/persona-avatars",
      },
      {
        title: "Role Play & Coaching",
        icon: MessageSquare,
        href: "/interactive-ai",
        locked: true,
      },
    ],
  },
  {
    title: "Take a Quiz",
    icon: ClipboardList,
    href: "/quiz",
  },
  {
    title: "Leaderboard",
    icon: Trophy,
    href: "/leaderboard",
  },
  {
    title: "Knowledge Hub",
    icon: BookMarked,
    href: "/knowledge-hub",
  },
]

export function SidebarNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [expandedItems, setExpandedItems] = useState<string[]>(["Immersive Modules"])

  if (pathname === "/login") {
    return null
  }

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title) ? prev.filter(item => item !== title) : [...prev, title]
    )
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    router.push("/login")
    router.refresh()
  }

  return (
    <aside
      data-sidebar
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        
        {!isCollapsed && (
          <div className="border-b border-sidebar-border px-4 py-4">
            <p className="text-sm font-medium text-sidebar-foreground text-center">
              Interactivity - Persona Avatar
            </p>
          </div>
        )}
        
        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3 overflow-y-auto pt-4">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            const isExpanded = expandedItems.includes(item.title)
            const hasSubItems = item.subItems && item.subItems.length > 0

            if (hasSubItems && !isCollapsed) {
              return (
                <div key={item.title}>
                  <button
                    onClick={() => toggleExpanded(item.title)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      pathname.startsWith(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isExpanded ? "rotate-180" : ""
                      )}
                    />
                  </button>
                  {isExpanded && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-sidebar-border pl-4">
                      {item.subItems.map((subItem) => {
                        const isSubActive = pathname === subItem.href
                        const isLocked = subItem.locked
                        
                        if (isLocked) {
                          return (
                            <div
                              key={subItem.href}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors cursor-not-allowed opacity-60",
                                "text-sidebar-foreground"
                              )}
                            >
                              <Lock className="h-4 w-4 shrink-0" />
                              <span>{subItem.title}</span>
                            </div>
                          )
                        }
                        
                        return (
                          <Link key={subItem.href} href={subItem.href}>
                            <div
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                isSubActive
                                  ? "bg-primary text-primary-foreground"
                                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                              )}
                            >
                              <subItem.icon className="h-4 w-4 shrink-0" />
                              <span>{subItem.title}</span>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 shrink-0", isCollapsed && "mx-auto")} />
                  {!isCollapsed && <span>{item.title}</span>}
                </div>
              </Link>
            )
          })}
        </nav>

        {!isCollapsed && (
          <div className="border-t border-sidebar-border p-3">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        )}

        {/* Language Selector */}
        {!isCollapsed && (
          <div className="border-t border-sidebar-border p-4">
            <div className="mb-2 text-xs font-medium text-sidebar-foreground">Language:</div>
            <select className="w-full rounded-lg border border-sidebar-border bg-sidebar px-3 py-2 text-sm text-sidebar-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        )}
      </div>
    </aside>
  )
}
