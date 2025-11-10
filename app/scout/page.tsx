"use client";

import { useEffect, useRef, useState } from "react";
import {
  Brain,
  MessageCircle,
  Bell,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Home,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ScoutPage() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const router = useRouter();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observers = Object.entries(sectionRefs.current).map(([key, ref]) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(key));
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText =
    "No worries! Let's check what type they are and how to handle them.";

  // Typing animation for demo
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 40);
      return () => clearTimeout(timeout);
    }
  }, [typedText, fullText]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Function to open chat widget
  const openChat = () => {
    window.dispatchEvent(new Event("open-scout-chat"));
  };

  const abilities = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Diagnose Your Pest Issue",
      description:
        "Tell me what you see, and I'll help identify the pest and understand the severity.",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Suggest Solutions",
      description:
        "Get step-by-step treatment plans with DIY solutions backed by pest control experts.",
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Send Follow-Up Reminders",
      description:
        "Stay on top of prevention with timely reminders for seasonal pest checks.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Track Your Progress",
      description:
        "Monitor solved issues and get insights on keeping your home pest-free.",
    },
  ];

  const milestones = [
    { label: "Pest Issues Solved", value: 10000, suffix: "+" },
    { label: "User Satisfaction", value: 98, suffix: "%" },
    { label: "Response Time", value: 3, suffix: "s" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <button
        onClick={() => router.push("/")}
        className="fixed top-6 left-6 z-40 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:scale-110 transition"
        title="Go back home"
      >
        <Home className="w-6 h-6" />
      </button>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${50 + scrollY * 0.03}% ${
              50 - scrollY * 0.02
            }%, var(--accent) 0%, transparent 50%)`,
          }}
        />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-accent/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${
                  5 + Math.random() * 8
                }s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <div className="mb-8">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-accent rounded-full flex items-center justify-center shadow-2xl relative transition-transform duration-300 hover:scale-110">
              <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-accent-foreground animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full animate-ping" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-6 animate-fade-in">
            Meet Scout
          </h1>

          <p
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-in px-4"
            style={{ animationDelay: "0.15s" }}
          >
            Hi there! I'm Scout — your friendly AI pest expert.
          </p>

          <p
            className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in px-4"
            style={{ animationDelay: "0.3s" }}
          >
            I help you identify, solve, and prevent pest problems with
            expert-backed insights.
          </p>

          <button
            onClick={openChat}
            className="bg-accent text-accent-foreground hover:bg-accent/90 animate-fade-in group shadow-lg transition-all duration-200 hover:scale-105 px-6 py-3 rounded-lg font-medium inline-flex items-center text-base sm:text-lg"
            style={{ animationDelay: "0.45s" }}
          >
            Start Chatting with Scout
            <ChevronRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={(el) => {
          sectionRefs.current["about"] = el;
        }}
        className={`py-16 sm:py-24 px-4 sm:px-6 transition-all duration-700 ease-out ${
          visibleSections.has("about")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-16"
        }`}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Who is Scout?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
              Scout was built to make pest control simple, smart, and
              stress-free. Whether you're facing termites, ants, or rodents —
              I'm here to guide you every step of the way.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              With years of expert knowledge distilled into an easy-to-use AI,
              Scout provides instant, reliable advice tailored to your specific
              situation.
            </p>
          </div>

          <div className="order-1 md:order-2 relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 sm:w-48 sm:h-48 border-4 border-accent rounded-full animate-pulse opacity-20" />
                <div className="absolute w-28 h-28 sm:w-32 sm:h-32 border-4 border-primary rounded-full animate-ping opacity-30" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-accent/10 rounded-full backdrop-blur-sm flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <Brain className="w-16 h-16 sm:w-20 sm:h-20 text-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Abilities Section */}
      <section
        ref={(el) => {
          sectionRefs.current["abilities"] = el;
        }}
        className={`py-16 sm:py-24 px-4 sm:px-6 bg-secondary/20 transition-all duration-700 ease-out ${
          visibleSections.has("abilities")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-16"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12 sm:mb-16">
            What Can Scout Do?
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {abilities.map((ability, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-5 sm:p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out group cursor-pointer"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 group-hover:rotate-6">
                  {ability.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3">
                  {ability.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {ability.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section
        ref={(el) => {
          sectionRefs.current["demo"] = el;
        }}
        className={`py-16 sm:py-24 px-4 sm:px-6 transition-all duration-700 ease-out ${
          visibleSections.has("demo")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-16"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12 sm:mb-16">
            See Scout in Action
          </h2>

          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="bg-accent text-accent-foreground rounded-2xl px-4 sm:px-5 py-3 max-w-[85%] sm:max-w-[80%] shadow-sm">
                  <p className="text-sm">I saw ants in my kitchen.</p>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-secondary text-secondary-foreground rounded-2xl px-4 sm:px-5 py-3 max-w-[85%] sm:max-w-[80%] shadow-sm">
                  <p className="text-sm">
                    {typedText}
                    {showCursor && (
                      <span className="inline-block w-0.5 h-4 bg-current ml-1 animate-pulse" />
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 justify-start pt-2 flex-wrap">
                <button
                  onClick={openChat}
                  className="text-xs bg-card text-foreground border border-border rounded-lg px-3 py-2 hover:bg-secondary hover:border-accent transition-all duration-200 hover:scale-105"
                >
                  Show me the guide
                </button>
                <button
                  onClick={openChat}
                  className="text-xs bg-card text-foreground border border-border rounded-lg px-3 py-2 hover:bg-secondary hover:border-accent transition-all duration-200 hover:scale-105"
                >
                  What supplies do I need?
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section
        ref={(el) => {
          sectionRefs.current["milestones"] = el;
        }}
        className={`py-16 sm:py-24 px-4 sm:px-6 bg-secondary/20 transition-all duration-700 ease-out ${
          visibleSections.has("milestones")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-16"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12 sm:mb-16">
            Scout's Impact
          </h2>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6 sm:p-8 text-center hover:scale-105 transition-all duration-300 ease-out hover:shadow-lg"
              >
                <div className="text-4xl sm:text-5xl font-bold text-accent mb-4">
                  {milestone.value}
                  {milestone.suffix}
                </div>
                <p className="text-base sm:text-lg text-muted-foreground">
                  {milestone.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={(el) => {
          sectionRefs.current["cta"] = el;
        }}
        className={`py-20 sm:py-32 px-4 sm:px-6 transition-all duration-700 ease-out ${
          visibleSections.has("cta")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-16"
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 sm:mb-8">
            Ready to Talk to Scout?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12 px-4">
            Get instant pest control advice and solutions tailored to your
            specific problem.
          </p>

          <button
            onClick={openChat}
            className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg group text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 transition-all duration-200 hover:scale-105 rounded-lg font-medium inline-flex items-center"
          >
            Start a Conversation with Scout
            <MessageCircle className="ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-200" />
          </button>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
      `}</style>
    </div>
  );
}
