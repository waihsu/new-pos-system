import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import ProfileAvatar from "./ProfileAvatar";
import { prisma } from "@/lib";
import ShopSearchBar from "./ShopSearchBar";

export default async function MainNav() {
  const locations = await prisma.locations.findMany();
  return (
    <Box
      sx={{
        minWidth: "100vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
        position: "fixed",
        zIndex: 10,
        top: 0,
        left: 0,
        py: 1,
        px: 3,
      }}>
      <Link href={"/"} style={{ textDecoration: "none" }}>
        <Typography sx={{ color: "yellowgreen" }} variant="h4">
          All In One
        </Typography>
      </Link>
      <ShopSearchBar locations={locations} />
      <ProfileAvatar />
    </Box>
  );
}
