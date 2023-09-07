import { Box, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";

export default function ItemCard({
  name,
  icon,
}: {
  name: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <Flex direction={"column"} gap="3" align="center">
        {icon}
        <Box>
          <Text as="div" size="2" weight="bold">
            {name}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
}
