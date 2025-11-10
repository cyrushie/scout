import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const cookieStore = await cookies();

    const anonKey = process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabaseUrl = process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_URL;

    if (!anonKey || !supabaseUrl) {
      return NextResponse.json(
        { success: false, error: "Missing Supabase environment variables" },
        { status: 500 }
      );
    }

    const supabase = createServerClient(supabaseUrl, anonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Handle cookie setting errors
          }
        },
      },
    });

    const { data: existingChat, error: fetchError } = await supabase
      .from("chat_history")
      .select("messages")
      .eq("session_id", data.sessionId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("[v0] Error fetching chat history:", fetchError);
    }

    const existingMessages = existingChat?.messages || [
      {
        role: "assistant",
        content:
          "Hi there! I'm Scout, your AI Pest Assessment Assistant. I help homeowners identify pest issues and recommend the best solutions — whether it's a quick DIY fix or something that needs a pro.",
      },
    ];

    const updatedMessages = [
      ...existingMessages,
      { role: "user", content: data.userMessage },
      { role: "assistant", content: data.botResponse },
    ];

    const { error: upsertError } = await supabase.from("chat_history").upsert(
      [
        {
          session_id: data.sessionId,
          messages: updatedMessages,
        },
      ],
      { onConflict: "session_id" }
    );

    if (upsertError) {
      console.error("[v0] Error saving chat history:", upsertError);
      return NextResponse.json(
        { success: false, error: "Failed to save chat history" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Chat message saved successfully",
    });
  } catch (error) {
    console.error("[v0] Error saving chat message:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to save chat message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
