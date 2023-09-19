"use client";
import { Autocomplete, TextField } from "@mui/material";
import { locations } from "@prisma/client";
import React from "react";

export default function ShopSearchBar({
  locations,
}: {
  locations: locations[];
}) {
  return (
    <Autocomplete
      sx={{ width: 300 }}
      id="free-solo-2-demo"
      disableClearable
      options={locations}
      getOptionLabel={(locations) => locations.name}
      onChange={(event, value) => {
        if (value) {
          window.location.href = `/${value.name}/${value.id}`;
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Shop"
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
}
