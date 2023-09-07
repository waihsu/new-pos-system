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
      <Card size="2">
        <Flex direction={"column"} gap={"5"}>
          <Inset side="all" mb={"4"}>
            <Flex
              align="center"
              justify="center"
              style={{ background: "#24292F" }}>
              <Image
                src={asset_url}
                alt="product"
                layout="responsive"
                width={200}
                height={200}
              />
            </Flex>
          </Inset>

          <Flex direction={"column"} gap={"2"} style={{ maxWidth: 400 }}>
            <Text weight={"bold"} color="gray" size="5">
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
