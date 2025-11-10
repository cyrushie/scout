"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"
import { X, Send } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "scout"
  timestamp: Date
}

export default function ScoutChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! I'm Scout 👋 — how can I help you with your pest problems today?",
      sender: "scout",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  // Show tooltip 5 seconds after page load, once per session
  useEffect(() => {
    const hasSeenTooltip = sessionStorage.getItem("scout-tooltip-seen")
    if (!hasSeenTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(true)
        sessionStorage.setItem("scout-tooltip-seen", "true")

        // Hide tooltip after 4 seconds
        setTimeout(() => {
          setShowTooltip(false)
        }, 4000)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [])

  // Listen for custom event to open chat from Scout page
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true)
    window.addEventListener("open-scout-chat", handleOpenChat)
    return () => window.removeEventListener("open-scout-chat", handleOpenChat)
  }, [])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Show typing indicator
    setIsTyping(true)

    // Simulate Scout's response
    setTimeout(() => {
      const scoutResponse = generateScoutResponse(inputValue)
      const scoutMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: scoutResponse,
        sender: "scout",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, scoutMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateScoutResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase()

    if (lowerInput.includes("ant") || lowerInput.includes("ants")) {
      return "Ants can be tricky! I recommend checking out our guide on 'The 3-Week Ant Battle' in the blog section. You'll find step-by-step solutions including vinegar barriers and bait traps. Would you like me to guide you there?"
    }

    if (lowerInput.includes("bed bug") || lowerInput.includes("bedbug")) {
      return "Bed bugs are a serious concern. Our comprehensive guide covers inspection techniques, heat treatment, and prevention. Check the 'Bed Bug Reality Check' article for detailed solutions. Need help finding it?"
    }

    if (lowerInput.includes("mouse") || lowerInput.includes("mice") || lowerInput.includes("rat")) {
      return "Rodent issues require immediate action! I suggest our 'Mouse-Proofing Your Home' guide which covers sealing entry points and humane trapping methods. Want me to show you the solution section?"
    }

    if (lowerInput.includes("fly") || lowerInput.includes("flies")) {
      return "There are different types of flies with different solutions. Check out our 'Drain Flies vs Fruit Flies' guide to identify which one you're dealing with. Should I direct you to symptom-based solutions?"
    }

    if (lowerInput.includes("spider")) {
      return "Most house spiders are harmless! Our guide 'When Spiders Are Actually Helpful' explains which spiders to keep and which to remove. Interested in learning more?"
    }

    if (lowerInput.includes("help") || lowerInput.includes("guide") || lowerInput.includes("solution")) {
      return "I can help you navigate to our solutions section! We have guides organized by symptoms like 'I See Bugs,' 'I Hear Scratching,' or 'I See Droppings.' Which best describes your situation?"
    }

    return "Thanks for sharing! I can help you find the right solution. Try browsing our symptom-based guides or check out our blog articles for specific pest problems. What would you like to explore first?"
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      {/* Background overlay when chat is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Greeting Tooltip */}
      {showTooltip && !isOpen && (
        <div className="fixed bottom-28 right-8 z-50 animate-fade-in">
          <div className="bg-card border border-border rounded-lg shadow-lg px-4 py-3 max-w-xs">
            <p className="text-sm text-foreground">👋 Need help with pests? Scout can help you!</p>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 w-[90vw] sm:w-96 h-[40vh] bg-card border border-border rounded-t-2xl shadow-2xl z-50 flex flex-col animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-lg">
                S
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Scout</h3>
                <p className="text-xs text-muted-foreground">Pest Helper</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="hover:bg-secondary">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${message.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                <span className="text-xs text-muted-foreground mt-1">{formatTime(message.timestamp)}</span>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-start">
                <div className="bg-secondary text-secondary-foreground rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-input bg-background rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button onClick={handleSendMessage} size="icon" className="rounded-full bg-primary hover:bg-primary/90">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-[60px] h-[60px] rounded-full shadow-lg z-50 flex items-center justify-center text-primary-foreground font-bold text-xl transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor:
            theme === "eco-clean"
              ? "oklch(0.68 0.12 145)"
              : theme === "home-fresh"
                ? "oklch(0.88 0.1 155)"
                : "oklch(0.72 0.1 135)",
          animation: isOpen ? "none" : "pulse-glow 2.5s ease-in-out infinite",
        }}
        aria-label="Open Scout chatbot"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Pulse Glow Animation */}
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(127, 183, 126, 0.4);
          }
          50% {
            box-shadow: 0 0 30px rgba(127, 183, 126, 0.7), 0 0 40px rgba(127, 183, 126, 0.4);
          }
        }
      `}</style>
    </>
  )
}
