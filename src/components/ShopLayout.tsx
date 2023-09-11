import { Box } from "@mui/material";
import React from "react";
import Navbar from "./Navbar";
import { locations } from "@prisma/client";
import Image from "next/image";
import Footer from "./Footer";

export default function ShopLayout({
  locations,
  children,
}: {
  locations: locations;
  children: React.ReactNode;
}) {
  return (
    <Box position={"relative"}>
      <Navbar name={locations.name} />
      <Box sx={{ width: "100vw", height: 500 }}>
        <Image
          src={locations.asset_url}
          alt="banner"
          sizes="100vw"
          style={{ width: "100%", height: "100%" }}
          width={0}
          height={0}
        />
      </Box>
      {children}
      <Footer locations={locations} />
    </Box>
  );
}
