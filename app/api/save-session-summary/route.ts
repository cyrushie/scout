import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { sessionId, summary } = await request.json();

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
              // Handle errors
            }
          },
        },
      }
    );

    const { error } = await supabase
      .from("assessment_users")
      .update({ summary })
      .eq("session_id", sessionId);

    if (error) {
      console.error("Error saving summary:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error in save-session-summary:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
