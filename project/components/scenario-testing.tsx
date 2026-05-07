"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Send, Bot, User, Trash2, CheckCircle, Eye, EyeOff, ShieldCheck, Upload } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function ScenarioTesting() {
  const [systemPrompt, setSystemPrompt] = useState("")
  const [systemPromptFile, setSystemPromptFile] = useState<File | null>(null)
  const [isPromptUploaded, setIsPromptUploaded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPromptPreview, setShowPromptPreview] = useState(true)
  const [isPromptVerified, setIsPromptVerified] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSystemPromptFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        setSystemPrompt(text)
      }
      reader.readAsText(file)
    }
  }

  const handleUploadPrompt = () => {
    if (systemPrompt.trim()) {
      setIsPromptUploaded(true)
      setMessages([])
    }
  }

  const handleClearPrompt = () => {
    setSystemPrompt("")
    setSystemPromptFile(null)
    setIsPromptUploaded(false)
    setIsPromptVerified(false)
    setShowPromptPreview(true)
    setMessages([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const WEBHOOK_URL =
    "https://indegene-sbx.app.n8n.cloud/webhook/3c366bf5-949e-468c-918a-888ec8e0542f"

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const conversationHistory = [...messages, userMessage].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_prompt: systemPrompt,
          conversation: conversationHistory,
          user_message: userMessage.content,
        }),
      })

      if (!response.ok) {
        throw new Error(`Webhook returned status ${response.status}`)
      }

      const responseData = await response.json()

      // Extract text from response - handle various formats
      let aiText = ""
      if (typeof responseData === "string") {
        aiText = responseData
      } else if (Array.isArray(responseData) && responseData.length > 0) {
        const first = responseData[0]
        aiText = first.output || first.response || first.message || first.text || first.content || JSON.stringify(first)
      } else if (typeof responseData === "object" && responseData !== null) {
        aiText = responseData.output || responseData.response || responseData.message || responseData.text || responseData.content || JSON.stringify(responseData)
      }

      // Clean up the text
      aiText = aiText.replace(/\*\*/g, "").replace(/\\n/g, "\n").trim()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiText || "No response received.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : "Please try again."}`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-4">Scenario Testing</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Upload a system prompt to define the AI persona, then test conversations in real-time.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-220px)]">
        {/* Left Column - System Prompt Upload (2 cols) */}
        <div className="lg:col-span-2 flex flex-col">
          <Card className="border border-border flex-1 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="w-4 h-4" />
                System Prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              {/* Text Area for System Prompt */}
              <Textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="Paste your system prompt here...&#10;&#10;Example: You are Dr. Smith, a senior cardiologist with 20 years of experience. You are skeptical about new medications and prefer evidence-based approaches..."
                className="flex-1 min-h-[200px] max-h-[350px] resize-none text-sm font-mono overflow-y-auto scrollbar-thin"
                disabled={isPromptUploaded}
              />

              {/* Action Buttons */}
              <div className="flex gap-2">
                {!isPromptUploaded ? (
                  <Button
                    onClick={handleUploadPrompt}
                    disabled={!systemPrompt.trim()}
                    className="flex-1"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                ) : (
                  <>
                    <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-md">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span className="text-sm text-green-700 dark:text-green-300 font-medium">
                        Prompt Active
                      </span>
                    </div>
                    <Button
                      onClick={handleClearPrompt}
                      variant="outline"
                      className="bg-transparent"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                  </>
                )}
              </div>

              {/* Prompt Preview when uploaded */}
              {isPromptUploaded && (
                <div className="bg-muted/50 rounded-lg p-3 border border-border">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Active Prompt Preview:</p>
                  <p className="text-xs text-foreground line-clamp-4 font-mono">
                    {systemPrompt}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Chat Interface (3 cols) */}
        <div className="lg:col-span-3 flex flex-col">
          <Card className="border border-border flex-1 flex flex-col min-h-0">
            <CardHeader className="pb-3 border-b border-border shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  Conversation
                  {isPromptUploaded && isPromptVerified && (
                    <span className="text-xs font-normal text-emerald-600 dark:text-emerald-400 ml-2 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Prompt Verified
                    </span>
                  )}
                </CardTitle>
                {isPromptUploaded && (
                  <button
                    onClick={() => setShowPromptPreview(!showPromptPreview)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
                  >
                    {showPromptPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {showPromptPreview ? "Hide Prompt" : "View Prompt"}
                  </button>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden min-h-0">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 scrollbar-thin">
                {!isPromptUploaded ? (
                  <div className="flex-1 flex items-center justify-center h-full min-h-[300px]">
                    <div className="text-center">
                      <Bot className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                      <p className="text-sm font-medium text-muted-foreground">
                        Upload a system prompt to start testing
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        The AI will respond according to the persona defined in your prompt
                      </p>
                    </div>
                  </div>
                ) : messages.length === 0 && !isPromptVerified ? (
                  <div className="flex flex-col h-full min-h-[300px]">
                    {/* Prompt Verification Panel */}
                    <div className="flex-1 overflow-y-auto p-2">
                      <div className="bg-muted/40 border border-border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="w-4 h-4 text-primary" />
                          <h4 className="text-sm font-semibold text-foreground">Verify Your System Prompt</h4>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">
                          Please review the uploaded system prompt below. Confirm it is correct before starting the conversation.
                        </p>
                        <div className="bg-background border border-border rounded-md p-3 max-h-[250px] overflow-y-auto scrollbar-thin">
                          <pre className="text-xs font-mono text-foreground whitespace-pre-wrap leading-relaxed">
                            {systemPrompt}
                          </pre>
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                          <Button
                            onClick={() => setIsPromptVerified(true)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            size="sm"
                          >
                            <ShieldCheck className="w-4 h-4 mr-2" />
                            Confirm & Start Chatting
                          </Button>
                          <Button
                            onClick={handleClearPrompt}
                            variant="outline"
                            size="sm"
                            className="bg-transparent"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Re-upload Prompt
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : messages.length === 0 && isPromptVerified ? (
                  <div className="flex flex-col h-full min-h-[300px]">
                    {showPromptPreview && (
                      <div className="mx-4 mt-3 mb-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Verified System Prompt</span>
                        </div>
                        <p className="text-xs font-mono text-foreground/80 line-clamp-3">{systemPrompt}</p>
                      </div>
                    )}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <Send className="w-10 h-10 mx-auto mb-3 text-primary/40" />
                        <p className="text-sm font-medium text-muted-foreground">
                          Prompt verified. Start the conversation!
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Type a message below to begin the scenario test
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                  {showPromptPreview && (
                    <div className="mb-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Active System Prompt</span>
                      </div>
                      <p className="text-xs font-mono text-foreground/80 line-clamp-3">{systemPrompt}</p>
                    </div>
                  )}
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-3 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                        <p
                          className={`text-[10px] mt-2 ${
                            message.role === "user"
                              ? "text-primary-foreground/60"
                              : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {message.role === "user" && (
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-secondary-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                  </>
                )}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-muted rounded-lg px-4 py-3">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <Textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={
                      !isPromptUploaded
                        ? "Upload a system prompt first..."
                        : !isPromptVerified
                          ? "Verify the system prompt to start chatting..."
                          : "Type your message..."
                    }
                    disabled={!isPromptUploaded || !isPromptVerified || isLoading}
                    className="flex-1 min-h-[44px] max-h-[120px] resize-none text-sm"
                    rows={1}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || !isPromptUploaded || !isPromptVerified || isLoading}
                    size="icon"
                    className="h-[44px] w-[44px] flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
