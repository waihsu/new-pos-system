import { prisma } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, location_id } = await req.json();
  const createdCategory = await prisma.categories.create({
    data: { name, location_id },
  });
  return NextResponse.json({ createdCategory });
}

export async function DELETE(req: NextRequest) {
  const id = await req.json();
  const deletedCategory = await prisma.categories.delete({
    where: { id },
  });
  const deleteCategoriesLocationsProducts =
    await prisma.locations_categories_products.deleteMany({
      where: { category_id: id },
    });
  return NextResponse.json({ deletedCategory });
}
