import { prisma } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { newLocation } = await req.json();
  //   const {name, address, user_id} = newLocation
  const createdLocation = await prisma.locations.create({ data: newLocation });
  return NextResponse.json({ createdLocation });
}
