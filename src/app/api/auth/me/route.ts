import { NextResponse } from "next/server";
import { getAuthenticatedUser, SESSION_COOKIE_NAME } from "@/lib/auth";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    // Fetch user's completed lessons from Neon DB
    const progressRows = await sql`
      SELECT subject_id, lesson_id, completed
      FROM lms_lesson_progress
      WHERE user_id = ${user.id} AND completed = true;
    `;

    // Fetch user's test attempts from Neon DB
    const testRows = await sql`
      SELECT subject_id, test_id, score, passed, attempted_at
      FROM lms_test_attempts
      WHERE user_id = ${user.id}
      ORDER BY attempted_at DESC;
    `;

    // Fetch user's contest submissions count from Neon DB
    const subRows = await sql`
      SELECT count(*) as count, count(case when verdict = 'ACCEPTED' then 1 end) as solved
      FROM lms_submissions
      WHERE user_id = ${user.id};
    `;

    return NextResponse.json({
      authenticated: true,
      user,
      completedLessons: progressRows.map((r) => ({
        subjectId: r.subject_id as string,
        lessonId: r.lesson_id as string,
      })),
      testAttempts: testRows.map((r) => ({
        subjectId: r.subject_id as string,
        testId: r.test_id as string,
        score: Number(r.score),
        passed: Boolean(r.passed),
      })),
      submissionStats: {
        total: Number(subRows[0]?.count || 0),
        solved: Number(subRows[0]?.solved || 0),
      },
    });
  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json({ authenticated: false, user: null }, { status: 500 });
  }
}
