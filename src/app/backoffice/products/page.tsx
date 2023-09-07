import { Box, Button, Flex, Grid, Heading } from "@radix-ui/themes";
import React from "react";
import ProductSearch from "./ProductSearch";
import ProductCard from "./ProductCard";
import { getCategoriesBySelectedLocation, getProducts } from "@/lib/server";
import { BiLogoProductHunt } from "react-icons/bi";
import BackOfficeLayout from "@/components/BackOfficeLayout";
import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/lib";
import { locations_categories_products } from "@prisma/client";

export default async function Products() {
  const location_id = cookies().get("selectedLocationId")?.value as string;
  const categories = await getCategoriesBySelectedLocation(location_id);

  const products = await getProducts(location_id);

  return (
    <BackOfficeLayout
      title="Products"
      link="/backoffice/new-product"
      button="Add Product">
      <Box style={{ maxWidth: 300 }} mb={"4"}>
        <ProductSearch />
      </Box>

      <Grid columns="4" gap="3" width="auto">
        {products.map((product) => (
          <Link
            href={`/backoffice/products/${product.id}`}
            key={product.id}
            style={{ textDecoration: "none" }}>
            <Box>
              <ProductCard
                id={product.id}
                name={product.name}
                asset_url={product.asset_url}
                description={product.description}
                price={product.price}
                stock={product.stock}
                rating={product.rating}
              />
            </Box>
          </Link>
        ))}
      </Grid>
    </BackOfficeLayout>
  );
}
