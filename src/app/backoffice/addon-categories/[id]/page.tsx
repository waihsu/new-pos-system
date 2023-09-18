import { getLocationId } from "@/app/actions";
import BackOfficeLayout from "@/components/BackOfficeLayout";
import { prisma } from "@/lib";
import React from "react";
import EditAddonCategory from "./EditAddonCategory";
import { addon_categories } from "@prisma/client";

export default async function page({ params }: { params: any }) {
  const { id } = params;
  const addonCategory = await prisma.addon_categories.findFirst({
    where: { id: id },
  });
  const location_id = await getLocationId();
  const LCP = await prisma.locations_categories_products.findMany({
    where: { location_id: location_id },
  });
  const productIds = LCP.map((item) => item.product_id);
  const products = await prisma.products.findMany({
    where: { id: { in: productIds } },
  });
  const connectedProductIds = addonCategory?.product_id;
  const connectedProducts = await prisma.products.findMany({
    where: {
      id: { in: connectedProductIds },
    },
  });

  return (
    <BackOfficeLayout title="Edit Addon Category">
      <EditAddonCategory
        products={products}
        connectedProducts={connectedProducts}
        addonCategory={addonCategory as addon_categories}
      />
    </BackOfficeLayout>
  );
}
