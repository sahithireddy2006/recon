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
    const { name, email, role, department } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const baseHandle = name.trim().toLowerCase().replace(/[^a-z0-9]/g, "_").slice(0, 15);
    const handle = `${baseHandle}_${Math.floor(Math.random() * 900 + 100)}`;
    const passwordHash = await hashPassword("password123");
    const userId = `usr_${role || "student"}_${Date.now()}`;

    await sql`
      INSERT INTO lms_users (
        id, name, handle, role, email, password_hash, avatar, bio,
        rating, max_rating, streak, solved_count, is_public, semester, department, status
      ) VALUES (
        ${userId}, ${name.trim()}, ${handle}, ${role || "student"}, ${cleanEmail},
        ${passwordHash},
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        'Academic member provisioned by administration.',
        1200, 1200, 0, 0, true, 1, ${(department || "Computer Science").trim()}, 'Active'
      );
    `;

    return NextResponse.json({
      success: true,
      user: { id: userId, name: name.trim(), email: cleanEmail, handle, role: role || "student" },
    });
  } catch (error) {
    console.error("Admin user creation error:", error);
    return NextResponse.json({ error: "Failed to provision user." }, { status: 500 });
  }
}
