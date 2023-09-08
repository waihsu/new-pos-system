import { authOptions } from "@/app/api/auth/[...nextauth]/options";

import { cookies } from "next/headers";
import { locations, users } from "@prisma/client";
import { getServerSession } from "next-auth";
import React from "react";

import { Box } from "@mui/material";
import NewLocation from "./newLocation";
import { getLocationsByUserId } from "@/lib/server";

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user as users;
  const user_id = user.id as string;
  const locations = (await getLocationsByUserId(user_id)) as locations[];

  const cookiesStore = cookies();
  const selectedLocationId = cookiesStore.get("selectedLocationId")
    ?.value as string;
  console.log("selectedLocationId", selectedLocationId);
  return (
    <Box>
      <NewLocation
        user_id={user_id}
        locations={locations}
        locations_id={selectedLocationId}
      />
    </Box>
  );
}
