"use client";
import {
  categories,
  locations_categories_products,
  products,
} from "@prisma/client";
import { Box, Button, Tabs, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import ProductCard from "../../backoffice/products/ProductCard";
import Link from "next/link";

export default function ProductCategoriesTabs({
  products,
  categories,
  locations_categories_products,
  name,
  locationId,
}: {
  locationId: string;
  name: string;
  products: products[];
  categories: categories[];
  locations_categories_products: locations_categories_products[];
}) {
  const [selectCategoryId, setSelectCategoryId] = useState<string>();

  const selectedCategoryIddProductIds = locations_categories_products
    .filter((item) => item.category_id === selectCategoryId)
    .map((item) => item.product_id);
  const selectedCategoryIdsByProducts = products.filter((item) =>
    selectedCategoryIddProductIds.includes(item.id)
  );

  if (!name && !locationId) return null;

  return (
    <Box style={{ maxWidth: 900 }}>
      <Tabs.Root defaultValue="all" style={{ minWidth: 900 }} mx={"auto"}>
        <Tabs.List>
          <Tabs.Trigger value="all">All</Tabs.Trigger>
          {categories.map((item) => (
            <Tabs.Trigger
              onClick={() => setSelectCategoryId(item.id)}
              value={item.id}
              key={item.id}>
              {item.name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Box
          px="4"
          pt={"5"}
          pb="2"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: 14,
            flexWrap: "wrap",
            minHeight: 600,
            paddingBottom: 80,
            backgroundColor:
              "linear-gradient(90deg, rgba(255,89,0,1) 0%, rgba(255,141,0,1) 100%)",
            boxShadow: "0px 0px 40px 10px rgba(0, 0, 0, 0.5)",
          }}>
          {products.map((item) => (
            <Tabs.Content value="all" key={item.id}>
              <Link
                style={{ textDecoration: "none" }}
                href={`/${name}/${locationId}/${item.id}`}
                key={item.id}>
                <ProductCard
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  asset_url={item.asset_url}
                  price={item.price}
                  stock={item.stock}
                  rating={item.rating}
                />
              </Link>
            </Tabs.Content>
          ))}
          {selectedCategoryIdsByProducts.map((item) => (
            <Tabs.Content value={selectCategoryId as string} key={item.id}>
              <Link
                style={{ textDecoration: "none" }}
                href={`/${name}/${locationId}/${item.id}`}
                key={item.id}>
                <ProductCard
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  asset_url={item.asset_url}
                  price={item.price}
                  stock={item.stock}
                  rating={item.rating}
                />
              </Link>
            </Tabs.Content>
          ))}
        </Box>
      </Tabs.Root>
    </Box>
  );
}
