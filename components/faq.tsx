"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How accurate is Scout's pest identification?",
    answer:
      "Scout uses advanced AI trained on thousands of pest images and has 95%+ accuracy for common household pests. For unusual species, Scout will recommend professional consultation.",
  },
  {
    question: "Is Scout really free?",
    answer:
      "Scout offers a free trial with full access to identification and basic solutions. Premium features and advanced analysis are available with a subscription.",
  },
  {
    question: "Can I upload old photos or just live ones?",
    answer:
      "You can upload photos from your phone's library or take new photos in real-time. The clearer the image, the better the identification.",
  },
  {
    question: "What if Scout's DIY solutions don't work?",
    answer:
      "Scout provides guidance on when professional help is needed. We also have partnerships with pest control professionals if you need escalation.",
  },
  {
    question: "How quickly will I get identified?",
    answer:
      "Most identifications happen within seconds. Just upload a clear photo and Scout will analyze it instantly.",
  },
  {
    question: "Is my information private?",
    answer:
      "Yes! We take privacy seriously. Your photos and information are encrypted and never shared with third parties.",
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="py-20 px-4 bg-card/50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">Everything you need to know about Scout.</p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border rounded-lg px-6 bg-background hover:border-accent/50 transition-colors"
            >
              <AccordionTrigger className="text-foreground font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-4">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
