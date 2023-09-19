"use client";
import { config } from "@/config/config";
import { useAddonCategories } from "@/hooks/useAddonCategories";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { addon_categories, products } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function EditAddonCategory({
  products,
  connectedProducts,
  addonCategory,
}: {
  products: products[];
  connectedProducts: products[];
  addonCategory: addon_categories;
}) {
  const router = useRouter();

  const [error, setError] = useState<string>();
  const [updateAddonCategory, setUpdateAddonCategory] =
    useState<addon_categories>({
      id: addonCategory.id,
      name: addonCategory.name,
      is_required: addonCategory.is_required,
      product_id: addonCategory.product_id,
    });

  const { handleUpdate, handleDelete, loading } = useAddonCategories();

  return (
    <Box
      sx={{
        maxWidth: 600,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mx: "auto",
      }}>
      <Autocomplete
        fullWidth
        multiple
        id="tags-outlined"
        options={products}
        defaultValue={connectedProducts}
        isOptionEqualToValue={(categories, value) => categories.id === value.id}
        getOptionLabel={(products) => products.name}
        onChange={(evt, value) =>
          setUpdateAddonCategory({
            ...updateAddonCategory,
            product_id: value.map((item) => item.id),
          })
        }
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Categories"
            placeholder="Categories"
          />
        )}
      />
      <Box sx={{ alignSelf: "flex-start" }}>
        <FormControlLabel
          required
          control={
            <Switch
              defaultChecked={addonCategory.is_required}
              onChange={(evt) =>
                setUpdateAddonCategory({
                  ...updateAddonCategory,
                  is_required: evt.target.checked,
                })
              }
            />
          }
          label="Required"
        />
      </Box>
      <TextField
        fullWidth
        label="Name"
        defaultValue={addonCategory.name}
        onChange={(evt) =>
          setUpdateAddonCategory({
            ...updateAddonCategory,
            name: evt.target.value,
          })
        }
      />
      <LoadingButton
        loading={loading}
        color="primary"
        onClick={() => handleUpdate(updateAddonCategory)}>
        Update
      </LoadingButton>
      <LoadingButton
        color="error"
        onClick={() => handleDelete(addonCategory.id)}>
        Delete
      </LoadingButton>
    </Box>
  );
}
