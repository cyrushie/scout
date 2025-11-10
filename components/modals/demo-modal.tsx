"use client"

import { X, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DemoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function DemoModal({ open, onOpenChange }: DemoModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-2xl border border-border shadow-2xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Watch Demo</h2>
          <button onClick={() => onOpenChange(false)} className="p-1 hover:bg-muted rounded-lg transition">
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        <div className="p-6">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border border-border">
            <div className="text-center">
              <Play size={48} className="text-accent mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Demo video would load here</p>
              <p className="text-sm text-muted-foreground">
                Video demonstrating Scout's AI pest identification in action
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <p className="font-semibold text-foreground mb-1">How it works:</p>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Upload a photo of the pest</li>
                <li>AI instantly identifies the species</li>
                <li>Get activity level assessment</li>
                <li>Receive personalized DIY solutions</li>
              </ol>
            </div>
          </div>

          <Button
            onClick={() => onOpenChange(false)}
            className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
