"use server";

import { cookies } from "next/headers";

export async function getLocationIds() {
  const cookieStore = cookies();

  const locations_id = cookieStore.get("selectedLocationId")?.value as string;
  return locations_id;
}

export async function setLocation(location_id: string) {
  cookies().set("selectedLocationId", location_id);
}
