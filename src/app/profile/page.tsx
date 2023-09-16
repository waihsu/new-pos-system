import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { customers, users } from "@prisma/client";
import { prisma } from "@/lib";
import EditCustomerForm from "./EditCustomerForm";
import MainNav from "@/components/MainNav";
import BackOfficeLayout from "@/components/BackOfficeLayout";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user as users;
  const customers = await prisma.customers.findFirst({
    where: { user_id: user.id as string },
  });
  return (
    <Box sx={{ mx: "auto" }}>
      <MainNav />

      <BackOfficeLayout title="Profile">
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, p: 6 }}>
          <Card
            sx={{
              minWidth: 400,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 3,
                mb: 2,
              }}>
              <Avatar
                src={user.asset_url}
                alt="profile"
                style={{
                  width: 60,
                  height: 60,
                  marginTop: 10,
                  marginBottom: 2,
                }}
              />
              <Typography sx={{ fontSize: 23, fontWeight: 700 }}>
                {user.username}
              </Typography>
            </Box>
            <Button>Update Profiel</Button>
          </Card>
          <Box>
            <EditCustomerForm customers={customers as customers} />
          </Box>
        </Box>
      </BackOfficeLayout>
    </Box>
  );
}
