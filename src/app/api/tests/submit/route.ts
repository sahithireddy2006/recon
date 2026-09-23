import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    const body = await req.json();
    const { subjectId, testId, score, passed, userId: providedUserId } = body;

    const targetUserId = user?.id || providedUserId || "usr_student_01";

    if (!subjectId || !testId || score === undefined) {
      return NextResponse.json(
        { error: "subjectId, testId, and score are required." },
        { status: 400 }
      );
    }

    // Insert attempt into Neon DB
    const attemptRows = await sql`
      INSERT INTO lms_test_attempts (user_id, subject_id, test_id, score, passed)
      VALUES (${targetUserId}, ${subjectId}, ${testId}, ${Number(score)}, ${Boolean(passed)})
      RETURNING id, score, passed, attempted_at;
    `;

    // Calculate user's overall test average & accuracy
    const avgRows = await sql`
      SELECT AVG(score) as avg_score, count(*) as count
      FROM lms_test_attempts
      WHERE user_id = ${targetUserId};
    `;

    const avgScore = Math.round(Number(avgRows[0]?.avg_score || score));

    return NextResponse.json({
      success: true,
      attempt: attemptRows[0],
      overallAverage: avgScore,
    });
  } catch (error) {
    console.error("Error submitting test:", error);
    return NextResponse.json({ error: "Failed to submit assessment to database." }, { status: 500 });
  }
}
