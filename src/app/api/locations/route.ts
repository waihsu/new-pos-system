import { prisma } from "@/lib";
import { generateQR, generateRandomNumber } from "@/lib/server";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { decode } from "base64-arraybuffer";

export async function POST(req: NextRequest) {
  const { newLocation } = await req.json();
  const { name, address, user_id, phone, asset_url } = newLocation;

  const qrCodeBuffer = await generateQR(phone);
  const image = Buffer.from(
    qrCodeBuffer.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const randomNumber = generateRandomNumber(0, 1000);
  const { data: image_path } = await supabase.storage
    .from("qrcode")
    .upload(phone + "_" + randomNumber, image, {
      contentType: "image/png",
    });

  const { data: image_publicUrl } = await supabase.storage
    .from("qrcode")
    .getPublicUrl(image_path?.path as string);
  const qrcode_url = image_publicUrl.publicUrl;
  const createdLocation = await prisma.locations.create({
    data: {
      name,
      address,
      phone,
      user_id,
      asset_url,
      qrcode_url,
    },
  });
  return NextResponse.json({ messg: "ok" });
}

export async function PUT(req: NextRequest) {
  const { id, name, address, asset_url, phone, user_id } = await req.json();
  const qrCodeBuffer = await generateQR(phone);
  const image = Buffer.from(
    qrCodeBuffer.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const randomNumber = generateRandomNumber(0, 1000);
  const { data: image_path } = await supabase.storage
    .from("qrcode")
    .upload(phone + "_" + randomNumber, image, {
      contentType: "image/png",
    });
  console.log(image_path?.path);
  const { data: image_publicUrl } = await supabase.storage
    .from("qrcode")
    .getPublicUrl(image_path?.path as string);
  const qrcode_url = image_publicUrl.publicUrl;
  const updateShop = await prisma.locations.update({
    where: {
      id: id,
    },
    data: {
      name,
      address,
      asset_url,
      phone,
      qrcode_url,
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

export async function GET(req: NextRequest) {
  const locations = await prisma.locations.findMany();
  return NextResponse.json(locations);
}
