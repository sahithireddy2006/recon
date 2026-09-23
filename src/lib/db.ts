import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

// Neon PostgreSQL connection string
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_bimRTwE9JjW7@ep-orange-cake-a7c1wfpb-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

export const sql = neon(connectionString);

/**
 * Check Neon DB connectivity
 */
export async function checkDatabaseConnection(): Promise<{
  connected: boolean;
  version?: string;
  error?: string;
}> {
  try {
    const result = await sql`SELECT version(), current_database() as db_name, now() as current_time;`;
    return {
      connected: true,
      version: result[0]?.version as string,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      connected: false,
      error: message,
    };
  }
}

/**
 * Initialize all database tables, columns, indexes, and initial demo accounts
 */
export async function initializeDatabaseSchema(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    // 1. Users table
    await sql`
      CREATE TABLE IF NOT EXISTS lms_users (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        handle VARCHAR(64) UNIQUE NOT NULL,
        role VARCHAR(32) NOT NULL DEFAULT 'student',
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255),
        avatar TEXT,
        bio TEXT,
        rating INTEGER DEFAULT 1200,
        max_rating INTEGER DEFAULT 1200,
        streak INTEGER DEFAULT 0,
        solved_count INTEGER DEFAULT 0,
        is_public BOOLEAN DEFAULT true,
        semester INTEGER DEFAULT 1,
        department VARCHAR(255),
        status VARCHAR(32) DEFAULT 'Active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // Ensure password_hash and status columns exist if table was previously created without them
    await sql`ALTER TABLE lms_users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);`;
    await sql`ALTER TABLE lms_users ADD COLUMN IF NOT EXISTS status VARCHAR(32) DEFAULT 'Active';`;

    // 2. Lesson progress table
    await sql`
      CREATE TABLE IF NOT EXISTS lms_lesson_progress (
        user_id VARCHAR(64) REFERENCES lms_users(id) ON DELETE CASCADE,
        subject_id VARCHAR(64) NOT NULL,
        lesson_id VARCHAR(64) NOT NULL,
        completed BOOLEAN DEFAULT true,
        completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        PRIMARY KEY (user_id, subject_id, lesson_id)
      );
    `;

    // 3. Test attempts table
    await sql`
      CREATE TABLE IF NOT EXISTS lms_test_attempts (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(64) REFERENCES lms_users(id) ON DELETE CASCADE,
        subject_id VARCHAR(64) NOT NULL,
        test_id VARCHAR(64) NOT NULL,
        score INTEGER NOT NULL,
        passed BOOLEAN NOT NULL,
        attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // 4. Contest Submissions table
    await sql`
      CREATE TABLE IF NOT EXISTS lms_submissions (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(64) REFERENCES lms_users(id) ON DELETE CASCADE,
        contest_id VARCHAR(64) NOT NULL,
        problem_id VARCHAR(64) NOT NULL,
        code TEXT NOT NULL,
        language VARCHAR(32) NOT NULL,
        verdict VARCHAR(64) NOT NULL,
        points INTEGER DEFAULT 0,
        execution_time_sec NUMERIC(6, 3),
        memory_mb INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // 5. Seed default demo accounts with hashed passwords if missing
    const defaultPasswordHash = bcrypt.hashSync("password123", 10);

    // Student Alex Chen
    await sql`
      INSERT INTO lms_users (id, name, handle, role, email, password_hash, avatar, bio, rating, max_rating, streak, solved_count, is_public, semester, department, status)
      VALUES (
        'usr_student_01',
        'Alex Chen',
        'alex_chen',
        'student',
        'alex.chen@student.recon.edu',
        ${defaultPasswordHash},
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        'CS Undergraduate @ RECON. Systems programmer, competitive coder, algorithm enthusiast. Aiming for Grandmaster.',
        1742,
        1810,
        18,
        142,
        true,
        4,
        'Computer Science & Engineering',
        'Active'
      )
      ON CONFLICT (id) DO UPDATE SET
        password_hash = EXCLUDED.password_hash,
        rating = EXCLUDED.rating;
    `;

    // Teacher Dr. Marcus Vance
    await sql`
      INSERT INTO lms_users (id, name, handle, role, email, password_hash, avatar, bio, rating, max_rating, streak, solved_count, is_public, semester, department, status)
      VALUES (
        'usr_teacher_01',
        'Dr. Marcus Vance',
        'prof_vance',
        'teacher',
        'marcus.vance@faculty.recon.edu',
        ${defaultPasswordHash},
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        'Associate Professor of Computer Science. Research in Distributed Systems, High-Performance Query Engines, and OS Kernels.',
        2315,
        2420,
        84,
        520,
        true,
        4,
        'Computer Science & Engineering',
        'Active'
      )
      ON CONFLICT (id) DO UPDATE SET
        password_hash = EXCLUDED.password_hash;
    `;

    // Admin Eleanor Wright
    await sql`
      INSERT INTO lms_users (id, name, handle, role, email, password_hash, avatar, bio, rating, max_rating, streak, solved_count, is_public, semester, department, status)
      VALUES (
        'usr_admin_01',
        'Eleanor Wright',
        'admin_wright',
        'admin',
        'eleanor.wright@admin.recon.edu',
        ${defaultPasswordHash},
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        'Platform Administrator & Chief Academic Director. Managing academic infrastructure, student quotas, and contest governance.',
        1980,
        2050,
        45,
        310,
        false,
        4,
        'Academic Operations',
        'Active'
      )
      ON CONFLICT (id) DO UPDATE SET
        password_hash = EXCLUDED.password_hash;
    `;

    // Pre-seed some default lesson progress for Alex Chen if none exists
    await sql`
      INSERT INTO lms_lesson_progress (user_id, subject_id, lesson_id, completed)
      VALUES 
        ('usr_student_01', 'cs201', 'les_cs201_01', true),
        ('usr_student_01', 'cs201', 'les_cs201_02', true),
        ('usr_student_01', 'cs201', 'les_cs201_03', true),
        ('usr_student_01', 'cs202', 'les_cs202_01', true),
        ('usr_student_01', 'cs203', 'les_cs203_01', true),
        ('usr_student_01', 'cs203', 'les_cs203_02', true)
      ON CONFLICT (user_id, subject_id, lesson_id) DO NOTHING;
    `;

    return {
      success: true,
      message:
        "Neon DB initialized with tables, columns, indexes, and pre-seeded unique accounts (Alex Chen, Dr. Vance, Eleanor Wright).",
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Database migration error:", message);
    return {
      success: false,
      message,
    };
  }
}
