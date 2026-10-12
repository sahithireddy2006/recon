import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

// Default working Neon PostgreSQL connection string
const DEFAULT_NEON_URL =
  "postgresql://neondb_owner:npg_bimRTwE9JjW7@ep-orange-cake-a7c1wfpb-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

/**
 * Sanitizes connection string:
 * - Trims whitespace
 * - Strips accidental wrapping quotes (common when pasting from .env into Vercel UI)
 * - Validates URL format with fallback
 */
export function getCleanConnectionString(): string {
  const raw = process.env.DATABASE_URL || DEFAULT_NEON_URL;
  let clean = raw.trim();

  // If the variable contains multiple lines (e.g. pasted multiple times into Vercel UI), take the first valid line
  if (clean.includes("\n") || clean.includes("\r")) {
    const lines = clean
      .split(/[\r\n]+/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
    const validLine = lines.find(
      (l) => l.startsWith("postgresql://") || l.startsWith("postgres://")
    );
    clean = (validLine || lines[0] || DEFAULT_NEON_URL).trim();
  }

  // Strip accidental wrapping quotes (single, double, backticks)
  clean = clean.replace(/^["'`]+|["'`]+$/g, "").trim();

  // Detect and reject placeholders from .env.example
  if (
    clean.includes("ep-sample-pooler") ||
    clean.includes("username:password") ||
    clean.includes("your-neon-url")
  ) {
    console.warn("Detected placeholder DATABASE_URL, falling back to live default Neon DB endpoint.");
    return DEFAULT_NEON_URL;
  }

  // Validate URL format
  try {
    const parsed = new URL(clean);
    if (parsed.protocol === "postgresql:" || parsed.protocol === "postgres:") {
      if (parsed.hostname && parsed.hostname.length > 3) {
        return clean;
      }
    }
  } catch {
    console.warn("Invalid DATABASE_URL provided, falling back to default Neon DB endpoint.");
  }

  return DEFAULT_NEON_URL;
}

let cachedSql: NeonQueryFunction<false, false> | null = null;

function getSql(): NeonQueryFunction<false, false> {
  if (!cachedSql) {
    const connStr = getCleanConnectionString();
    cachedSql = neon(connStr);
  }
  return cachedSql;
}

/**
 * Lazy Proxy: prevents neon() evaluation during build-time page data collection.
 * Evaluates only when an actual database query is executed at runtime.
 */
export const sql = new Proxy(
  ((..._args: unknown[]) => {}) as unknown as NeonQueryFunction<false, false>,
  {
    apply(_target, _thisArg, argArray) {
      const executor = getSql();
      return (executor as any)(...argArray);
    },
    get(_target, prop, receiver) {
      const executor = getSql();
      const val = Reflect.get(executor as any, prop, receiver);
      if (typeof val === "function") {
        return val.bind(executor);
      }
      return val;
    },
  }
);

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

    // 5. Seed default institutional accounts (System Admin & Faculty Lead) with hashed passwords
    const adminPasswordHash = bcrypt.hashSync("admin123", 10);
    const facultyPasswordHash = bcrypt.hashSync("faculty123", 10);

    // Platform Administrator
    await sql`
      INSERT INTO lms_users (id, name, handle, role, email, password_hash, avatar, bio, rating, max_rating, streak, solved_count, is_public, semester, department, status)
      VALUES (
        'usr_admin_01',
        'System Administrator',
        'admin',
        'admin',
        'admin@recon.edu',
        ${adminPasswordHash},
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        'Platform Administrator & Chief Academic Director. Managing academic infrastructure, student quotas, faculty assignments, and contest governance.',
        2000,
        2050,
        45,
        310,
        false,
        4,
        'Academic Operations',
        'Active'
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        handle = EXCLUDED.handle,
        email = EXCLUDED.email,
        password_hash = EXCLUDED.password_hash;
    `;

    // Lead Faculty Professor: Dr. Marcus Vance
    await sql`
      INSERT INTO lms_users (id, name, handle, role, email, password_hash, avatar, bio, rating, max_rating, streak, solved_count, is_public, semester, department, status)
      VALUES (
        'usr_teacher_01',
        'Dr. Marcus Vance',
        'prof_vance',
        'teacher',
        'marcus.vance@faculty.recon.edu',
        ${facultyPasswordHash},
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
        name = EXCLUDED.name,
        handle = EXCLUDED.handle,
        email = EXCLUDED.email,
        password_hash = EXCLUDED.password_hash;
    `;

    return {
      success: true,
      message:
        "Neon DB initialized with tables, columns, indexes, and institutional accounts (System Admin, Faculty Lead).",
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
