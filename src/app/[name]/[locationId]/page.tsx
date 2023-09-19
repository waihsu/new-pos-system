import ShopLayout from "@/components/ShopLayout";

import { prisma } from "@/lib";
import { getCategoriesBySelectedLocation } from "@/lib/server";
import { locations } from "@prisma/client";
import React from "react";
import ProductCategoriesTabs from "./ProductCategoriesTabs";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default async function page({ params }: { params: string }) {
  const { name, locationId }: any = params;
  // console.log("name", name, "locationId", locationId);
  const locations = (await prisma.locations.findUnique({
    where: { id: locationId },
  })) as locations;

  const locations_categories_products =
    await prisma.locations_categories_products.findMany({
      where: { location_id: locationId },
    });
  const categoriesIds = locations_categories_products.map(
    (item) => item.category_id
  );
  const productsIds = locations_categories_products.map(
    (item) => item.product_id
  );
  const categories = await prisma.categories.findMany({
    where: { id: { in: categoriesIds } },
  });
  const products = await prisma.products.findMany({
    where: { id: { in: productsIds } },
  });

  return (
    <Box>
      <Box
        sx={{
          width: "100vw",
          height: 500,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 8,
        }}>
        <Typography
          sx={{
            fontSize: { xs: 40, md: 100 },
            fontWeight: "bold",
            color: "yellowgreen",
          }}>
          {locations.name}
        </Typography>
      </Box>
      <ShopLayout locations={locations}>
        <ProductCategoriesTabs
          name={name}
          locationId={locationId}
          locations_categories_products={locations_categories_products}
          categories={categories}
          products={products}
        />
      </ShopLayout>
    </Box>
  );
}
