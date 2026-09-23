import { NextResponse } from "next/server";
import { checkDatabaseConnection, initializeDatabaseSchema } from "@/lib/db";

export async function GET() {
  const status = await checkDatabaseConnection();
  return NextResponse.json(status);
}

export async function POST() {
  const result = await initializeDatabaseSchema();
  return NextResponse.json(result);
}
