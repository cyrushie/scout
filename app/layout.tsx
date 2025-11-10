import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";
import ScrollToTop from "@/components/scroll-to-top";
import { FloatingChatWidget } from "@/components/chat-widget";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scout - AI Pest Identification",
  description:
    "Identify pests instantly with AI. Get personalized solutions and protect your home from costly damage.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <ThemeProvider>
          <ScrollToTop />
          {children}
          <FloatingChatWidget />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
