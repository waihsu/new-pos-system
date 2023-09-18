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
  Typography,
} from "@mui/material";
import { products } from "@prisma/client";
import React, { useState } from "react";

export default function CreateAddonCategory({
  products,
}: {
  products: products[];
}) {
  const [newAddonCategory, setNewAddonCategory] = useState({
    name: "",
    is_required: false,
    product_id: [] as string[],
  });

  const { createAddonCategory, loading } = useAddonCategories();

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
        getOptionLabel={(products) => products.name}
        onChange={(evt, value) =>
          setNewAddonCategory({
            ...newAddonCategory,
            product_id: value.map((item) => item.id),
          })
        }
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Products"
            placeholder="Categories"
          />
        )}
      />
      <Box sx={{ alignSelf: "flex-start" }}>
        <FormControlLabel
          required
          control={
            <Switch
              onChange={(evt) =>
                setNewAddonCategory({
                  ...newAddonCategory,
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
        onChange={(evt) =>
          setNewAddonCategory({ ...newAddonCategory, name: evt.target.value })
        }
      />
      <LoadingButton
        loading={loading}
        onClick={() => createAddonCategory(newAddonCategory)}>
        Create
      </LoadingButton>
      {/* {error ? (
        <Typography sx={{ color: "red" }}>{error}</Typography>
      ) : (
        <span></span>
      )} */}
    </Box>
  );
}
