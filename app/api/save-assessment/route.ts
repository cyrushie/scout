// Keeping for backward compatibility
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  return NextResponse.json(
    {
      success: false,
      error: "This endpoint is deprecated. Use /api/save-lead instead.",
    },
    { status: 410 }
  );
}
