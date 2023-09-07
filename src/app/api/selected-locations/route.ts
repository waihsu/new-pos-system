import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function Get(req: NextRequest) {
  const locations_id = await req.json();
  const cookieStore = cookies();
  const location_id = cookieStore.set("selectedLocationId", locations_id);
  return NextResponse.json({ location_id });
}
