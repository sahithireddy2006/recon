import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    const search = searchParams.get("search");

    let rows;
    if (role && role !== "all") {
      rows = await sql`
        SELECT id, name, handle, role, email, avatar, rating, streak, solved_count, semester, department, status, created_at
        FROM lms_users
        WHERE role = ${role}
        ORDER BY created_at DESC;
      `;
    } else {
      rows = await sql`
        SELECT id, name, handle, role, email, avatar, rating, streak, solved_count, semester, department, status, created_at
        FROM lms_users
        ORDER BY created_at DESC;
      `;
    }

    let users = rows.map((r) => ({
      id: r.id as string,
      name: r.name as string,
      handle: r.handle as string,
      role: r.role as string,
      email: r.email as string,
      avatar: r.avatar as string,
      rating: Number(r.rating) || 1200,
      streak: Number(r.streak) || 0,
      solvedCount: Number(r.solved_count) || 0,
      semester: Number(r.semester) || 1,
      department: (r.department as string) || "General",
      status: (r.status as string) || "Active",
      createdAt: r.created_at,
    }));

    if (search) {
      const q = search.toLowerCase();
      users = users.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.handle.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Admin users GET error:", error);
    return NextResponse.json({ error: "Failed to fetch user directory." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, status, role } = body;

    if (!userId) {
      return NextResponse.json({ error: "userId is required." }, { status: 400 });
    }

    if (status) {
      await sql`
        UPDATE lms_users
        SET status = ${status}
        WHERE id = ${userId};
      `;
    }

    if (role) {
      await sql`
        UPDATE lms_users
        SET role = ${role}
        WHERE id = ${userId};
      `;
    }

    return NextResponse.json({ success: true, message: "User status updated successfully." });
  } catch (error) {
    console.error("Admin users PATCH error:", error);
    return NextResponse.json({ error: "Failed to update user." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, role, department, handle: customHandle, password: customPassword } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Full name and email are required." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const userRole = role === "teacher" || role === "admin" ? role : "student";

    // 1. Check for duplicate email
    const existingEmail = await sql`
      SELECT id FROM lms_users WHERE LOWER(email) = ${cleanEmail} LIMIT 1;
    `;
    if (existingEmail && existingEmail.length > 0) {
      return NextResponse.json(
        { error: "An account with this email address already exists." },
        { status: 409 }
      );
    }

    // 2. Determine or generate handle
    let handle = customHandle
      ? customHandle.trim().toLowerCase().replace(/[^a-z0-9_]/g, "")
      : "";

    if (!handle || handle.length < 3) {
      const baseHandle = name.trim().toLowerCase().replace(/[^a-z0-9]/g, "_").slice(0, 14);
      handle = `${userRole === "teacher" ? "prof_" : ""}${baseHandle}_${Math.floor(Math.random() * 900 + 100)}`;
    }

    // Check handle collision
    const existingHandle = await sql`
      SELECT id FROM lms_users WHERE LOWER(handle) = ${handle} LIMIT 1;
    `;
    if (existingHandle && existingHandle.length > 0) {
      handle = `${handle}_${Math.floor(Math.random() * 900 + 100)}`;
    }

    // 3. Password handling
    const rawPassword = customPassword && customPassword.length >= 6
      ? customPassword
      : userRole === "teacher" ? "faculty123" : "student123";
    const passwordHash = await hashPassword(rawPassword);

    const userId = `usr_${userRole}_${Date.now()}`;
    const avatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${handle}`;
    const dept = (department || "Computer Science & Engineering").trim();
    const bio = userRole === "teacher"
      ? `Faculty Member, Department of ${dept}. Authorized course instructor and curriculum lead.`
      : userRole === "admin"
      ? `Platform Administrator & Governance Officer.`
      : `Scholar enrolled in ${dept}.`;

    const initialRating = userRole === "teacher" ? 2100 : userRole === "admin" ? 2000 : 1200;

    await sql`
      INSERT INTO lms_users (
        id, name, handle, role, email, password_hash, avatar, bio,
        rating, max_rating, streak, solved_count, is_public, semester, department, status
      ) VALUES (
        ${userId}, ${name.trim()}, ${handle}, ${userRole}, ${cleanEmail},
        ${passwordHash},
        ${avatar},
        ${bio},
        ${initialRating}, ${initialRating}, 0, 0, true, 1, ${dept}, 'Active'
      );
    `;

    return NextResponse.json({
      success: true,
      message: `${userRole === "teacher" ? "Professor" : userRole === "admin" ? "Admin" : "Student"} account provisioned successfully.`,
      user: {
        id: userId,
        name: name.trim(),
        email: cleanEmail,
        handle,
        role: userRole,
        department: dept,
      },
    });
  } catch (error) {
    console.error("Admin user creation error:", error);
    return NextResponse.json({ error: "Failed to provision user." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required." }, { status: 400 });
    }

    await sql`
      DELETE FROM lms_users
      WHERE id = ${userId};
    `;

    return NextResponse.json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    console.error("Admin user DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete user." }, { status: 500 });
  }
}

