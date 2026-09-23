import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { hashPassword, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, handle, email, password, department, semester } = body;

    // Validation
    if (!name || !handle || !email || !password) {
      return NextResponse.json(
        { error: "Name, handle, email, and password are required." },
        { status: 400 }
      );
    }

    const cleanHandle = handle.trim().toLowerCase().replace(/[^a-z0-9_]/g, "");
    const cleanEmail = email.trim().toLowerCase();

    if (cleanHandle.length < 3) {
      return NextResponse.json(
        { error: "Handle must be at least 3 characters and contain only letters, numbers, and underscores." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Check unique email
    const existingEmail = await sql`
      SELECT id FROM lms_users WHERE LOWER(email) = ${cleanEmail} LIMIT 1;
    `;
    if (existingEmail.length > 0) {
      return NextResponse.json(
        { error: "An account with this email address already exists. Please log in instead." },
        { status: 409 }
      );
    }

    // Check unique handle
    const existingHandle = await sql`
      SELECT id FROM lms_users WHERE LOWER(handle) = ${cleanHandle} LIMIT 1;
    `;
    if (existingHandle.length > 0) {
      return NextResponse.json(
        { error: `The handle @${cleanHandle} is already taken. Please choose another handle.` },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);
    const userId = `usr_student_${Date.now()}`;
    const userSemester = Number(semester) || 1;
    const userDept = (department || "Computer Science & Engineering").trim();

    // Default avatar based on handle
    const avatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanHandle}`;

    await sql`
      INSERT INTO lms_users (
        id, name, handle, role, email, password_hash, avatar, bio,
        rating, max_rating, streak, solved_count, is_public, semester, department, status
      ) VALUES (
        ${userId}, ${name.trim()}, ${cleanHandle}, 'student', ${cleanEmail}, ${passwordHash}, ${avatar},
        'New scholar at RECON. Beginning academic progression and competitive rating journey.',
        1200, 1200, 1, 0, true, ${userSemester}, ${userDept}, 'Active'
      );
    `;

    const user = {
      id: userId,
      name: name.trim(),
      handle: cleanHandle,
      role: "student" as const,
      email: cleanEmail,
      avatar,
      bio: "New scholar at RECON. Beginning academic progression and competitive rating journey.",
      rating: 1200,
      maxRating: 1200,
      streak: 1,
      solvedCount: 0,
      isPublic: true,
      semester: userSemester,
      department: userDept,
      bestRank: 0,
      accuracy: 100,
    };

    const res = NextResponse.json({ success: true, user });

    // Set HTTP-only session cookie
    res.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: userId,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return res;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to register account. Database error occurred." },
      { status: 500 }
    );
  }
}
