import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calculator, Atom, FileText, BookOpen, Clock, Users } from "lucide-react"
import Link from "next/link"

export function SubjectCatalog() {
  const subjects = [
    {
      id: "mathematics",
      name: "Mathematics",
      description:
        "Master calculus, algebra, geometry, and advanced mathematical concepts for university entrance exams.",
      icon: Calculator,
      chapters: 12,
      totalTopics: 48,
      difficulty: "Advanced",
      estimatedTime: "120 hours",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      topics: [
        "Calculus & Derivatives",
        "Linear Algebra",
        "Trigonometry",
        "Probability & Statistics",
        "Coordinate Geometry",
        "Complex Numbers",
      ],
    },
    {
      id: "physics",
      name: "Physics",
      description: "Explore mechanics, thermodynamics, electromagnetism, and modern physics concepts.",
      icon: Atom,
      chapters: 10,
      totalTopics: 35,
      difficulty: "Advanced",
      estimatedTime: "100 hours",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      topics: ["Classical Mechanics", "Thermodynamics", "Electromagnetism", "Optics", "Modern Physics", "Wave Motion"],
    },
    {
      id: "english",
      name: "English",
      description: "Enhance reading comprehension, grammar, vocabulary, and writing skills for entrance exams.",
      icon: FileText,
      chapters: 8,
      totalTopics: 28,
      difficulty: "Intermediate",
      estimatedTime: "80 hours",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      topics: [
        "Reading Comprehension",
        "Grammar & Usage",
        "Vocabulary Building",
        "Essay Writing",
        "Critical Analysis",
        "Literature Basics",
      ],
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Subject Catalog</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Choose your subject to begin comprehensive preparation for university entrance exams. Each subject is
          structured with detailed chapters and interactive learning materials.
        </p>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {subjects.map((subject) => {
          const Icon = subject.icon
          return (
            <Card
              key={subject.id}
              className={`hover:shadow-xl transition-all duration-300 ${subject.borderColor} border-2`}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${subject.bgColor}`}>
                    <Icon className={`h-8 w-8 ${subject.color}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{subject.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {subject.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {subject.chapters} Chapters
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base leading-relaxed">{subject.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>{subject.totalTopics} Topics</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{subject.estimatedTime}</span>
                  </div>
                </div>

                {/* Key Topics */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Key Topics</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {subject.topics.slice(0, 4).map((topic, index) => (
                      <div key={index} className="text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                        {topic}
                      </div>
                    ))}
                  </div>
                  {subject.topics.length > 4 && (
                    <p className="text-xs text-muted-foreground">+{subject.topics.length - 4} more topics</p>
                  )}
                </div>

                {/* Action Button */}
                <Link href={`/subjects/${subject.id}`}>
                  <Button className="w-full bg-primary hover:bg-primary/90">Start Learning</Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Additional Info Section */}
      <div className="bg-card rounded-lg p-8 border">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-semibold text-foreground">AI-Powered Learning</h3>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each subject comes with an intelligent AI tutor that adapts to your learning pace, provides personalized
            explanations, and helps you master complex concepts through interactive problem-solving.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Badge variant="outline" className="px-4 py-2">
              Personalized Learning Path
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              Real-time Doubt Resolution
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              Progress Tracking
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              Practice Tests
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
