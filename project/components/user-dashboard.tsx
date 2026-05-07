"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, PlayCircle, BarChart3, Users, Award, TrendingUp } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface Training {
  id: string
  title: string
  description: string
  sharedBy: string
  sharedDate: string
  progress: number
  totalSessions: number
  completedSessions: number
  lastAccessed: string
  category: string
}

interface UserDashboardProps {
  onBack: () => void
  userEmail: string
}

// Sample data
const sharedTrainings: Training[] = [
  {
    id: "1",
    title: "Patient-Centred Pathways to PulmoNexa",
    description: "A coaching module designed to build effective, patient-centred dialogue with cautious clinicians.",
    sharedBy: "admin@example.com",
    sharedDate: "2024-01-15",
    progress: 65,
    totalSessions: 12,
    completedSessions: 8,
    lastAccessed: "2 hours ago",
    category: "Clinical",
  },
  {
    id: "2",
    title: "HCP Coaching",
    description: "Healthcare professional coaching focused on patient communication and care excellence.",
    sharedBy: "trainer@example.com",
    sharedDate: "2024-01-10",
    progress: 80,
    totalSessions: 8,
    completedSessions: 6,
    lastAccessed: "1 day ago",
    category: "Professional",
  },
  {
    id: "3",
    title: "Compliance Coaching",
    description: "Essential compliance and regulatory coaching for healthcare representatives.",
    sharedBy: "admin@example.com",
    sharedDate: "2024-01-08",
    progress: 45,
    totalSessions: 2,
    completedSessions: 1,
    lastAccessed: "3 days ago",
    category: "Compliance",
  },
]

const weeklyProgressData = [
  { day: "Mon", sessions: 3 },
  { day: "Tue", sessions: 5 },
  { day: "Wed", sessions: 4 },
  { day: "Thu", sessions: 6 },
  { day: "Fri", sessions: 4 },
  { day: "Sat", sessions: 2 },
  { day: "Sun", sessions: 1 },
]

const categoryData = [
  { name: "Clinical", value: 40, color: "#3b82f6" },
  { name: "Professional", value: 35, color: "#10b981" },
  { name: "Compliance", value: 25, color: "#f59e0b" },
]

export function UserDashboard({ onBack, userEmail }: UserDashboardProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-6">
        <Button onClick={() => router.push("/")} variant="ghost" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Coaching Dashboard</h1>
            <p className="text-muted-foreground mt-1">{userEmail}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-blue-500 text-white">Active User</Badge>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Shared Coachings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{sharedTrainings.length}</div>
              <Users className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">22</div>
              <PlayCircle className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">63%</div>
              <TrendingUp className="w-8 h-8 text-orange-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">5</div>
              <Award className="w-8 h-8 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shared Trainings - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-4">Shared Coaching Programs</h2>
          {sharedTrainings.map((training) => (
            <Card key={training.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{training.title}</CardTitle>
                    <CardDescription className="mt-2">{training.description}</CardDescription>
                  </div>
                  <Badge variant="outline">{training.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold">{training.progress}%</span>
                    </div>
                    <Progress value={training.progress} className="h-2" />
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Sessions</div>
                      <div className="font-semibold">
                        {training.completedSessions}/{training.totalSessions}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Shared By</div>
                      <div className="font-semibold text-xs">{training.sharedBy}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Last Accessed</div>
                      <div className="font-semibold">{training.lastAccessed}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button>
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Continue Coaching
                    </Button>
                    <Button variant="outline">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Sidebar - Takes 1 column */}
        <div className="space-y-4">
          {/* Weekly Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Weekly Activity</CardTitle>
              <CardDescription>Coaching sessions this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Coaching Categories</CardTitle>
              <CardDescription>Distribution by type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span>{cat.name}</span>
                    </div>
                    <span className="font-semibold">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Completed Session</div>
                    <div className="text-xs text-muted-foreground">Patient-Centred Pathways</div>
                    <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">New Coaching Shared</div>
                    <div className="text-xs text-muted-foreground">HCP Coaching</div>
                    <div className="text-xs text-muted-foreground mt-1">1 day ago</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Achievement Unlocked</div>
                    <div className="text-xs text-muted-foreground">10 Sessions Milestone</div>
                    <div className="text-xs text-muted-foreground mt-1">3 days ago</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
