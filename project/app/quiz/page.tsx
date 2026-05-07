"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Trophy, Target, CheckCircle2 } from 'lucide-react'
import { useState } from "react"

const availableQuizzes = [
  {
    id: 1,
    title: "Pharmaceutical Sales Fundamentals",
    questions: 20,
    duration: "30 min",
    difficulty: "Beginner",
    passingScore: 70,
    attempts: 2,
    bestScore: 85,
    category: "Core Skills"
  },
  {
    id: 2,
    title: "Medical Terminology Assessment",
    questions: 25,
    duration: "40 min",
    difficulty: "Intermediate",
    passingScore: 75,
    attempts: 1,
    bestScore: 78,
    category: "Medical Knowledge"
  },
  {
    id: 3,
    title: "FDA Regulations & Compliance",
    questions: 30,
    duration: "45 min",
    difficulty: "Advanced",
    passingScore: 80,
    attempts: 0,
    bestScore: null,
    category: "Regulatory"
  },
  {
    id: 4,
    title: "Clinical Trial Data Interpretation",
    questions: 15,
    duration: "25 min",
    difficulty: "Advanced",
    passingScore: 80,
    attempts: 0,
    bestScore: null,
    category: "Clinical Research"
  },
  {
    id: 5,
    title: "Territory Management Strategies",
    questions: 18,
    duration: "30 min",
    difficulty: "Intermediate",
    passingScore: 75,
    attempts: 3,
    bestScore: 92,
    category: "Business Strategy"
  },
]

export default function QuizPage() {
  return (
    <div className="min-h-screen ml-16">
      <main className="flex-1">
        <div className="container mx-auto p-8">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-balance">Take a Quiz</h1>
            <p className="text-lg text-muted-foreground">Test your knowledge and earn certifications</p>
          </div>

          {/* Stats Overview */}
          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">3 this week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-green-600">+5% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">11/12 passed</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.5 hrs</div>
                <p className="text-xs text-muted-foreground">Average prep time</p>
              </CardContent>
            </Card>
          </div>

          {/* Available Quizzes */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold text-balance">Available Quizzes</h2>
            <div className="space-y-4">
              {availableQuizzes.map((quiz) => (
                <Card key={quiz.id}>
                  <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <Badge variant="outline">{quiz.category}</Badge>
                          <Badge variant={
                            quiz.difficulty === "Beginner" ? "secondary" :
                            quiz.difficulty === "Intermediate" ? "default" : "destructive"
                          }>
                            {quiz.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl text-balance">{quiz.title}</CardTitle>
                        <CardDescription className="mt-2 flex flex-wrap items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Target className="h-4 w-4" />
                            {quiz.questions} questions
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {quiz.duration}
                          </span>
                          <span>Passing: {quiz.passingScore}%</span>
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        {quiz.bestScore !== null ? (
                          <div>
                            <div className="text-2xl font-bold">{quiz.bestScore}%</div>
                            <div className="text-xs text-muted-foreground">Best Score</div>
                            <div className="mt-1 text-xs text-muted-foreground">{quiz.attempts} attempts</div>
                          </div>
                        ) : (
                          <Badge variant="outline">Not Attempted</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between gap-4">
                      {quiz.bestScore !== null && (
                        <div className="flex-1">
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress to certification</span>
                            <span className="font-medium">{quiz.bestScore}%</span>
                          </div>
                          <Progress value={quiz.bestScore} className="h-2" />
                        </div>
                      )}
                      <Button variant={quiz.bestScore === null ? "default" : "outline"}>
                        {quiz.bestScore === null ? "Start Quiz" : "Retake Quiz"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
