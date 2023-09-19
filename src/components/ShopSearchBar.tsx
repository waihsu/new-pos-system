"use client";
import { Autocomplete, TextField } from "@mui/material";
import { locations } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

export default function ShopSearchBar({
  locations,
}: {
  locations: locations[];
}) {
  const router = useRouter();
  return (
    <Autocomplete
      sx={{ width: 300 }}
      id="free-solo-2-demo"
      disableClearable
      options={locations}
      getOptionLabel={(locations) => locations.name}
      onChange={(event, value) => {
        router.push(`/${value.name}/${value.id}`);
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
