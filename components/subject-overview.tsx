import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calculator, Atom, FileText, BookOpen, Play, CheckCircle, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

interface SubjectOverviewProps {
  subject: string
}

export function SubjectOverview({ subject }: SubjectOverviewProps) {
  // Mock data - in a real app, this would come from an API or database
  const subjectData = {
    mathematics: {
      name: "Mathematics",
      icon: Calculator,
      description: "Master advanced mathematical concepts for university entrance exams",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      chapters: [
        {
          id: 1,
          title: "Calculus & Derivatives",
          description: "Learn limits, derivatives, and their applications",
          topics: 8,
          completed: 6,
          progress: 75,
          difficulty: "Advanced",
          estimatedTime: "12 hours",
        },
        {
          id: 2,
          title: "Linear Algebra",
          description: "Matrices, determinants, and vector spaces",
          topics: 6,
          completed: 3,
          progress: 50,
          difficulty: "Advanced",
          estimatedTime: "10 hours",
        },
        {
          id: 3,
          title: "Trigonometry",
          description: "Trigonometric functions and identities",
          topics: 5,
          completed: 5,
          progress: 100,
          difficulty: "Intermediate",
          estimatedTime: "8 hours",
        },
        {
          id: 4,
          title: "Probability & Statistics",
          description: "Statistical analysis and probability theory",
          topics: 7,
          completed: 0,
          progress: 0,
          difficulty: "Advanced",
          estimatedTime: "14 hours",
        },
      ],
    },
    physics: {
      name: "Physics",
      icon: Atom,
      description: "Explore fundamental physics concepts and their applications",
      color: "text-green-600",
      bgColor: "bg-green-50",
      chapters: [
        {
          id: 1,
          title: "Classical Mechanics",
          description: "Motion, forces, and energy in classical systems",
          topics: 9,
          completed: 4,
          progress: 44,
          difficulty: "Advanced",
          estimatedTime: "15 hours",
        },
        {
          id: 2,
          title: "Thermodynamics",
          description: "Heat, temperature, and energy transfer",
          topics: 6,
          completed: 2,
          progress: 33,
          difficulty: "Intermediate",
          estimatedTime: "10 hours",
        },
      ],
    },
    english: {
      name: "English",
      icon: FileText,
      description: "Enhance language skills for entrance exam success",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      chapters: [
        {
          id: 1,
          title: "Reading Comprehension",
          description: "Develop critical reading and analysis skills",
          topics: 5,
          completed: 4,
          progress: 80,
          difficulty: "Intermediate",
          estimatedTime: "8 hours",
        },
        {
          id: 2,
          title: "Grammar & Usage",
          description: "Master English grammar rules and usage",
          topics: 8,
          completed: 6,
          progress: 75,
          difficulty: "Intermediate",
          estimatedTime: "12 hours",
        },
      ],
    },
  }

  const currentSubject = subjectData[subject as keyof typeof subjectData]

  if (!currentSubject) {
    return <div>Subject not found</div>
  }

  const Icon = currentSubject.icon
  const overallProgress = Math.round(
    currentSubject.chapters.reduce((acc, chapter) => acc + chapter.progress, 0) / currentSubject.chapters.length,
  )

  return (
    <div className="space-y-8">
      {/* Subject Header */}
      <div className="flex items-center gap-6">
        <div className={`p-4 rounded-2xl ${currentSubject.bgColor}`}>
          <Icon className={`h-12 w-12 ${currentSubject.color}`} />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-foreground">{currentSubject.name}</h1>
          <p className="text-lg text-muted-foreground mt-2">{currentSubject.description}</p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Overall Progress:</span>
              <span className="font-semibold text-primary">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="w-32 h-2" />
          </div>
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">Chapters</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {currentSubject.chapters.map((chapter) => (
            <Card key={chapter.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      {chapter.progress === 100 ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : chapter.progress > 0 ? (
                        <Play className="h-5 w-5 text-primary" />
                      ) : (
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                      )}
                      {chapter.title}
                    </CardTitle>
                    <CardDescription className="text-base">{chapter.description}</CardDescription>
                  </div>
                  <Badge variant={chapter.progress === 100 ? "default" : "secondary"}>{chapter.difficulty}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{chapter.progress}%</span>
                  </div>
                  <Progress value={chapter.progress} className="h-2" />
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>
                      {chapter.completed}/{chapter.topics} topics
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{chapter.estimatedTime}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Link href={`/subjects/${subject}/chapter/${chapter.id}`}>
                  <Button className="w-full" variant={chapter.progress === 100 ? "outline" : "default"}>
                    {chapter.progress === 100 ? "Review Chapter" : chapter.progress > 0 ? "Continue" : "Start Chapter"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Study Tips */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Study Tips for {currentSubject.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Practice regularly with the AI tutor for personalized guidance</li>
            <li>• Complete all topics in sequence for better understanding</li>
            <li>• Use the chat feature to clarify doubts immediately</li>
            <li>• Take practice tests after completing each chapter</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
