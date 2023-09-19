import { prisma } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // const { user_id, cart, total, status, location_id } = await req.json();
  const orders = await req.json();
  const { user_id, cart, total, status, location_id, name, phone, address } =
    orders;
  // console.log(user_id, cart, total, status, location_id);
  const existCustomer = await prisma.customers.findFirst({
    where: { user_id: user_id },
  });
  if (existCustomer) {
    await prisma.customers.update({
      where: { user_id: user_id },
      data: { name: name, phone: phone, address: address },
    });
  }
  await prisma.customers.create({
    data: { name: name, phone: phone, address: address, user_id: user_id },
  });

  const createOrder = await prisma.orders.create({
    data: {
      location_id: location_id,
      user_id: user_id,
      total: String(total),
      status: status,
      cart: cart,
      createdAt: new Date(),
    },
  });
  return NextResponse.json({ createOrder });
}

export async function DELETE(req: NextRequest) {
  const id = await req.json();
  const deletedOrder = await prisma.orders.delete({
    where: { id },
  });
  return NextResponse.json({ deletedOrder });
}
