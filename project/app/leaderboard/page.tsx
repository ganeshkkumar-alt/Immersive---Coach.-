import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react'

const leaderboardData = [
  {
    rank: 1,
    name: "Michael Chen",
    avatar: "/professional-man.jpg",
    points: 2850,
    coursesCompleted: 8,
    avgScore: 94,
    badges: 12,
    trend: "up"
  },
  {
    rank: 2,
    name: "Jennifer Williams",
    avatar: "/professional-woman-diverse.png",
    points: 2720,
    coursesCompleted: 7,
    avgScore: 92,
    badges: 10,
    trend: "up"
  },
  {
    rank: 3,
    name: "David Rodriguez",
    avatar: "/professional-man-2.png",
    points: 2650,
    coursesCompleted: 7,
    avgScore: 91,
    badges: 9,
    trend: "same"
  },
  {
    rank: 4,
    name: "Emily Thompson",
    avatar: "/professional-woman-2.png",
    points: 2580,
    coursesCompleted: 6,
    avgScore: 90,
    badges: 8,
    trend: "up"
  },
  {
    rank: 12,
    name: "Sarah Anderson (You)",
    avatar: "/professional-woman-3.png",
    points: 2240,
    coursesCompleted: 6,
    avgScore: 85,
    badges: 7,
    trend: "up",
    isCurrentUser: true
  },
]

const topPerformers = leaderboardData.slice(0, 3)
const others = leaderboardData.slice(3)

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen ml-16">
      <main className="flex-1">
        <div className="container mx-auto p-8">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-balance">Leaderboard</h1>
            <p className="text-lg text-muted-foreground">See how you rank among pharmaceutical sales professionals nationwide</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Leaderboard */}
            <div className="lg:col-span-2">
              {/* Top 3 Podium */}
              <Card className="mb-6 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-amber-500/10 via-slate-500/10 to-orange-500/10">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    Top Performers This Month
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-3 gap-4">
                    {/* 2nd Place */}
                    <div className="order-1 text-center">
                      <div className="mb-3 flex justify-center">
                        <div className="relative">
                          <Avatar className="h-20 w-20 border-4 border-slate-400">
                            <AvatarImage src={topPerformers[1].avatar || "/placeholder.svg"} />
                            <AvatarFallback>{topPerformers[1].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-2 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-slate-400 text-sm font-bold text-white">
                            2
                          </div>
                        </div>
                      </div>
                      <h3 className="mb-1 font-semibold text-balance">{topPerformers[1].name}</h3>
                      <p className="text-2xl font-bold text-slate-600">{topPerformers[1].points}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>

                    {/* 1st Place */}
                    <div className="order-2 text-center">
                      <div className="mb-3 flex justify-center">
                        <div className="relative">
                          <Avatar className="h-24 w-24 border-4 border-amber-500">
                            <AvatarImage src={topPerformers[0].avatar || "/placeholder.svg"} />
                            <AvatarFallback>{topPerformers[0].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-2 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-amber-500 text-base font-bold text-white">
                            <Trophy className="h-5 w-5" />
                          </div>
                        </div>
                      </div>
                      <h3 className="mb-1 font-semibold text-balance">{topPerformers[0].name}</h3>
                      <p className="text-3xl font-bold text-amber-600">{topPerformers[0].points}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>

                    {/* 3rd Place */}
                    <div className="order-3 text-center">
                      <div className="mb-3 flex justify-center">
                        <div className="relative">
                          <Avatar className="h-20 w-20 border-4 border-orange-600">
                            <AvatarImage src={topPerformers[2].avatar || "/placeholder.svg"} />
                            <AvatarFallback>{topPerformers[2].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-2 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white">
                            3
                          </div>
                        </div>
                      </div>
                      <h3 className="mb-1 font-semibold text-balance">{topPerformers[2].name}</h3>
                      <p className="text-2xl font-bold text-orange-600">{topPerformers[2].points}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Full Leaderboard */}
              <Card>
                <CardHeader>
                  <CardTitle>National Rankings</CardTitle>
                  <CardDescription>Updated daily based on course completion and quiz scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {others.map((user) => (
                      <div
                        key={user.rank}
                        className={`flex items-center gap-4 rounded-lg border p-4 ${
                          user.isCurrentUser ? 'border-primary bg-primary/5' : ''
                        }`}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted font-bold">
                          {user.rank}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {user.coursesCompleted} courses • {user.avgScore}% avg
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">{user.points}</p>
                          <p className="text-xs text-muted-foreground">points</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {user.trend === "up" && (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          )}
                          <Badge variant="secondary">{user.badges} badges</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Stats</CardTitle>
                  <CardDescription>Your performance this month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current Rank</span>
                    <span className="text-2xl font-bold">#12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Points</span>
                    <span className="text-2xl font-bold">2,240</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Next Rank</span>
                    <span className="text-lg font-semibold">180 pts</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Recent Badges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col items-center rounded-lg border p-3 text-center">
                      <Medal className="mb-2 h-8 w-8 text-amber-500" />
                      <span className="text-xs font-medium">Quiz Master</span>
                    </div>
                    <div className="flex flex-col items-center rounded-lg border p-3 text-center">
                      <Trophy className="mb-2 h-8 w-8 text-blue-500" />
                      <span className="text-xs font-medium">Fast Learner</span>
                    </div>
                    <div className="flex flex-col items-center rounded-lg border p-3 text-center">
                      <Award className="mb-2 h-8 w-8 text-green-500" />
                      <span className="text-xs font-medium">Top Performer</span>
                    </div>
                    <div className="flex flex-col items-center rounded-lg border p-3 text-center">
                      <Medal className="mb-2 h-8 w-8 text-purple-500" />
                      <span className="text-xs font-medium">Consistent</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How to Climb</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <span>Complete courses to earn 100 points each</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Medal className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <span>Score 90%+ on quizzes for bonus points</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Award className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <span>Practice with MetaCoach AI daily</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
