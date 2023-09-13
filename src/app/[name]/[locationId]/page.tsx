import ShopLayout from "@/components/ShopLayout";

import { prisma } from "@/lib";
import { getCategoriesBySelectedLocation } from "@/lib/server";
import { locations } from "@prisma/client";
import React from "react";
import ProductCategoriesTabs from "./ProductCategoriesTabs";
import { Box } from "@mui/material";
import Image from "next/image";

export default async function page({ params }: { params: string }) {
  const { name, locationId }: any = params;
  console.log("name", name, "locationId", locationId);
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
      <Box sx={{ width: "100vw", height: 500 }}>
        <Image
          src={locations?.asset_url}
          alt="banner"
          sizes="100vw"
          style={{ width: "100%", height: "100%" }}
          width={0}
          height={0}
        />
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
