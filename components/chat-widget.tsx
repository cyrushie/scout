"use client";

import { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  Send,
  Upload,
  RotateCcw,
  Bot,
  Minus,
  User,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { generateSessionId } from "@/lib/utils/session";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  imageUrl?: string;
}

const CHAT_HISTORY_KEY = "pest_assessment_chat_history";

export function FloatingChatWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [sessionCreated, setSessionCreated] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi there! I'm Scout 👋 What pest issue can I help you with today?",
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

  // Fade in button after 1.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChatOpen(true);
      setIsMinimized(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Listen for open chat event from landing page
  useEffect(() => {
    const handleOpenChat = () => {
      setIsChatOpen(true);
      setIsMinimized(false);
    };
    window.addEventListener("open-scout-chat", handleOpenChat);
    return () => window.removeEventListener("open-scout-chat", handleOpenChat);
  }, []);

  // Load session and history on mount
  useEffect(() => {
    const loadSession = async () => {
      const savedSession = localStorage.getItem("pest_assessment_session_id");
      if (savedSession) {
        setSessionId(savedSession);
        setSessionCreated(true);

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
            "Hi there! I'm Scout 👋 What pest issue can I help you with today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
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
      return "I apologize, but I'm having trouble responding right now. Please try again.";
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

    addUserMessage(
      textToSend || "Here's an image of the pest",
      imageToSend || undefined
    );

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

    let currentSessionId: string | null = sessionId;
    if (!sessionCreated) {
      currentSessionId = await createSession();
      if (!currentSessionId) {
        setMessages((prev) =>
          prev.filter((msg) => msg.id !== loadingMessageId)
        );
        addBotMessage(
          "Sorry, I'm having trouble starting the conversation. Please try again."
        );
        setIsLoading(false);
        return;
      }
    }

    const response = await generateBotResponse(
      textToSend || "Can you identify this pest from the image?",
      imageToSend || undefined,
      currentSessionId
    );

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
    localStorage.removeItem("pest_assessment_session_id");
    if (sessionId) {
      sessionStorage.removeItem(`${CHAT_HISTORY_KEY}_${sessionId}`);
    }
    window.dispatchEvent(new Event("chatbot-reset"));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    if (isChatOpen) {
      setIsChatOpen(false);
      setIsMinimized(false);
    } else {
      setIsChatOpen(true);
      setIsMinimized(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isChatOpen && (
        <div
          className={`fixed bottom-24 right-6 w-[380px] md:w-[420px] bg-background border border-border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300 ${
            isMinimized ? "h-16" : "h-[600px]"
          } animate-zoom-in`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-accent border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-accent-foreground/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-accent-foreground">
                  Scout
                </h3>
                <p className="text-xs text-accent-foreground/70">
                  AI Pest Assistant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                disabled={isLoading}
                className="p-2 hover:bg-accent-foreground/10 rounded-lg transition-colors disabled:opacity-50"
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4 text-accent-foreground" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-accent-foreground/10 rounded-lg transition-colors"
                title={isMinimized ? "Expand" : "Minimize"}
              >
                <Minus className="w-4 h-4 text-accent-foreground" />
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-2 hover:bg-accent-foreground/10 rounded-lg transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4 text-accent-foreground" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-muted/20">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {/* Bot Avatar */}
                    {message.sender === "bot" && (
                      <div className="flex-shrink-0">
                        <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center">
                          <Bot className="w-4 h-4 text-accent-foreground" />
                        </div>
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                        message.sender === "user"
                          ? "bg-accent text-accent-foreground"
                          : "bg-card text-card-foreground border border-border"
                      }`}
                    >
                      {message.imageUrl && (
                        <div className="mb-2 rounded-lg overflow-hidden">
                          <img
                            src={message.imageUrl}
                            alt="Uploaded"
                            className="max-w-full h-auto max-h-32 object-contain"
                          />
                        </div>
                      )}
                      {message.content === "typing" ? (
                        <div className="flex gap-1 py-1">
                          <div
                            className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <div
                            className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <div
                            className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      ) : message.sender === "bot" ? (
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => (
                              <p className="mb-1 last:mb-0">{children}</p>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-semibold">
                                {children}
                              </strong>
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

                    {/* User Avatar */}
                    {message.sender === "user" && (
                      <div className="flex-shrink-0">
                        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                          <User className="w-4 h-4 text-primary-foreground" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Image Preview */}
              {uploadedImage && (
                <div className="px-4 py-2 border-t border-border bg-muted/30">
                  <div className="flex items-center gap-2 p-2 bg-card rounded-lg">
                    <img
                      src={uploadedImage}
                      alt="Preview"
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span className="text-xs text-muted-foreground flex-1">
                      Ready to send
                    </span>
                    <button
                      onClick={() => setUploadedImage(null)}
                      className="p-1 hover:bg-muted rounded"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-3 border-t border-border bg-card">
                <div className="flex items-center gap-2">
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
                    className="p-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors disabled:opacity-50"
                    title="Upload image"
                  >
                    <Upload className="w-4 h-4" />
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about pests..."
                    className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={
                      isLoading || (!inputValue.trim() && !uploadedImage)
                    }
                    className="p-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-all disabled:opacity-50"
                    title="Send"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-40 bg-accent text-accent-foreground rounded-full p-4 shadow-2xl hover:scale-110 transition-all duration-300 group opacity-100 translate-y-0 `}
        aria-label={isChatOpen ? "Close chat" : "Open chat with Scout"}
      >
        {isChatOpen ? (
          <X className="w-6 h-6 transition-transform duration-300" />
        ) : (
          <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        )}
        {!isChatOpen && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
        )}
      </button>
    </>
  );
}
