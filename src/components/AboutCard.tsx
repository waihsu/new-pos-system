import { prisma } from "@/lib";
import { Box, Card, Divider, Typography } from "@mui/material";
import { locations } from "@prisma/client";
import React from "react";

export default async function AboutCard({ location }: { location: locations }) {
  const location_id = location?.id;
  const services = await prisma.services.findMany({
    where: { location_id: location_id },
  });
  return (
    <Box width={300} height={300}>
      <Card
        sx={{
          p: 4,
          bgcolor: "transparent",
          boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
        }}>
        <Typography variant="h5" sx={{ textAlign: "center", color: "#00AD85" }}>
          Shop Details
        </Typography>
        <Typography>Name - {location?.name}</Typography>
        <Typography>Address - {location?.address}</Typography>
        <Typography>Phone - {location?.phone}</Typography>
        <Divider sx={{ my: 2 }} />
        <Box>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", color: "#00AD85" }}>
            Services
          </Typography>
          {services.map((item) => (
            <Box key={item.id}>
              <Typography sx={{ fontSize: 18, my: 1 }}>{item.title}</Typography>
              <Typography sx={{ fontSize: 14 }}>{item.context}</Typography>
            </Box>
          ))}
        </Box>
      </Card>
    </Box>
  );
}
