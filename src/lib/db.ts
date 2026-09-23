import { neon, neonConfig } from "@neondatabase/serverless";

// Connection string from environment variable
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_bimRTwE9JjW7@ep-orange-cake-a7c1wfpb-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

// Export raw serverless sql client
export const sql = neon(connectionString);

/**
 * Check if Neon database is reachable
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
 * Create base tables for RECON LMS in Neon DB if they don't already exist
 */
export async function initializeDatabaseSchema(): Promise<{ success: boolean; message: string }> {
  try {
    // 1. Users table
    await sql`
      CREATE TABLE IF NOT EXISTS lms_users (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        handle VARCHAR(64) UNIQUE NOT NULL,
        role VARCHAR(32) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        avatar TEXT,
        bio TEXT,
        rating INTEGER DEFAULT 1200,
        max_rating INTEGER DEFAULT 1200,
        streak INTEGER DEFAULT 0,
        solved_count INTEGER DEFAULT 0,
        is_public BOOLEAN DEFAULT true,
        semester INTEGER DEFAULT 1,
        department VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // 2. Subjects table
    await sql`
      CREATE TABLE IF NOT EXISTS lms_subjects (
        id VARCHAR(64) PRIMARY KEY,
        code VARCHAR(32) NOT NULL,
        name VARCHAR(255) NOT NULL,
        semester INTEGER NOT NULL,
        credits INTEGER NOT NULL,
        instructor_name VARCHAR(255),
        instructor_email VARCHAR(255),
        description TEXT,
        progress_percent INTEGER DEFAULT 0,
        color VARCHAR(32) DEFAULT 'coral',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // 3. Contests table
    await sql`
      CREATE TABLE IF NOT EXISTS lms_contests (
        id VARCHAR(64) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        code VARCHAR(32) NOT NULL,
        type VARCHAR(64) NOT NULL,
        status VARCHAR(32) NOT NULL,
        start_time TIMESTAMP WITH TIME ZONE,
        end_time TIMESTAMP WITH TIME ZONE,
        duration_minutes INTEGER NOT NULL,
        participants_count INTEGER DEFAULT 0,
        problems_count INTEGER DEFAULT 4,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // 4. Submissions table
    await sql`
      CREATE TABLE IF NOT EXISTS lms_submissions (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(64) NOT NULL,
        contest_id VARCHAR(64),
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

    return {
      success: true,
      message: "Neon Postgres schema initialized successfully (users, subjects, contests, submissions).",
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      message,
    };
  }
}
