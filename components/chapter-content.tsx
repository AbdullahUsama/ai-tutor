"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Lightbulb, Calculator, CheckCircle, ArrowRight } from "lucide-react"

interface ChapterContentProps {
  subject: string
  chapterId: string
  topicId: string
  chapter: any
}

export function ChapterContent({ subject, chapterId, topicId, chapter }: ChapterContentProps) {
  // Mock content data - in a real app, this would come from an API
  const contentData = {
    "1.1": {
      title: "Introduction to Limits",
      type: "concept",
      content: {
        introduction:
          "Limits are fundamental to calculus and help us understand the behavior of functions as they approach specific values.",
        keyPoints: [
          "A limit describes the value that a function approaches as the input approaches some value",
          "Limits can exist even when the function is not defined at that point",
          "The notation lim(x→a) f(x) = L means the limit of f(x) as x approaches a is L",
        ],
        examples: [
          {
            problem: "Find lim(x→2) (x² - 4)/(x - 2)",
            solution:
              "Factor the numerator: (x² - 4) = (x + 2)(x - 2)\nSimplify: (x + 2)(x - 2)/(x - 2) = x + 2\nEvaluate: lim(x→2) (x + 2) = 2 + 2 = 4",
          },
        ],
        formula: "lim(x→a) f(x) = L",
      },
    },
    "1.1.1": {
      title: "Definition of Limits",
      type: "definition",
      content: {
        introduction: "The formal definition of a limit provides the mathematical foundation for all of calculus.",
        keyPoints: [
          "Epsilon-delta definition: For every ε > 0, there exists δ > 0 such that if 0 < |x - a| < δ, then |f(x) - L| < ε",
          "This definition captures the intuitive idea that f(x) gets arbitrarily close to L as x gets close to a",
          "The definition works even when f(a) is undefined",
        ],
        examples: [
          {
            problem: "Prove that lim(x→3) (2x + 1) = 7 using the epsilon-delta definition",
            solution:
              "Given ε > 0, we need to find δ > 0 such that if 0 < |x - 3| < δ, then |(2x + 1) - 7| < ε\n|2x + 1 - 7| = |2x - 6| = 2|x - 3|\nWe need 2|x - 3| < ε, so |x - 3| < ε/2\nTherefore, choose δ = ε/2",
          },
        ],
      },
    },
  }

  const currentContent = contentData[topicId as keyof typeof contentData]

  if (!currentContent) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Content Coming Soon</h3>
            <p className="text-muted-foreground">This topic content is being prepared.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-8 max-w-4xl mx-auto space-y-8">
        {/* Topic Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{currentContent.type}</Badge>
            <Badge variant="secondary">Topic {topicId}</Badge>
          </div>
          <h1 className="text-3xl font-bold text-foreground">{currentContent.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{currentContent.content.introduction}</p>
        </div>

        <Separator />

        {/* Key Points */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              Key Concepts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {currentContent.content.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Formula (if exists) */}
        {currentContent.content.formula && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Formula
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-4 bg-background rounded-lg border">
                <code className="text-lg font-mono text-primary">{currentContent.content.formula}</code>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Examples */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Examples</h2>
          {currentContent.content.examples.map((example, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">Example {index + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Problem:</h4>
                  <p className="text-muted-foreground bg-muted/50 p-3 rounded-lg">{example.problem}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Solution:</h4>
                  <pre className="text-sm text-foreground bg-background p-4 rounded-lg border whitespace-pre-wrap">
                    {example.solution}
                  </pre>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Practice Section */}
        <Card className="bg-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-accent" />
              Practice Problems
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Ready to test your understanding? Try these practice problems to reinforce your learning.
            </p>
            <Button className="bg-accent hover:bg-accent/90">
              Start Practice
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between pt-8">
          <Button variant="outline">Previous Topic</Button>
          <Button>
            Next Topic
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </ScrollArea>
  )
}
