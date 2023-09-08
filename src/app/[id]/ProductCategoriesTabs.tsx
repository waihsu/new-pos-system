"use client";
import {
  categories,
  locations_categories_products,
  products,
} from "@prisma/client";
import { Box, Button, Tabs, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import ProductCard from "../backoffice/products/ProductCard";
import Link from "next/link";

export default function ProductCategoriesTabs({
  products,
  categories,
  locations_categories_products,
}: {
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

  return (
    <Tabs.Root defaultValue="all">
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

      <Box px="4" pt="3" pb="2">
        {products.map((item) => (
          <Tabs.Content value="all" key={item.id}>
            <Link href="" key={item.id}>
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
            <Link href="" key={item.id}>
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
        {/* <Tabs.Content value="account">
          <Text size="2">Make changes to your account.</Text>
        </Tabs.Content>

        <Tabs.Content value="documents">
          <Text size="2">Access and update your documents.</Text>
        </Tabs.Content>

        <Tabs.Content value="settings">
          <Text size="2">Edit your profile or update contact information.</Text>
        </Tabs.Content> */}
      </Box>
    </Tabs.Root>
  );
}
