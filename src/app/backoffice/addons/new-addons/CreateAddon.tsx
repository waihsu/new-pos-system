"use client";
import { config } from "@/config/config";
import { useAddons } from "@/hooks/useAddon";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { addon_categories } from "@prisma/client";
import React, { useState } from "react";

export default function CreateAddon({
  addonCategories,
}: {
  addonCategories: addon_categories[];
}) {
  const [newAddon, setNewAddon] = useState({
    name: "",
    price: "",
    addon_category_id: "",
  });
  const { createAddon, loading } = useAddons();

  return (
    <Box
      sx={{
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        mx: "auto",
      }}>
      <FormControl fullWidth>
        <InputLabel>Addon Category</InputLabel>
        <Select
          value={newAddon.addon_category_id}
          label="Addon Category"
          onChange={(evt) =>
            setNewAddon({ ...newAddon, addon_category_id: evt.target.value })
          }>
          {addonCategories.map((item) => {
            return (
              <MenuItem value={item.id} key={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Name"
        variant="outlined"
        sx={{ mt: 1 }}
        onChange={(evt) =>
          setNewAddon({
            ...newAddon,
            name: evt.target.value,
          })
        }
      />
      <TextField
        fullWidth
        label="Price"
        variant="outlined"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        sx={{ my: 2 }}
        onChange={(evt) =>
          setNewAddon({
            ...newAddon,
            price: evt.target.value,
          })
        }
      />
      <LoadingButton loading={loading} onClick={() => createAddon(newAddon)}>
        Create
      </LoadingButton>
    </Box>
  );
}
