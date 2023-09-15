import { authOptions } from "@/app/api/auth/[...nextauth]/options";

import { cookies } from "next/headers";
import { locations, users } from "@prisma/client";
import { getServerSession } from "next-auth";
import React from "react";

import { Box } from "@mui/material";
import NewLocation from "./newLocation";
import { getLocationsByUserId } from "@/lib/server";
import { Button, Card, Flex, Text } from "@radix-ui/themes";
import DeleteShop from "./DeleteShop";

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user as users;
  const user_id = user.id as string;
  const locations = (await getLocationsByUserId(user_id)) as locations[];

  const cookiesStore = cookies();
  const selectedLocationId = cookiesStore.get("selectedLocationId")
    ?.value as string;

  return (
    <Box>
      <NewLocation
        user_id={user_id}
        locations={locations}
        locations_id={selectedLocationId}
      />
      <Flex gap={"3"} direction={"column"} mt={"4"}>
        <Text size={"5"}>My Shops</Text>
        {locations.map((location) => (
          <Card key={location.id} style={{ maxWidth: 400 }}>
            <Flex justify={"between"} align={"center"}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Text size={"3"} weight={"bold"}>
                  {location.name}
                </Text>
                <Text size={"2"}>{location.address}</Text>
              </Box>
              <DeleteShop location_id={location.id} />
            </Flex>
          </Card>
        ))}
      </Flex>
    </Box>
  );
}
