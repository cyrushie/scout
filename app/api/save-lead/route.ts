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

    const { error } = await supabase
      .from("assessment_users")
      .update({
        name: data.name || null,
        email: data.email || null,
        phone: data.phone || null,
        city: data.city || null,
        preferred_contact_time: data.preferredTime || null,
        summary: data.summary || null,
      })
      .eq("session_id", data.sessionId);

    if (error) {
      console.error("[v0] Supabase error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to save lead",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead saved successfully",
    });
  } catch (error) {
    console.error("[v0] Error saving lead:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to save lead",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
