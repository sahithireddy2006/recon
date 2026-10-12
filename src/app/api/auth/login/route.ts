import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { verifyPassword, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Email or handle, and password are required." },
        { status: 400 }
      );
    }

    const cleanIdentifier = identifier.trim().toLowerCase();

    // Query user by email OR handle
    const rows = await sql`
      SELECT id, name, handle, role, email, password_hash, avatar, bio,
             rating, max_rating, streak, solved_count, is_public, semester, department, status
      FROM lms_users
      WHERE LOWER(email) = ${cleanIdentifier} OR LOWER(handle) = ${cleanIdentifier}
      LIMIT 1;
    `;

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid credentials. No account found matching that email or handle." },
        { status: 401 }
      );
    }

    const userRow = rows[0];

    // Check account status
    if (userRow.status === "Suspended") {
      return NextResponse.json(
        { error: "This account has been suspended by administration. Please contact support." },
        { status: 403 }
      );
    }

    // Verify password hash
    const isValid = await verifyPassword(
      password,
      (userRow.password_hash as string) || ""
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Incorrect password. Please verify and try again." },
        { status: 401 }
      );
    }

    const user = {
      id: userRow.id as string,
      name: userRow.name as string,
      handle: userRow.handle as string,
      role: userRow.role as "student" | "teacher" | "admin",
      email: userRow.email as string,
      avatar:
        (userRow.avatar as string) ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      bio: (userRow.bio as string) || "",
      rating: Number(userRow.rating) || 1200,
      maxRating: Number(userRow.max_rating) || 1200,
      streak: Number(userRow.streak) || 0,
      solvedCount: Number(userRow.solved_count) || 0,
      isPublic: Boolean(userRow.is_public),
      semester: Number(userRow.semester) || 1,
      department: (userRow.department as string) || "Computer Science",
      bestRank: 14,
      accuracy: 91.4,
    };

    const res = NextResponse.json({ success: true, user });

    // Set persistent session cookie
    res.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: user.id,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);
    const detail = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Authentication failed: ${detail}` },
      { status: 500 }
    );
  }
}
