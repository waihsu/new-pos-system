import { prisma } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: any }) {
  const { page } = context.params;
  console.log(page);
  const skip = Number(page) - 1;
  const locations = await prisma.locations.findMany({
    take: 6,
    skip: 6 * skip,
    // select: {
    //   id: true,
    //   name: true,
    //   address: true,
    //   asset_url: true,
    //   phone: true,
    // },
  });
  return NextResponse.json(locations);
}
