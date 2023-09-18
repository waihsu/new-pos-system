import { prisma } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, price, addon_category_id } = await req.json();
  const createAddon = await prisma.addons.create({
    data: {
      name,
      price,
      addon_category_id,
    },
  });
  return NextResponse.json({ createAddon });
}

export async function DELETE(req: NextRequest) {
  const id = await req.json();
  const deleteAddon = await prisma.addons.delete({
    where: { id: id },
  });
  return NextResponse.json({ deleteAddon });
}
