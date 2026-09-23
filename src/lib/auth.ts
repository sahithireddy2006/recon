import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { sql } from "./db";
import { User } from "./types";

const SESSION_COOKIE_NAME = "recon_session_user_id";
const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Get currently authenticated user from cookie in Next.js Server Components / Route Handlers
 */
export async function getAuthenticatedUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!userId) return null;

    const rows = await sql`
      SELECT id, name, handle, role, email, avatar, bio, rating, max_rating, streak,
             solved_count, is_public, semester, department, status, created_at
      FROM lms_users
      WHERE id = ${userId}
      LIMIT 1;
    `;

    if (!rows || rows.length === 0) return null;

    const row = rows[0];
    return {
      id: row.id as string,
      name: row.name as string,
      handle: row.handle as string,
      role: row.role as "student" | "teacher" | "admin",
      email: row.email as string,
      avatar:
        (row.avatar as string) ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      bio: (row.bio as string) || "",
      rating: Number(row.rating) || 1200,
      maxRating: Number(row.max_rating) || 1200,
      streak: Number(row.streak) || 0,
      solvedCount: Number(row.solved_count) || 0,
      isPublic: Boolean(row.is_public),
      semester: Number(row.semester) || 1,
      department: (row.department as string) || "Computer Science",
      bestRank: 14,
      accuracy: 91.4,
    };
  } catch (error) {
    console.error("Error in getAuthenticatedUser:", error);
    return null;
  }
}

export { SESSION_COOKIE_NAME };
