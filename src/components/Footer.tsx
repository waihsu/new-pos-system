import { Box, Typography } from "@mui/material";
import { locations } from "@prisma/client";
import React from "react";

export default function Footer({ locations }: { locations: locations }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
        background:
          "linear-gradient(90deg, rgba(189,66,0,1) 0%, rgba(179,98,0,1) 94%)",
        py: 2,
      }}>
      <Typography>{locations.address}</Typography>
      <Typography>{locations.phone}</Typography>
    </Box>
  );
}
