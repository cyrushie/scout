"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Bot, Upload, RotateCcw, Send, Bug, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { generateSessionId } from "@/lib/utils/session";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  imageUrl?: string;
}

interface ChatbotProps {
  sessionId?: string;
  userName?: string;
  userEmail?: string;
  centered?: boolean;
}

const CHAT_HISTORY_KEY = "pest_assessment_chat_history";

export function AIChatbot({
  sessionId: initialSessionId,
  userName,
  userEmail,
  centered = false,
}: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(centered);
  const [sessionId, setSessionId] = useState<string>(initialSessionId || "");
  const [sessionCreated, setSessionCreated] = useState(!!initialSessionId);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  const [messages, setMessages] = useState<Message[]>(() => {
    return [
      {
        id: "1",
        content:
          "Hi there! I'm Scout, your AI Pest Assessment Assistant. I help homeowners identify pest issues and recommend the best solutions — whether it's a quick DIY fix or something that needs a pro.",
        sender: "bot",
        timestamp: new Date(),
      },
    ];
  });

  useEffect(() => {
    const loadChatHistory = async () => {
      if (initialSessionId) {
        try {
          const response = await fetch(
            `/api/get-chat-history?sessionId=${initialSessionId}`
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

    loadChatHistory();
  }, [initialSessionId]);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (centered) {
      setIsOpen(true);
    }
  }, [centered]);

  useEffect(() => {
    if (typeof window !== "undefined" && messages.length > 0 && sessionId) {
      sessionStorage.setItem(
        `${CHAT_HISTORY_KEY}_${sessionId}`,
        JSON.stringify(messages)
      );
    }
  }, [messages, sessionId]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

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

  const createSession = async (): Promise<string | null> => {
    if (sessionCreated) return sessionId;

    try {
      const newSessionId = generateSessionId();
      setSessionId(newSessionId);
      setSessionCreated(true);

      localStorage.setItem("pest_assessment_session_id", newSessionId);

      await fetch("/api/create-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: newSessionId,
        }),
      });

      return newSessionId;
    } catch (error) {
      console.error("Error creating session:", error);
      return null;
    }
  };

  const summarizeConversation = async (
    allMessages: Message[]
  ): Promise<string> => {
    try {
      const conversationText = allMessages
        .map(
          (msg) =>
            `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.content}`
        )
        .join("\n");

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Please provide a brief summary of this pest assessment conversation in 2-3 sentences:\n\n${conversationText}`,
          history: [],
          sessionId: sessionId,
          isSummary: true,
        }),
      });

      const data = await response.json();
      return data.response || "Assessment completed";
    } catch (error) {
      console.error("Error summarizing conversation:", error);
      return "Assessment completed";
    }
  };

  const generateBotResponse = async (
    userMessage: string,
    imageUrl?: string,
    currentSessionId?: string
  ) => {
    try {
      setIsLoading(true);

      const conversationHistory = messages.map((msg) => ({
        sender: msg.sender,
        content: msg.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history: conversationHistory,
          sessionId: currentSessionId,
          userName: userName,
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

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
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
          "Sorry, I'm having trouble starting the conversation. Please refresh and try again."
        );
        setIsLoading(false);
        return;
      }
    }

    const response = await generateBotResponse(
      textToSend || "Here's an image of the pest",
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
    if (e.key === "Enter" && !isLoading) {
      handleSendMessage();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleImageUpload(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (centered) {
    return (
      <div className="w-full h-screen flex flex-col bg-background animate-fade-in overflow-hidden">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Bug className="w-6 h-6 text-accent" />
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
                Scout AI Consultant
              </h1>
            </div>
            <button
              onClick={handleReset}
              disabled={isLoading}
              className="text-muted-foreground hover:text-accent transition-colors disabled:opacity-50 p-2 hover:bg-accent/10 rounded-lg"
              title="Start new conversation"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-hidden px-4 sm:px-6 py-6">
          <div className="max-w-3xl mx-auto h-full flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  } animate-slide-up`}
                >
                  <div
                    className={`max-w-[80%] sm:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                      message.sender === "user"
                        ? "bg-accent text-accent-foreground"
                        : "bg-card text-card-foreground border border-border"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {message.sender === "bot" && (
                        <div className="flex-shrink-0 mt-0.5">
                          <Bot className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                      <div className="text-sm sm:text-base leading-relaxed">
                        {message.imageUrl && (
                          <div className="mb-3 rounded-lg overflow-hidden border border-border shadow-sm">
                            <img
                              src={message.imageUrl}
                              alt="Uploaded pest"
                              className="max-w-full h-auto max-h-64 object-contain bg-muted/20"
                            />
                          </div>
                        )}
                        {message.sender === "bot" ? (
                          message.content === "typing" ? (
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
                          ) : (
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
                                  <strong className="font-semibold text-foreground">
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
                          )
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
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-border bg-card/50 backdrop-blur-md px-4 sm:px-6 py-4 shadow-lg">
          <div className="max-w-3xl mx-auto">
            {uploadedImage && (
              <div className="mb-3 p-2 bg-secondary/20 border border-border rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <div className="w-10 h-10 rounded-md overflow-hidden border border-border flex-shrink-0">
                    <img
                      src={uploadedImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    Image ready to send
                  </span>
                </div>
                <button
                  onClick={() => setUploadedImage(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="flex items-center gap-2">
              <input
                type="text"
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-background border border-border rounded-lg px-4 py-2.5 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm sm:text-base"
                disabled={isLoading}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading || isUploading}
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border rounded-lg p-2.5 transition-all disabled:opacity-50"
                title="Upload image"
              >
                <Upload className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading}
                className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg px-4 sm:px-5 py-2.5 font-medium transition-all disabled:opacity-50 flex items-center gap-2 text-sm sm:text-base"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                    <span className="hidden sm:inline">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Send</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
