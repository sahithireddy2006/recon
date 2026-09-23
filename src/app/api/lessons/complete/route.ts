import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    const body = await req.json();
    const { subjectId, lessonId, userId: providedUserId } = body;

    const targetUserId = user?.id || providedUserId || "usr_student_01";

    if (!subjectId || !lessonId) {
      return NextResponse.json(
        { error: "subjectId and lessonId are required." },
        { status: 400 }
      );
    }

    // Insert or update lesson progress in Neon DB
    await sql`
      INSERT INTO lms_lesson_progress (user_id, subject_id, lesson_id, completed)
      VALUES (${targetUserId}, ${subjectId}, ${lessonId}, true)
      ON CONFLICT (user_id, subject_id, lesson_id)
      DO UPDATE SET completed = true, completed_at = NOW();
    `;

    // Fetch user's updated completed lessons count
    const rows = await sql`
      SELECT count(*) as count
      FROM lms_lesson_progress
      WHERE user_id = ${targetUserId} AND completed = true;
    `;

    return NextResponse.json({
      success: true,
      totalCompletedLessons: Number(rows[0]?.count || 0),
    });
  } catch (error) {
    console.error("Error completing lesson:", error);
    return NextResponse.json({ error: "Failed to record lesson progress." }, { status: 500 });
  }
}
