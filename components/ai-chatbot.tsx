"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Bot, User, Send, HelpCircle, Loader2, ChevronDown } from "lucide-react"
import { getChatResponse, getChatResponseStream } from "@/lib/gemini"
import { MarkdownRenderer } from "./markdown-renderer"

interface AIChatbotProps {
  subject: string
  chapter: string
  topic: string
}

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

export function AIChatbot({ subject, chapter, topic }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: `Hi! I'm your AI tutor for ${subject}. I'm here to help you understand ${chapter}. What would you like to know about ${topic}?`,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(true)
  const [showScrollButton, setShowScrollButton] = useState(false)
  
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  // Smart scroll to bottom function
  const scrollToBottom = useCallback((force = false) => {
    if (force || isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ 
        behavior: "smooth",
        block: "end"
      })
    }
  }, [isAtBottom])

  // Check if user is at bottom of scroll area
  const checkScrollPosition = useCallback(() => {
    const scrollArea = scrollAreaRef.current
    if (!scrollArea) return

    const scrollContainer = scrollArea.querySelector('[data-radix-scroll-area-viewport]')
    if (!scrollContainer) return

    const { scrollTop, scrollHeight, clientHeight } = scrollContainer
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 50 // 50px threshold
    
    setIsAtBottom(isNearBottom)
    setShowScrollButton(!isNearBottom && messages.length > 1)
  }, [messages.length])

  // Handle scroll events with debouncing
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      checkScrollPosition()
    }, 100)
  }, [checkScrollPosition])

  // Effect to handle auto-scrolling
  useEffect(() => {
    // Small delay to ensure DOM is updated
    const timer = setTimeout(() => {
      scrollToBottom()
    }, 50)

    return () => clearTimeout(timer)
  }, [messages, scrollToBottom])

  // Effect to set up scroll listener
  useEffect(() => {
    const scrollArea = scrollAreaRef.current
    if (!scrollArea) return

    const scrollContainer = scrollArea.querySelector('[data-radix-scroll-area-viewport]')
    if (!scrollContainer) return

    scrollContainer.addEventListener('scroll', handleScroll)
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [handleScroll])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsLoading(true)

    // Force scroll to bottom when user sends message
    setIsAtBottom(true)

    // Create an empty AI message that we'll update with streaming content
    const aiMessageId = (Date.now() + 1).toString()
    const initialAiMessage: Message = {
      id: aiMessageId,
      type: "ai",
      content: "",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, initialAiMessage])

    try {
      await getChatResponseStream(
        currentInput, 
        { subject, chapter, topic },
        (chunk: string) => {
          // Update the AI message with the new chunk
          setMessages((prev) => 
            prev.map((msg) => 
              msg.id === aiMessageId 
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          )
        }
      )
    } catch (error) {
      console.error('Failed to get AI response:', error)
      
      // Check if it's a network/streaming error and provide specific guidance
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      let userFriendlyMessage = errorMessage
      
      if (errorMessage.includes('Error reading from the stream') || 
          errorMessage.includes('QUIC_PROTOCOL_ERROR') ||
          errorMessage.includes('network')) {
        userFriendlyMessage = 'Network connection issue detected. This might be due to your internet connection or API service interruption. Please try again in a moment.'
      } else if (errorMessage.includes('API key')) {
        userFriendlyMessage = 'API key configuration issue. Please check your environment setup.'
      }
      
      // Replace the empty message with an error message
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === aiMessageId 
            ? { 
                ...msg, 
                content: `⚠️ **Error**: ${userFriendlyMessage}\n\nYou can try:\n- Checking your internet connection\n- Refreshing the page\n- Trying again in a few moments`
              }
            : msg
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleScrollToBottom = () => {
    setIsAtBottom(true)
    scrollToBottom(true)
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
  }

  return (
    <div className="h-full flex flex-col max-h-full overflow-hidden relative">
      {/* Chat Header */}
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bot className="h-5 w-5 text-primary" />
          AI Tutor
        </CardTitle>
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className="text-xs">
            {subject}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {chapter}
          </Badge>
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 flex flex-col gap-4 p-4 min-h-0 overflow-hidden relative">
        <ScrollArea ref={scrollAreaRef} className="flex-1 h-0 pr-4">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.type === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  {message.type === "ai" ? (
                    <MarkdownRenderer content={message.content} />
                  ) : (
                    message.content
                  )}
                  {message.type === "ai" && isLoading && message.content === "" && (
                    <span className="inline-flex items-center">
                      <span className="animate-pulse">●</span>
                      <span className="animate-pulse delay-100">●</span>
                      <span className="animate-pulse delay-200">●</span>
                    </span>
                  )}
                  {message.type === "ai" && isLoading && message.content !== "" && (
                    <span className="inline-block w-2 h-4 bg-current animate-pulse ml-1">|</span>
                  )}
                </div>
                {message.type === "user" && (
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-accent" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Scroll to bottom button */}
        {showScrollButton && (
          <Button
            onClick={handleScrollToBottom}
            size="sm"
            variant="secondary"
            className="absolute bottom-16 right-6 rounded-full w-10 h-10 p-0 shadow-lg border z-10"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        )}

        {/* Input */}
        <div className="flex gap-2 flex-shrink-0">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="text-sm"
          />
          <Button size="sm" onClick={handleSendMessage} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </div>
  )
}
