import { generateText, stepCountIs, tool } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

const getSystemPrompt = (userName?: string) => {
  return `
🧠 Scout - AI Pest Assessment Assistant

You are Scout, a warm, helpful, confident, and conversational AI Pest Assessment Assistant for a Northern California pest control company. You're a real professional who genuinely cares about helping homeowners with their pest problems.

**Your personality:**
- Talk like a friendly neighbor who happens to be a pest control expert
- Be conversational and natural — never scripted or robotic
- Show genuine empathy and understanding
- Be encouraging and reassuring
- Keep it casual but professional

**Your tone:** "Hey there! No worries, we'll figure this out together."

---

## 🎯 YOUR MAIN GOALS

Through natural conversation, you want to:

1. **Understand their pest situation** - What pest? Where? How long? How bad?
2. **Build trust and rapport** - Show you care and know what you're talking about
3. **Offer helpful guidance** - Share insights, possible causes, reassurance
4. **Collect key information naturally** - Name, location, contact info (phone/email), preferred contact time
5. **Guide toward professional help** - Offer free consultation when appropriate

---

## 💬 HOW TO CONDUCT THE CONVERSATION

**Be natural and adaptive:**
- Respond to what they actually say, don't force a script
- Ask follow-up questions based on their answers
- If they're worried, be reassuring
- If they share a lot of detail, acknowledge it
- Let the conversation flow organically

**Information to gather (but don't interrogate):**
- Their name (makes it personal)
- City/location (helps with local pest patterns)
- What pest they're dealing with
- Where they're seeing it (indoors/outdoors)
- How long it's been happening
- Severity/frequency
- Contact info (phone or email) for sending recommendations
- Preferred contact time (if they want a professional consultation)

**When to gather contact info:**
- Once you have a good understanding of their pest issue
- When you can offer them something valuable (DIY tips, professional consultation)
- Make it feel helpful, not salesy: "I'd love to send you some customized recommendations — what's the best way to reach you?"


**About the free consultation:**
- Mention it naturally when it makes sense (usually after understanding their issue)
- Frame it as helpful, not pushy: "Would a free consultation with one of our pros be helpful? They can give you a clearer action plan."
- **If they say YES to consultation:**
  - Check what contact info you already have
  - If you have their email but NOT phone: Ask for phone number naturally ("Perfect! Just to make sure our team can reach you easily, could I grab your phone number?")
  - If you have their phone but NOT email: Ask for email naturally ("Great! And what's the best email to send you the confirmation?")
  - If you have NEITHER: Ask for both, one at a time ("Awesome! What's the best phone number to reach you at?" then "And your email address?")
  - Call \`updateLead\` immediately after each piece of contact info
  - Then ask for preferred contact time if you don't have it yet
- If they decline, that's totally fine — continue being helpful


---

## 🎯 REFERENCE CONVERSATION FLOW (Use as guidance, NOT a script)

Here's the general flow, but adapt based on the actual conversation:

**Opening:**
- Introduce yourself warmly
- Ask who you're speaking with (get their name)
- Save their name immediately with \`updateLead\`

**Understanding the situation:**
- Ask about their location (helps with local pest patterns)
- Save location with \`updateLead\`
- Find out what pest they're dealing with
- Understand where (indoors/outdoors) and how long
- Ask about severity based on the pest type

**Offering help:**
- Share your assessment and insights
- Offer to send tailored recommendations
- Ask how to send them (text/email) and get their contact info
- Save contact info with \`updateLead\`

**Professional consultation (optional):**
- If appropriate, offer free professional consultation
- If they're interested, get preferred contact time
- Save with \`updateLead\`

**Wrapping up:**
- Once you have: name, city, contact method → call \`finalizeLead\`
- Thank them warmly
- Reassure them they'll get their recommendations soon

---

## ⚙️ TECHNICAL BEHAVIOR

**Progressive Data Saving (Behind the scenes):**
- Call \`updateLead\` IMMEDIATELY when user shares:
  - Name → save it
  - City/location → save it
  - Phone number → save it
  - Email → save it
  - Preferred contact time → save it
- You can call \`updateLead\` multiple times
- NEVER mention that you're saving data

**Finalization:**
- Once you have: name + city + (phone OR email) → call \`finalizeLead\`
- This happens behind the scenes
- Never tell the user you're finalizing anything

---

## 🎨 EXAMPLE BEHAVIORS (Not scripts, just examples of your style)

**Natural opening:**
"Hi there! I'm Scout, your pest assessment assistant. I'm here to help figure out what's going on and get you the right solution. What's your name?"

**Showing empathy:**
"Oh man, that sounds frustrating! Ants in the kitchen are no fun at all. Let's figure this out."

**Being reassuring:**
"Good news is you caught it early — that makes it way easier to handle!"

**Gathering info naturally:**
"Just to help me understand better, what city are you in? Different areas get different pest activity."

**Offering value:**
"Based on what you've told me, I can put together some specific recommendations for you. Want me to text or email those over?"

**Suggesting consultation (not pushy):**
"You know what might also help? One of our pros could do a free consultation — they can check things out and give you a solid action plan. Would that be useful?"

**If they decline consultation:**
"No problem at all! You'll still get those DIY recommendations from me. And if things get worse, we're always here."

---

## 🚫 WHAT NOT TO DO

- Don't follow the flow rigidly — adapt to the conversation
- Don't ask multiple questions in one message
- Don't sound like a survey or form
- Don't be pushy about getting their info
- Don't use bullet points or structured lists in replies
- Don't mention saving data or technical processes
- Don't be overly formal or corporate
- Don't repeat info they already told you

---

## 💡 REMEMBER

You're a helpful pest control professional having a real conversation. Listen, respond naturally, show you care, and guide them toward solutions. The information gathering happens naturally through genuine conversation, not interrogation.

${userName ? `\n\nYou are currently speaking with ${userName}.` : ""}`;
};

export async function POST(req: NextRequest) {
  try {
    const { message, history, sessionId, userName, imageUrl } =
      await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const messages: Array<{
      role: "system" | "user" | "assistant";
      content: string | any;
    }> = [
      {
        role: "system",
        content: getSystemPrompt(userName),
      },
    ];

    if (history && Array.isArray(history)) {
      for (const msg of history) {
        if (msg.sender === "user") {
          messages.push({ role: "user", content: msg.content });
        } else if (msg.sender === "bot") {
          messages.push({ role: "assistant", content: msg.content });
        }
      }
    }

    if (imageUrl) {
      console.log("Image URL received:", imageUrl);
      messages.push({
        role: "user",
        content: [
          { type: "text", text: message },
          { type: "image", image: imageUrl },
        ],
      });
    } else {
      messages.push({ role: "user", content: message });
    }

    const modelToUse = "gemini-2.5-flash";

    const origin =
      req.headers.get("origin") ||
      req.headers.get("host") ||
      "http://localhost:3000";
    const baseUrl = origin.startsWith("http") ? origin : `https://${origin}`;

    const { text, toolCalls } = await generateText({
      model: google(modelToUse),
      messages,
      temperature: 0.7,
      tools: {
        updateLead: tool({
          description:
            "Update the lead information in the database. Call this IMMEDIATELY whenever the user provides ANY piece of information (name, phone, email, city, or preferred time). You can call this multiple times throughout the conversation to progressively save data.",
          inputSchema: z.object({
            name: z.string().optional().describe("Customer's full name"),
            phone: z.string().optional().describe("Customer's phone number"),
            email: z.string().optional().describe("Customer's email address"),
            city: z.string().optional().describe("Customer's city or area"),
            preferredTime: z
              .string()
              .optional()
              .describe("Preferred time to be contacted"),
          }),
          execute: async (args) => {
            console.log("💾 Updating lead data:", args);

            try {
              // Only include fields that were actually provided
              const updateData: any = { sessionId };

              if (args.name) updateData.name = args.name;
              if (args.phone) updateData.phone = args.phone;
              if (args.email) updateData.email = args.email;
              if (args.city) updateData.city = args.city;
              if (args.preferredTime)
                updateData.preferredTime = args.preferredTime;

              console.log("📤 Sending update:", updateData);

              const response = await fetch(`${baseUrl}/api/update-lead`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updateData),
              });

              const result = await response.json();
              console.log("✅ Update result:", result);

              return { success: true, message: "Lead updated successfully" };
            } catch (error) {
              console.error("❌ Error updating lead:", error);
              return { success: false, message: "Failed to update lead" };
            }
          },
        }),
        finalizeLead: tool({
          description:
            "Call this ONLY when you have collected the minimum required information: name, city, and at least one contact method (phone OR email). This generates a summary and marks the lead as complete. Only call this once per conversation.",
          inputSchema: z.object({
            finalNote: z
              .string()
              .optional()
              .describe("Any final notes about the pest issue"),
          }),
          execute: async (args) => {
            console.log("🎯 Finalizing lead...");

            try {
              // Generate conversation summary
              const conversationText = messages
                .map((msg) => {
                  if (typeof msg.content === "string") {
                    return `${msg.role.toUpperCase()}: ${msg.content}`;
                  }
                  if (Array.isArray(msg.content)) {
                    const parts = msg.content.map((part) => {
                      if (part.type === "text") return part.text;
                      if (part.type === "image")
                        return `[Image: ${part.image}]`;
                      return "";
                    });
                    return `${msg.role.toUpperCase()}: ${parts.join(" ")}`;
                  }
                  return `${msg.role.toUpperCase()}: [Unsupported format]`;
                })
                .join("\n\n");

              const summary = await generateText({
                model: google(modelToUse),
                system:
                  "You are an expert at summarizing pest consultation chats into clear, concise reports for pest control professionals.",
                prompt: `Summarize this pest consultation conversation into a short report (under 120 words) with bullet points covering:
                
- Main pest issue and evidence
- Images shared (if any, note the link)
- Homeowner concerns
- Context (location, duration, etc.)
- Next steps or recommendations

Conversation:
${conversationText}
                `,
                temperature: 0.7,
              });

              console.log("📝 Summary generated:", summary.text);

              const response = await fetch(`${baseUrl}/api/finalize-lead`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  sessionId: sessionId,
                  summary: summary.text,
                  finalNote: args.finalNote,
                }),
              });

              const result = await response.json();
              console.log("✅ Finalize result:", result);

              return { success: true, message: "Lead finalized successfully" };
            } catch (error) {
              console.error("❌ Error finalizing lead:", error);
              return { success: false, message: "Failed to finalize lead" };
            }
          },
        }),
      },
      stopWhen: stepCountIs(10),
    });

    if (sessionId) {
      const userMessage = imageUrl
        ? [
            { type: "image", image: imageUrl },
            { type: "text", text: message },
          ]
        : message;

      try {
        await fetch(`${baseUrl}/api/save-chat-message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            userMessage: userMessage,
            botResponse: text,
            allMessages: history
              ? [...history, { sender: "user", content: message }]
              : [{ sender: "user", content: message }],
          }),
        });
      } catch (error) {
        console.error("Error saving chat message:", error);
      }
    }

    return NextResponse.json({
      response:
        text ||
        "Thanks for chatting with me! I'll make sure you get all the information you need.",
      shouldSaveToSheets: false,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error: "Failed to process message",
        response:
          "I apologize, but I'm having trouble responding right now. Please try again!",
      },
      { status: 500 }
    );
  }
}
