import { products } from "@prisma/client";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Box, Card, Flex, Inset, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";

export default function ProductCard({
  id,
  name,
  description,
  price,
  asset_url,
  rating,
  stock,
}: products) {
  return (
    <Box style={{ width: 200 }}>
      <Card
        size="2"
        style={{
          maxHeight: 400,
          backgroundColor: "transparent",
          boxShadow: "0px 5px 10px 8px rgba(0, 0, 0, 0.5)",
        }}>
        <Flex direction={"column"} gap={"5"}>
          <Inset side="all" mb={"4"}>
            <Flex
              align="center"
              justify="center"
              style={{ background: "#24292F" }}>
              <Box style={{ width: "100%" }}>
                <Image
                  src={asset_url}
                  alt="product"
                  layout="cover"
                  // objectFit="contain"
                  width={200}
                  height={200}
                />
              </Box>
            </Flex>
          </Inset>

          <Flex direction={"column"} gap={"2"} style={{ maxWidth: 400 }}>
            <Text weight={"bold"} style={{ color: "#92ca43" }} size="5">
              {name}
            </Text>
            <Text color="gray" size="2">
              Stock - {stock}
            </Text>
            <Text color="gray" size="2">
              Price - {price}
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}
