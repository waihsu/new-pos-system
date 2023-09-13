import { prisma } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // const { user_id, cart, total, status, location_id } = await req.json();
  const orders = await req.json();
  // console.log(user_id, cart, total, status, location_id);
  console.log(orders);
  const createOrder = await prisma.orders.create({ data: orders });
  return NextResponse.json({ createOrder });
}
