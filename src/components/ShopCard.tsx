import { locations } from "@prisma/client";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ShopCard({ locations }: { locations: locations[] }) {
  return (
    <Box style={{ display: "flex", gap: 2 }}>
      {locations.map((location) => (
        <Link key={location.id} href={location.name}>
          <Card style={{ maxWidth: 300 }}>
            <Flex direction={"column"} gap="3" align="center">
              <Image
                src={location.asset_url as string}
                alt="shop"
                width={100}
                height={100}
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  {location.name}
                </Text>
                <Text as="div" size="2" color="gray">
                  {location.address}
                </Text>
              </Box>
            </Flex>
          </Card>
        </Link>
      ))}
    </Box>
  );
}
