import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PlayCircle, CheckCircle2 } from 'lucide-react'

const inProgressCourses = [
  {
    id: 1,
    title: "Pharmaceutical Sales Fundamentals",
    currentLesson: "Module 3: Customer Engagement Techniques",
    progress: 65,
    totalLessons: 12,
    completedLessons: 8,
    image: "/pharmaceutical-lab-scientist.jpg",
    nextLesson: "Building Trust with Healthcare Professionals",
    timeRemaining: "15 min"
  },
  {
    id: 3,
    title: "Building Relationships with Healthcare Providers",
    currentLesson: "Module 5: Advanced Communication Skills",
    progress: 90,
    totalLessons: 10,
    completedLessons: 9,
    image: "/doctor-consultation-meeting.jpg",
    nextLesson: "Handling Objections Professionally",
    timeRemaining: "12 min"
  },
  {
    id: 6,
    title: "Territory Management & Strategic Planning",
    currentLesson: "Module 4: Account Prioritization",
    progress: 55,
    totalLessons: 14,
    completedLessons: 8,
    image: "/business-strategy-planning-map.jpg",
    nextLesson: "Using CRM Systems Effectively",
    timeRemaining: "20 min"
  },
]

const recommendedCourses = [
  {
    id: 2,
    title: "Medical Terminology & Drug Classifications",
    description: "Build your medical vocabulary and understand drug categories",
    duration: "12 hours",
    level: "Intermediate",
    image: "/medical-pills-capsules.jpg"
  },
  {
    id: 4,
    title: "FDA Regulations & Compliance",
    description: "Master regulatory requirements for pharma sales",
    duration: "10 hours",
    level: "Advanced",
    image: "/pharmaceutical-regulatory-documents.jpg"
  },
]

export default function ContinueLearningPage() {
  return (
    <div className="min-h-screen ml-16">
      <main className="flex-1">
        <div className="container mx-auto p-8">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-balance">Continue Learning</h1>
            <p className="text-lg text-muted-foreground">Pick up where you left off and keep building your expertise</p>
          </div>

          {/* In Progress Section */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold text-balance">In Progress</h2>
            <div className="space-y-4">
              {inProgressCourses.map((course) => (
                <Card key={course.id}>
                  <div className="flex flex-col gap-6 p-6 md:flex-row">
                    <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted md:w-64">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <Badge variant="secondary">{course.completedLessons}/{course.totalLessons} lessons</Badge>
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-balance">{course.title}</h3>
                        <p className="mb-4 text-sm text-muted-foreground">Current: {course.currentLesson}</p>
                        <div className="mb-4 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Course Progress</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button className="gap-2">
                          <PlayCircle className="h-4 w-4" />
                          Continue: {course.nextLesson}
                        </Button>
                        <span className="text-sm text-muted-foreground">{course.timeRemaining} remaining</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Recommended Next Section */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold text-balance">Recommended Next</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {recommendedCourses.map((course) => (
                <Card key={course.id} className="flex flex-col overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant="secondary">{course.level}</Badge>
                      <span className="text-xs text-muted-foreground">{course.duration}</span>
                    </div>
                    <CardTitle className="text-lg text-balance">{course.title}</CardTitle>
                    <CardDescription className="text-sm text-pretty">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Button className="w-full">Start Course</Button>
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
