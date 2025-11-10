import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
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
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing user sessions.
            }
          },
        },
      }
    );

    const { data, error } = await supabase
      .from("chat_history")
      .select("messages")
      .eq("session_id", sessionId)
      .single();

    if (error) {
      console.error("Error fetching chat history:", error);
      return NextResponse.json({ messages: [] });
    }

    if (!data || !data.messages) {
      return NextResponse.json({ messages: [] });
    }

    return NextResponse.json({ messages: data.messages });
  } catch (error) {
    console.error("Get chat history error:", error);
    return NextResponse.json({ messages: [] }, { status: 500 });
  }
}
