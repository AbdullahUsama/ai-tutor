"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, ChevronRight, ChevronDown, Play } from "lucide-react"
import { useState } from "react"

interface Topic {
  id: string
  title: string
  completed: boolean
  subtopics: {
    id: string
    title: string
    completed: boolean
  }[]
}

interface Chapter {
  title: string
  description: string
  progress: number
  topics: Topic[]
}

interface TopicsSidebarProps {
  chapter: Chapter
  selectedTopic: string
  onTopicSelect: (topicId: string) => void
  subject: string
  chapterId: string
}

export function TopicsSidebar({ chapter, selectedTopic, onTopicSelect, subject, chapterId }: TopicsSidebarProps) {
  const [expandedTopics, setExpandedTopics] = useState<string[]>([selectedTopic])

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => (prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]))
  }

  const completedTopics = chapter.topics.filter((topic) => topic.completed).length
  const totalTopics = chapter.topics.length

  return (
    <div className="h-full flex flex-col">
      {/* Chapter Info */}
      <div className="p-6 border-b border-border">
        <h2 className="font-semibold text-foreground mb-2">{chapter.title}</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Topics</span>
            <span className="font-medium">
              {completedTopics}/{totalTopics}
            </span>
          </div>
          <Progress value={chapter.progress} className="h-2" />
        </div>
      </div>

      {/* Topics List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {chapter.topics.map((topic) => (
            <div key={topic.id} className="space-y-1">
              {/* Main Topic */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => toggleTopic(topic.id)} className="p-1 h-auto">
                  {expandedTopics.includes(topic.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant={selectedTopic === topic.id ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => onTopicSelect(topic.id)}
                  className="flex-1 justify-start gap-2 h-auto py-2"
                >
                  {topic.completed ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : selectedTopic === topic.id ? (
                    <Play className="h-4 w-4 text-primary" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="text-sm">{topic.title}</span>
                </Button>
              </div>

              {/* Subtopics */}
              {expandedTopics.includes(topic.id) && (
                <div className="ml-8 space-y-1">
                  {topic.subtopics.map((subtopic) => (
                    <Button
                      key={subtopic.id}
                      variant={selectedTopic === subtopic.id ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => onTopicSelect(subtopic.id)}
                      className="w-full justify-start gap-2 h-auto py-1.5 text-xs"
                    >
                      {subtopic.completed ? (
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      ) : selectedTopic === subtopic.id ? (
                        <Play className="h-3 w-3 text-primary" />
                      ) : (
                        <Circle className="h-3 w-3 text-muted-foreground" />
                      )}
                      <span>{subtopic.title}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Navigation Buttons */}
      <div className="p-4 border-t border-border space-y-2">
        <Button variant="outline" size="sm" className="w-full bg-transparent">
          Previous Topic
        </Button>
        <Button size="sm" className="w-full">
          Next Topic
        </Button>
      </div>
    </div>
  )
}
