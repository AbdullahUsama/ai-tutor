import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen, Calculator, Atom, FileText, TrendingUp, Clock, Target } from "lucide-react"
import Link from "next/link"

export function Dashboard() {
  const subjects = [
    {
      name: "Mathematics",
      icon: Calculator,
      progress: 65,
      chapters: 12,
      completedChapters: 8,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      name: "Physics",
      icon: Atom,
      progress: 45,
      chapters: 10,
      completedChapters: 4,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      name: "English",
      icon: FileText,
      progress: 80,
      chapters: 8,
      completedChapters: 6,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  const recentActivity = [
    { subject: "Mathematics", chapter: "Calculus - Derivatives", time: "2 hours ago" },
    { subject: "Physics", chapter: "Mechanics - Motion", time: "1 day ago" },
    { subject: "English", chapter: "Grammar - Tenses", time: "2 days ago" },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Welcome back, Student!</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Continue your university entrance exam preparation journey. Track your progress and master each subject with
          AI-powered guidance.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">63%</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">24h</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chapters Completed</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">18/30</div>
            <p className="text-xs text-muted-foreground">60% complete</p>
          </CardContent>
        </Card> */}
      </div>

      {/* Subject Progress */}
      <div>
        <h3 className="text-2xl font-semibold text-foreground mb-6">Subject Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map((subject) => {
            const Icon = subject.icon
            return (
              <Card key={subject.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${subject.bgColor}`}>
                      <Icon className={`h-6 w-6 ${subject.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <CardDescription>
                        {subject.completedChapters}/{subject.chapters} chapters
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Link href="/subjects" className="w-full">
                      Continue Learning
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-2xl font-semibold text-foreground mb-6">Recent Activity</h3>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Latest Study Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-foreground">{activity.subject}</p>
                    <p className="text-sm text-muted-foreground">{activity.chapter}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
