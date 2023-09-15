import { prisma } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { newLocation } = await req.json();
  //   const {name, address, user_id} = newLocation
  const createdLocation = await prisma.locations.create({ data: newLocation });
  return NextResponse.json({ createdLocation });
}

export async function PUT(req: NextRequest) {
  const { id, name, address, asset_url, phone, user_id } = await req.json();
  const updateShop = await prisma.locations.update({
    where: {
      id: id,
    },
    data: {
      name,
      address,
      asset_url,
      phone,
      user_id,
    },
  });
  return NextResponse.json({ updateShop });
}

export async function DELETE(req: NextRequest) {
  const location_id = await req.json();
  // console.log(location_id);
  const deletedShop = await prisma.locations.delete({
    where: { id: location_id },
  });
  return NextResponse.json({ deletedShop });
}
