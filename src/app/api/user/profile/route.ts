import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser();
    const body = await req.json();
    const { name, bio, department, isPublic, userId: providedUserId } = body;

    const targetUserId = authUser?.id || providedUserId;
    if (!targetUserId) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    await sql`
      UPDATE lms_users
      SET 
        name = COALESCE(${name}, name),
        bio = COALESCE(${bio}, bio),
        department = COALESCE(${department}, department),
        is_public = COALESCE(${isPublic}, is_public)
      WHERE id = ${targetUserId};
    `;

    return NextResponse.json({ success: true, message: "Profile updated successfully in Neon DB." });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Failed to update profile." }, { status: 500 });
  }
}
