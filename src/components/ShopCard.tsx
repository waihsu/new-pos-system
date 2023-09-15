import { locations } from "@prisma/client";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ShopCard({ locations }: { locations: locations[] }) {
  return (
    <Box
      style={{
        display: "flex",

        flexWrap: "wrap",
        gap: 2,
      }}>
      {locations.map((location) => (
        <Link
          key={location.id}
          href={`/${location.name}/${location.id}`}
          style={{ textDecoration: "none" }}>
          <Card
            style={{
              maxWidth: 300,
              backgroundColor: "crimson",
              minHeight: 200,
            }}>
            <Flex direction={"column"} justify={"start"} gap="3">
              <Image
                src={location.asset_url as string}
                alt="shop"
                layout="responsive"
                width={100}
                height={100}
              />
              <Box>
                <Text as="div" size="3" color="gray" weight="bold">
                  Shop-{location.name}
                </Text>
                <Text as="div" size="2" color="gray">
                  Address-{location.address}
                </Text>
                <Text as="div" size="2" color="gray">
                  Phone-{location.phone}
                </Text>
              </Box>
            </Flex>
          </Card>
        </Link>
      ))}
    </Box>
  );
}
