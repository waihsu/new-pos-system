import ProductCategoriesTabs from "@/app/[id]/ProductCategoriesTabs";
import { prisma } from "@/lib";
import { getCategoriesBySelectedLocation } from "@/lib/server";
import React from "react";

export default async function page({ params }: { params: string }) {
  const { id }: any = params;
  console.log(id);
  const locations_categories_products =
    await prisma.locations_categories_products.findMany({
      where: { location_id: id },
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
  console.log("catego", categoriesIds);
  console.log("produ", productsIds);
  return (
    <div>
      {" "}
      <ProductCategoriesTabs
        locations_categories_products={locations_categories_products}
        categories={categories}
        products={products}
      />
    </div>
  );
}
