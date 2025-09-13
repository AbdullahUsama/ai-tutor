"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calculator, Atom, FileText, MessageCircle } from "lucide-react"
import Link from "next/link"
import { ChapterContent } from "./chapter-content"
import { TopicsSidebar } from "./topics-sidebar"
import { AIChatbot } from "./ai-chatbot"

interface ChapterViewProps {
  subject: string
  chapterId: string
}

export function ChapterView({ subject, chapterId }: ChapterViewProps) {
  const [selectedTopic, setSelectedTopic] = useState("1.1")
  const [isChatOpen, setIsChatOpen] = useState(false)

  // Mock data - in a real app, this would come from an API
  const subjectIcons = {
    mathematics: Calculator,
    physics: Atom,
    english: FileText,
  } as const

  type ChapterData = {
    title: string
    description: string
    progress: number
    topics: {
      id: string
      title: string
      completed: boolean
      subtopics: {
        id: string
        title: string
        completed: boolean
      }[]
    }[]
  }

  type SubjectData = {
    [key: string]: ChapterData
  }

  const chapterData: Record<string, SubjectData> = {
    mathematics: {
      "1": {
        title: "Calculus & Derivatives",
        description: "Master the fundamentals of calculus including limits, derivatives, and their applications",
        progress: 75,
        topics: [
          {
            id: "1.1",
            title: "Introduction to Limits",
            completed: true,
            subtopics: [
              { id: "1.1.1", title: "Definition of Limits", completed: true },
              { id: "1.1.2", title: "One-sided Limits", completed: true },
              { id: "1.1.3", title: "Limit Laws", completed: false },
            ],
          },
          {
            id: "1.2",
            title: "Derivatives",
            completed: false,
            subtopics: [
              { id: "1.2.1", title: "Definition of Derivative", completed: false },
              { id: "1.2.2", title: "Power Rule", completed: false },
              { id: "1.2.3", title: "Product and Quotient Rules", completed: false },
            ],
          },
          {
            id: "1.3",
            title: "Applications of Derivatives",
            completed: false,
            subtopics: [
              { id: "1.3.1", title: "Rate of Change", completed: false },
              { id: "1.3.2", title: "Optimization Problems", completed: false },
            ],
          },
        ],
      },
    },
    physics: {
      "1": {
        title: "Classical Mechanics",
        description: "Explore motion, forces, and energy in classical physics",
        progress: 44,
        topics: [
          {
            id: "1.1",
            title: "Kinematics",
            completed: true,
            subtopics: [
              { id: "1.1.1", title: "Position and Displacement", completed: true },
              { id: "1.1.2", title: "Velocity and Acceleration", completed: true },
            ],
          },
          {
            id: "1.2",
            title: "Forces and Newton's Laws",
            completed: false,
            subtopics: [
              { id: "1.2.1", title: "Newton's First Law", completed: false },
              { id: "1.2.2", title: "Newton's Second Law", completed: false },
            ],
          },
        ],
      },
    },
    english: {
      "1": {
        title: "Reading Comprehension",
        description: "Develop critical reading and analysis skills",
        progress: 80,
        topics: [
          {
            id: "1.1",
            title: "Understanding Main Ideas",
            completed: true,
            subtopics: [
              { id: "1.1.1", title: "Identifying Theme", completed: true },
              { id: "1.1.2", title: "Supporting Details", completed: true },
            ],
          },
        ],
      },
    },
  }

  const currentChapter = chapterData[subject]?.[chapterId]
  const Icon = subjectIcons[subject as keyof typeof subjectIcons]

  if (!currentChapter || !Icon) {
    return <div>Chapter not found</div>
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left Sidebar - Topics Navigation */}
      <div className="w-80 border-r border-border bg-card">
        <TopicsSidebar
          chapter={currentChapter}
          selectedTopic={selectedTopic}
          onTopicSelect={setSelectedTopic}
          subject={subject}
          chapterId={chapterId}
        />
      </div>

      {/* Center Panel - Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Chapter Header */}
        <div className="border-b border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/subjects/${subject}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to {subject}
                </Button>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-3">
                <Icon className="h-6 w-6 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{currentChapter.title}</h1>
                  <p className="text-sm text-muted-foreground">{currentChapter.description}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="font-semibold text-primary">{currentChapter.progress}%</p>
              </div>
              <Progress value={currentChapter.progress} className="w-24 h-2" />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden">
          <ChapterContent subject={subject} chapterId={chapterId} topicId={selectedTopic} chapter={currentChapter} />
        </div>
      </div>

      {/* Right Sidebar - AI Chatbot */}
      <div className={`transition-all duration-300 border-l border-border bg-card ${isChatOpen ? "w-96" : "w-16"} flex flex-col h-full overflow-hidden`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-border flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="w-full justify-start"
            >
              <MessageCircle className="h-4 w-4" />
              {isChatOpen && <span className="ml-2">AI Tutor</span>}
            </Button>
          </div>
          {isChatOpen && (
            <div className="flex-1 min-h-0 overflow-hidden">
              <AIChatbot subject={subject} chapter={currentChapter.title} topic={selectedTopic} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
