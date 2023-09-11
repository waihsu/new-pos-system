import ProductCategoriesTabs from "@/app/[name]/ProductCategoriesTabs";
import ShopLayout from "@/components/ShopLayout";

import { prisma } from "@/lib";
import { getCategoriesBySelectedLocation } from "@/lib/server";
import { locations } from "@prisma/client";
import React from "react";

export default async function page({ params }: { params: string }) {
  const { name }: any = params;
  console.log("name", name);
  const locations = (await prisma.locations.findUnique({
    where: { name: name },
  })) as locations;
  const locationId = locations.id;
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
    <ShopLayout locations={locations}>
      <ProductCategoriesTabs
        name={name}
        locations_categories_products={locations_categories_products}
        categories={categories}
        products={products}
      />
    </ShopLayout>
  );
}
