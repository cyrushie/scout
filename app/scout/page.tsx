"use client";
import { AIChatbot } from "@/components/ai-chatbot";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [sessionId, setSessionId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [resetKey, setResetKey] = useState(0); // Add this

  useEffect(() => {
    // Load existing session from localStorage
    const savedSession = localStorage.getItem("pest_assessment_session_id");
    setSessionId(savedSession || "");
    setIsLoading(false);
  }, []);

  // Listen for reset events
  useEffect(() => {
    const handleReset = () => {
      setSessionId("");
      setResetKey((prev) => prev + 1); // Force remount
    };

    window.addEventListener("chatbot-reset", handleReset);
    return () => window.removeEventListener("chatbot-reset", handleReset);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10" />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center">
      <AIChatbot key={resetKey} sessionId={sessionId} centered={true} />
    </div>
  );
}
