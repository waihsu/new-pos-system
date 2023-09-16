import { Box } from "@mui/material";
import React from "react";
import Navbar from "./Navbar";
import { locations } from "@prisma/client";
import Image from "next/image";
import Footer from "./Footer";
import AboutCard from "./AboutCard";

export default function ShopLayout({
  locations,
  children,
}: {
  locations: locations;
  children: React.ReactNode;
}) {
  return (
    <Box
      position={"relative"}
      sx={{
        background:
          "linear-gradient(90deg, rgba(255,89,0,1) 0%, rgba(255,141,0,1) 100%)",
      }}>
      <Navbar name={locations?.name} qrcode={locations.qrcode_url} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          py: 14,
          // alignItems: "center",
        }}>
        {children}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <AboutCard location={locations} />
        </Box>
      </Box>
      <Footer locations={locations} />
    </Box>
  );
}
