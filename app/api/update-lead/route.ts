import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, name, phone, email, city, preferredTime } =
      await req.json();

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

    // Build update object with only provided fields
    // Using your existing column names: 'name' and 'preferred_contact_time'
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (name) updateData.name = name; // Using existing 'name' column
    if (phone) updateData.phone = phone;
    if (email) updateData.email = email;
    if (city) updateData.city = city;
    if (preferredTime) updateData.preferred_contact_time = preferredTime; // Using existing 'preferred_contact_time' column

    console.log("💾 Updating lead for session:", sessionId, updateData);

    // Update the existing record
    const { data, error } = await supabase
      .from("assessment_users")
      .update(updateData)
      .eq("session_id", sessionId)
      .select();

    if (error) {
      console.error("❌ Error updating lead:", error);
      return NextResponse.json(
        { error: "Failed to update lead" },
        { status: 500 }
      );
    }

    console.log("✅ Lead updated successfully:", data);

    return NextResponse.json({
      success: true,
      message: "Lead updated successfully",
      data: data,
    });
  } catch (error) {
    console.error("❌ Update lead error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
