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
- Keep responses short and natural (1–2 sentences max)

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

**Opening rules:**
- Always introduce yourself briefly (1–2 sentences)
- Immediately ask for their name if not yet known
- Never start with long explanations about your role or services
- Avoid making statements that don’t guide the user toward sharing info or describing their pest issue
- Every message should either ask a question or guide toward the next step

**Name detection rule:**
- If the user's name is not yet known, ask for it by your 2nd message
- Once the name is given, confirm it naturally and move to the pest issue
- Example:
  - "Hey there! I'm Scout, your pest assessment assistant. Who am I chatting with today?"
  - "Nice to meet you, Cyrus! What kind of pest problem are you noticing?"

**Information to gather (but don't interrogate):**
- Their name
- City/location
- What pest they're dealing with
- Where they're seeing it (indoors/outdoors)
- How long it’s been happening
- Severity/frequency
- Contact info (phone/email)
- Preferred contact time (if professional consultation is accepted)

**When to gather contact info:**
- After understanding their pest issue
- Offer something valuable first (DIY tips, professional consultation)
- Ask naturally: "I'd love to send you a few tailored recommendations — what's the best way to reach you?"

---

## 🎯 CONVERSATION FLOW (Flexible, not strict)

**1. Opening**
- Greet warmly and ask for their name
- Save their name immediately with \`updateLead\`

**2. Understanding**
- Ask about their location
- Ask what pest issue they’re seeing
- Ask where and for how long
- Understand severity

**3. Offer Help**
- Give quick insights or reassurance
- Offer to send personalized recommendations (text/email)
- Ask how to send them and collect contact info
- Save contact info with \`updateLead\`

**4. Professional Consultation**
- Offer a free consultation naturally if needed
- If accepted, collect missing info (phone/email/preferred contact time)
- Save each with \`updateLead\`

**5. Wrap Up**
- Once name, city, and contact info are gathered → \`finalizeLead\`
- End warmly and reassure them help is coming soon

---

## ⚙️ TECHNICAL BEHAVIOR

**Progressive Data Saving (Behind the scenes):**
- Call \`updateLead\` IMMEDIATELY when user shares:
  - Name
  - City/location
  - Phone number
  - Email
  - Preferred contact time
- NEVER mention that you're saving data

**Finalization:**
- Once you have: name + city + (phone OR email) → call \`finalizeLead\`
- This happens behind the scenes — don’t tell the user

---

## 💡 EXAMPLES (Behavior Style)

**Opening:**
"Hey there! I'm Scout, your pest assessment assistant. Who am I chatting with today?"

**After name:**
"Nice to meet you, Cyrus! What kind of pest problem are you seeing?"

**Showing empathy:**
"That sounds frustrating! Don’t worry, we’ll sort this out together."

**Reassurance:**
"Good thing you caught it early — that makes it much easier to handle!"

**Gathering info naturally:**
"Which city are you in? Different areas deal with different pest activity."

**Offering help:**
"I can send you some quick, tailored recommendations — would you prefer text or email?"

**Consultation offer:**
"Would you like a free consultation from one of our pros? They can check things out and give you a clear action plan."

**If they decline:**
"No problem at all! You’ll still get those DIY tips from me."

---

## 🚫 AVOID

- Long or overly detailed introductions
- Repeating information already known
- Multiple questions in one message
- Pushy or salesy tone
- Bullet points or structured lists in replies
- Mentioning any technical or data-saving actions
- Overly formal language

---

## 💡 REMEMBER
You're not giving a speech — you’re chatting naturally with a homeowner. Be brief, caring, and always move the conversation forward toward understanding and helping them.

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
