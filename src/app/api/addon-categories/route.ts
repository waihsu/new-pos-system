import { prisma } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, is_required, product_id } = await req.json();
  const createAddonCategory = await prisma.addon_categories.create({
    data: {
      name,
      is_required,
      product_id,
    },
  });
  return NextResponse.json({ createAddonCategory });
}

export async function PUT(req: NextRequest) {
  const { id, name, is_required, product_id } = await req.json();
  const isValid = id || name || is_required || product_id;
  if (!isValid)
    return NextResponse.json({ messg: "not valid" }, { status: 401 });
  const updateAddonCategory = await prisma.addon_categories.update({
    where: { id: id },
    data: {
      name,
      is_required,
      product_id,
    },
  });
  return NextResponse.json({ updateAddonCategory });
}

export async function DELETE(req: NextRequest) {
  const id = await req.json();
  const deleteAddonCategory = await prisma.addon_categories.delete({
    where: { id },
  });
  const deleteAddons = await prisma.addons.deleteMany({
    where: { addon_category_id: id },
  });
  return NextResponse.json({ deleteAddonCategory });
}
