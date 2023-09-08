import {
  getCategoriesBySelectedLocation,
  getLocationsByUserId,
  getSingleProduct,
} from "@/lib/server";
import React from "react";
import { products, users } from "@prisma/client";
import EditProduct from "./EditProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib";
import { cookies } from "next/headers";
import BackOfficeLayout from "@/components/BackOfficeLayout";

export default async function SingleProduct({ params }: { params: any }) {
  const cookieStore = cookies();

  const locations_id = cookieStore.get("selectedLocationId")?.value as string;

  const session = await getServerSession(authOptions);
  const user = session?.user as users;
  const user_id = user.id as string;

  const locations = await getLocationsByUserId(user_id);

  const id = params.id;
  const product = (await getSingleProduct(id)) as products;

  const locations_categories_products =
    await prisma.locations_categories_products.findMany({
      where: {
        location_id: locations_id,
        product_id: id,
      },
    });

  const categoryIds = locations_categories_products.map(
    (item) => item.category_id
  );
  const categories = await prisma.categories.findMany({
    where: { location_id: locations_id },
  });

  const connectedCategoryIds = locations_categories_products.map(
    (item) => item.category_id
  );
  const connectedCategories = await prisma.categories.findMany({
    where: { id: { in: connectedCategoryIds } },
  });
  console.log("locations_id", locations_id);

  return (
    <BackOfficeLayout
      title="Edit Product"
      link="/backoffice/products"
      button="Back To Products">
      <EditProduct
        id={id}
        product={product}
        categories={categories}
        productBycategories={connectedCategories}
        locations_id={locations_id}
      />
    </BackOfficeLayout>
  );
}
