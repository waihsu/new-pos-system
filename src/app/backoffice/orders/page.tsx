import { getLocationId } from "@/app/actions";
import BackOfficeLayout from "@/components/BackOfficeLayout";
import { prisma } from "@/lib";
import { Box } from "@mui/material";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export default async function orders() {
  const location_id = await getLocationId();

  const orders = await prisma.orders.findMany({
    where: { location_id: location_id },
  });
  console.log(orders);

  const Items = orders.map((item) => item.cart);

  const userIds = orders.map((item) => item.user_id);
  const users = await prisma.users.findMany({ where: { id: { in: userIds } } });

  const name = (id: string) => {
    return users.filter((item) => item.id === id)[0].username;
  };
  return (
    <BackOfficeLayout title="Orders">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {orders.map((item) => (
          <Box key={item.id}>
            <Link href={`/backoffice/orders/${item.id}`}>
              <Card>
                <Flex justify={"between"}>
                  <Text as="div" size="2" weight="bold">
                    {name(item.user_id)}
                  </Text>
                  <Text as="div" color="gray" size="2">
                    count: {item.cart.length}
                  </Text>
                  <Text as="div" color="gray" size="2">
                    status: {item.status}
                  </Text>
                  <Text as="div" color="gray" size="2">
                    total: {item.total}
                  </Text>
                </Flex>
              </Card>
            </Link>
          </Box>
        ))}
      </Box>
    </BackOfficeLayout>
  );
}
