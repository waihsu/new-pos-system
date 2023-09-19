"use client";
import React, { useEffect, useState } from "react";
import { Card, Flex, Text } from "@radix-ui/themes";
import { addon_categories, addons, orders, products } from "@prisma/client";
import Image from "next/image";
import { Cart, addShopId, addToCart, getCart } from "@/app/actions";
import AddToCartButton from "@/components/AddToCartButton";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";

interface SelectedAddon {
  id: string;
}

export default function AddToCart({
  product,
  locationId,
  addonCategories,
  addons,
}: {
  product: products;
  locationId: string;
  addonCategories: addon_categories[];
  addons: addons[];
}) {
  const [selectedAddons, setSelectedAddons] = useState<addons[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleAddonSelect = (selected: boolean, addon: addons) => {
    const addonCategory = addonCategories.find(
      (item) => item.id === addon.addon_category_id
    ) as addon_categories;

    if (addonCategory.is_required) {
      const addonWtihSameAddonCategory = selectedAddons.find(
        (item) => item.addon_category_id === addon.addon_category_id
      );

      let newSelectedAddons: addons[] = [];
      if (addonWtihSameAddonCategory) {
        const filteredAddons = selectedAddons.filter(
          (item) => item.id !== addonWtihSameAddonCategory.id
        );

        newSelectedAddons = [...filteredAddons, addon];
      } else {
        newSelectedAddons = [...selectedAddons, addon];
      }
      setSelectedAddons(newSelectedAddons);
    } else {
      if (selected) {
        setSelectedAddons([...selectedAddons, addon]);
      } else {
        setSelectedAddons([
          ...selectedAddons.filter(
            (selectedAddon) => selectedAddon.id !== addon.id
          ),
        ]);
      }
    }
  };

  return (
    <Card style={{ maxWidth: 800 }} mx={"auto"}>
      <Flex gap="3" align="center">
        <Image src={product.asset_url} alt="product" width={400} height={300} />

        <Box>
          <Text as="div" size="2" weight="bold" mb={"2"}>
            {product.name}
          </Text>
          <Text as="div" size="3" color="gray" weight={"bold"} mb={"1"}>
            Description
          </Text>
          <Text as="div" size="2" color="gray" mb={"2"}>
            {product.description}
          </Text>
          <Text as="div" size="2" color="gray" mb={"2"} weight={"bold"}>
            Price - <span>{product.price} - Ks</span>
          </Text>
          <Box>
            {addonCategories.map((item) => (
              <Card key={item.id}>
                <Box sx={{ display: "flex", gap: 6 }}>
                  <Typography>{item.name}</Typography>
                  <Typography>
                    {item.is_required ? "Required" : "Options"}
                  </Typography>
                </Box>
                {addons
                  .filter((addon) => addon.addon_category_id === item.id)
                  .map((addon) => (
                    <Box
                      key={addon.id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                      <FormControlLabel
                        value={addon.name}
                        control={
                          item.is_required ? (
                            <Radio
                              checked={
                                selectedAddons.find(
                                  (requireAddon) => requireAddon.id === addon.id
                                )
                                  ? true
                                  : false
                              }
                              onChange={(evt, checked) =>
                                handleAddonSelect(checked, addon)
                              }
                            />
                          ) : (
                            <Checkbox
                              checked={
                                selectedAddons.find(
                                  (requireAddon) => requireAddon.id === addon.id
                                )
                                  ? true
                                  : false
                              }
                              onChange={(value, checked) =>
                                handleAddonSelect(checked, addon)
                              }
                            />
                          )
                        }
                        label={addon.name}
                      />
                      <Typography sx={{ fontStyle: "italic" }}>
                        {addon.price}
                      </Typography>
                    </Box>
                  ))}
              </Card>
            ))}
          </Box>
          <AddToCartButton
            selectedAddons={selectedAddons}
            locationId={locationId}
            product={product}
          />
        </Box>
      </Flex>
    </Card>
  );
}
