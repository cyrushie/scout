"use client";

import { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  Send,
  Upload,
  RotateCcw,
  Bot,
  Bug,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { generateSessionId } from "@/lib/utils/session";
import { usePathname } from "next/navigation";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  imageUrl?: string;
}

const CHAT_HISTORY_KEY = "pest_assessment_chat_history";

export function FloatingChatWidget() {
  const pathname = usePathname();
  if (pathname === "/scout") return null;

  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [sessionCreated, setSessionCreated] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi there! I'm Scout, your AI Pest Assessment Assistant. I help homeowners identify pest issues and recommend the best solutions — whether it's a quick DIY fix or something that needs a pro.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fade in button after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setHasAnimated(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Load session and history on mount
  useEffect(() => {
    const loadSession = async () => {
      const savedSession = localStorage.getItem("pest_assessment_session_id");
      if (savedSession) {
        setSessionId(savedSession);
        setSessionCreated(true);

        // Load chat history from API
        try {
          const response = await fetch(
            `/api/get-chat-history?sessionId=${savedSession}`
          );
          if (response.ok) {
            const data = await response.json();
            if (data.messages && Array.isArray(data.messages)) {
              const loadedMessages = data.messages.map((msg: any) => ({
                id:
                  msg.id ||
                  `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                content: msg.content,
                sender:
                  msg.role === "assistant"
                    ? "bot"
                    : msg.role === "user"
                    ? "user"
                    : "bot",
                timestamp: new Date(msg.timestamp || Date.now()),
              }));
              setMessages(loadedMessages);
            }
          }
        } catch (error) {
          console.error("Error loading chat history:", error);
        } finally {
          setIsLoadingHistory(false);
        }
      } else {
        setIsLoadingHistory(false);
      }
    };

    loadSession();
  }, []);

  // Save messages to sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined" && messages.length > 0 && sessionId) {
      sessionStorage.setItem(
        `${CHAT_HISTORY_KEY}_${sessionId}`,
        JSON.stringify(messages)
      );
    }
  }, [messages, sessionId]);

  // Auto-scroll to bottom
  useEffect(() => {
    const scrollToBottom = () => {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    };
    scrollToBottom();
  }, [messages]);

  // Listen for reset events
  useEffect(() => {
    const handleReset = () => {
      setSessionId("");
      setSessionCreated(false);
      setResetKey((prev) => prev + 1);
      setMessages([
        {
          id: "1",
          content:
            "Hi there! I'm Scout, your AI Pest Assessment Assistant. I help homeowners identify pest issues and recommend the best solutions — whether it's a quick DIY fix or something that needs a pro.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsChatOpen(false);
    };
    window.addEventListener("chatbot-reset", handleReset);
    return () => window.removeEventListener("chatbot-reset", handleReset);
  }, []);

  const createSession = async (): Promise<string | null> => {
    if (sessionCreated) return sessionId;

    try {
      const newSessionId = generateSessionId();
      setSessionId(newSessionId);
      setSessionCreated(true);
      localStorage.setItem("pest_assessment_session_id", newSessionId);

      await fetch("/api/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: newSessionId }),
      });

      return newSessionId;
    } catch (error) {
      console.error("Error creating session:", error);
      return null;
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");

      setUploadedImage(data.url);
      return data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      addBotMessage(
        "Sorry, I had trouble uploading that image. Please try again."
      );
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const addBotMessage = (content: string) => {
    const newMessage: Message = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      content,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const addUserMessage = (content: string, imageUrl?: string) => {
    const newMessage: Message = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      content,
      sender: "user",
      timestamp: new Date(),
      imageUrl,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const generateBotResponse = async (
    userMessage: string,
    imageUrl?: string,
    currentSessionId?: string
  ) => {
    try {
      setIsLoading(true);

      const conversationHistory = messages
        .filter((msg) => msg.content !== "typing")
        .map((msg) => ({
          sender: msg.sender,
          content: msg.content,
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: conversationHistory,
          sessionId: currentSessionId,
          imageUrl: imageUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      return data.response;
    } catch (error) {
      console.error("Error getting AI response:", error);
      return "I apologize, but I'm having trouble responding right now. Please try again or continue with your assessment.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    const textToSend = inputValue.trim();
    if ((!textToSend && !uploadedImage) || isLoading) return;

    const imageToSend = uploadedImage;
    setInputValue("");
    setUploadedImage(null);

    // Add user message immediately
    addUserMessage(
      textToSend || "Here's an image of the pest",
      imageToSend || undefined
    );

    // Add loading indicator
    const loadingMessageId = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;
    const loadingMessage: Message = {
      id: loadingMessageId,
      content: "typing",
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, loadingMessage]);
    setIsLoading(true);

    // Create session if needed
    let currentSessionId: string | null = sessionId;
    if (!sessionCreated) {
      currentSessionId = await createSession();
      if (!currentSessionId) {
        setMessages((prev) =>
          prev.filter((msg) => msg.id !== loadingMessageId)
        );
        addBotMessage(
          "Sorry, I'm having trouble starting the conversation. Please refresh and try again."
        );
        setIsLoading(false);
        return;
      }
    }

    // Get bot response
    const response = await generateBotResponse(
      textToSend || "Can you identify this pest from the image?",
      imageToSend || undefined,
      currentSessionId
    );

    // Replace loading message with actual response
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === loadingMessageId ? { ...msg, content: response } : msg
      )
    );

    setIsLoading(false);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleReset = async () => {
    console.log("🔄 Reset clicked!");

    // Clear storage
    localStorage.removeItem("pest_assessment_session_id");
    if (sessionId) {
      sessionStorage.removeItem(`${CHAT_HISTORY_KEY}_${sessionId}`);
    }
    console.log("🗑️ Cleared storage");

    // Dispatch event to parent to remount component
    window.dispatchEvent(new Event("chatbot-reset"));

    console.log("🔄 Reset complete - component will remount");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-accent text-accent-foreground rounded-full p-4 shadow-2xl hover:scale-110 transition-all duration-300 group ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } ${!hasAnimated ? "pointer-events-none" : ""}`}
        aria-label="Open chat with Scout"
      >
        <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
      </button>

      {/* Slide-in Chat Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] md:w-[460px] bg-background border-l border-border shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${
          isChatOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-accent border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-foreground/10 flex items-center justify-center">
              <Bug className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-accent-foreground">
                Scout
              </h2>
              <p className="text-xs text-accent-foreground/80">
                AI Pest Consultant
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              disabled={isLoading}
              className="p-2 hover:bg-accent-foreground/10 rounded-lg transition-colors disabled:opacity-50"
              title="Start new conversation"
            >
              <RotateCcw className="w-4 h-4 text-accent-foreground" />
            </button>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-2 hover:bg-accent-foreground/10 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5 text-accent-foreground" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } animate-slide-up`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                  message.sender === "user"
                    ? "bg-accent text-accent-foreground"
                    : "bg-card text-card-foreground border border-border"
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.sender === "bot" && (
                    <div className="flex-shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                  <div className="text-sm leading-relaxed flex-1">
                    {message.imageUrl && (
                      <div className="mb-2 rounded-lg overflow-hidden border border-border">
                        <img
                          src={message.imageUrl}
                          alt="Uploaded pest"
                          className="max-w-full h-auto max-h-48 object-contain bg-muted/20"
                        />
                      </div>
                    )}
                    {message.content === "typing" ? (
                      <div className="flex gap-1.5 py-1">
                        <div
                          className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    ) : message.sender === "bot" ? (
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc list-inside mb-2 space-y-1">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal list-inside mb-2 space-y-1">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="ml-2">{children}</li>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-semibold">
                              {children}
                            </strong>
                          ),
                          em: ({ children }) => (
                            <em className="italic">{children}</em>
                          ),
                          code: ({ children }) => (
                            <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                              {children}
                            </code>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    ) : (
                      <div className="space-y-2">
                        {Array.isArray(message.content) ? (
                          message.content.map((item, index) => {
                            if (item.type === "text") {
                              return <p key={index}>{item.text}</p>;
                            }
                            if (item.type === "image") {
                              return (
                                <img
                                  key={index}
                                  src={item.image || "/placeholder.svg"}
                                  alt="Uploaded pest"
                                  className="max-w-full h-auto max-h-72 object-contain bg-background/50"
                                />
                              );
                            }
                            return null;
                          })
                        ) : (
                          <p>{message.content}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Image Preview */}
        {uploadedImage && (
          <div className="px-4 py-2 border-t border-border bg-secondary/10">
            <div className="flex items-center gap-2 p-2 bg-card rounded-lg border border-border">
              <img
                src={uploadedImage}
                alt="Preview"
                className="w-12 h-12 object-cover rounded"
              />
              <span className="text-xs text-muted-foreground flex-1">
                Image ready to send
              </span>
              <button
                onClick={() => setUploadedImage(null)}
                className="p-1 hover:bg-muted rounded transition-colors"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-card/50">
          <div className="flex items-end gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading || isUploading}
              className="p-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border rounded-lg transition-colors disabled:opacity-50 flex-shrink-0"
              title="Upload image"
            >
              <Upload className="w-5 h-5" />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all text-foreground placeholder-muted-foreground"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || (!inputValue.trim() && !uploadedImage)}
              className="p-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              title="Send message"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isChatOpen && (
        <div
          onClick={() => setIsChatOpen(false)}
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 animate-fade-in"
        />
      )}
    </>
  );
}
