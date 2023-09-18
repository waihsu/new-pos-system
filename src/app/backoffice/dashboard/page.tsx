import { getLocationId } from "@/app/actions";
import BackOfficeLayout from "@/components/BackOfficeLayout";
import { prisma } from "@/lib";
import { getLCPbySelectedLocationId } from "@/lib/server";
import { Box, Typography } from "@mui/material";
import { Card } from "@radix-ui/themes";
import { format } from "date-fns";
import React from "react";

export default async function Dashboard() {
  const location_id = await getLocationId();
  const LCP = await getLCPbySelectedLocationId(location_id);

  const totalOrders = await prisma.orders.count({
    where: { location_id: location_id },
  });
  const todayOrders = await prisma.orders.count({
    where: { location_id: location_id, createdAt: new Date() },
  });

  return (
    <BackOfficeLayout title="Dashboard">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
        }}>
        <Card style={{ padding: "20px 40px" }}>
          <Typography>Total Products</Typography>
          <Typography
            sx={{ textAlign: "center", fontSize: 24, fontWeight: 800 }}>
            {LCP.length}
          </Typography>
        </Card>
        <Card style={{ padding: "20px 40px" }}>
          <Typography>Total Orders</Typography>
          <Typography
            sx={{ textAlign: "center", fontSize: 24, fontWeight: 800 }}>
            {totalOrders}
          </Typography>
        </Card>
        <Card style={{ padding: "20px 40px" }}>
          <Typography>Today Orders</Typography>
          <Typography
            sx={{ textAlign: "center", fontSize: 24, fontWeight: 800 }}>
            {todayOrders}
          </Typography>
        </Card>
      </Box>
    </BackOfficeLayout>
  );
}
