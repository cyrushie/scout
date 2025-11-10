import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, summary, finalNote } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID required" },
        { status: 400 }
      );
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
              // Handle errors silently
            }
          },
        },
      }
    );

    console.log("🎯 Finalizing lead for session:", sessionId);

    // Update the record with summary and mark as complete
    const updateData: any = {
      summary: summary || "Assessment completed",
      status: "completed", // Optional: if you have a status column
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (finalNote) {
      updateData.notes = finalNote;
    }

    const { data, error } = await supabase
      .from("assessment_users")
      .update(updateData)
      .eq("session_id", sessionId)
      .select();

    if (error) {
      console.error("❌ Error finalizing lead:", error);
      return NextResponse.json(
        { error: "Failed to finalize lead" },
        { status: 500 }
      );
    }

    console.log("✅ Lead finalized successfully:", data);

    return NextResponse.json({
      success: true,
      message: "Lead finalized successfully",
      data: data,
    });
  } catch (error) {
    console.error("❌ Finalize lead error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
