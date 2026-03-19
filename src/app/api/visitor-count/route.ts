import { NextResponse } from "next/server";
import { readJsonFile, writeJsonFile } from "@/lib/storage";

interface VisitorData {
  count: number;
}

const FILENAME = "visitors.json";

export async function GET() {
  const data = await readJsonFile<VisitorData>(FILENAME, { count: 0 });
  return NextResponse.json(data);
}

export async function POST() {
  const data = await readJsonFile<VisitorData>(FILENAME, { count: 0 });
  data.count += 1;
  await writeJsonFile(FILENAME, data);
  return NextResponse.json(data);
}
