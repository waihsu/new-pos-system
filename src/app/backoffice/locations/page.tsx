import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getLocations } from "@/lib/server";
import { cookies } from "next/headers";
import { users } from "@prisma/client";
import { getServerSession } from "next-auth";
import React from "react";

import { Box } from "@mui/material";
import NewLocation from "./newLocation";

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user as users;
  const user_id = user.id as string;
  const locations = await getLocations(user_id);

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
