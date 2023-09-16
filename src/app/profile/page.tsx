import { Avatar, Box, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { customers, users } from "@prisma/client";
import { prisma } from "@/lib";
import EditCustomerForm from "./EditCustomerForm";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user as users;
  const customers = await prisma.customers.findFirst({
    where: { user_id: user.id },
  });
  return (
    <Box>
      <Typography>Profile</Typography>
      <Box>
        <Box>
          <Avatar src={user.asset_url} alt="profile" />
          <Typography>{user.username}</Typography>
        </Box>
        <Box>
          <EditCustomerForm customers={customers as customers} />
        </Box>
      </Box>
    </Box>
  );
}
