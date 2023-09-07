import { prisma } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, location_id } = await req.json();
  const createdCategory = await prisma.categories.create({
    data: { name, location_id },
  });
  return NextResponse.json({ createdCategory });
}
