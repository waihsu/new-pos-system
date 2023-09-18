import { getLocationId } from "@/app/actions";
import { prisma } from "@/lib";
import { Box } from "@mui/material";
import React from "react";
import CreateAddonCategory from "./CreateAddonCategory";

export default async function NewAddonCategory() {
  const location_id = await getLocationId();
  const LCP = await prisma.locations_categories_products.findMany({
    where: { location_id: location_id },
  });
  const productIds = LCP.map((item) => item.product_id);

  const validProducts = await prisma.products.findMany({
    where: { id: { in: productIds } },
  });

  return (
    <Box>
      <CreateAddonCategory products={validProducts} />
    </Box>
  );
}
