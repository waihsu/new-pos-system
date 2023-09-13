"use client";
import FileDropZone from "@/components/FileDropZone";
import { config } from "@/config/config";
import { uploadImage } from "@/lib/server";
import { Box, Button, Grid, TextField } from "@mui/material";
import { locations } from "@prisma/client";
import React, { useState } from "react";

export default function SettingForm({ location }: { location: locations }) {
  const [logoImg, setLogoImg] = useState<File>();
  const selectFile = (files: File[]) => {
    setLogoImg(files[0]);
  };
  const [updateShop, setUpdateShop] = useState({
    id: location.id,
    name: location.name,
    address: location.address,
    asset_url: location.asset_url,
    phone: location.phone,
    user_id: location.user_id,
  });

  const handleUpdate = async () => {
    if (logoImg?.length) {
      const image_url = await uploadImage(logoImg as File);
      updateShop.asset_url = image_url;
      const resp = await fetch(`${config.nextauth_url}/api/locations`, {
        method: "PUT",
        headers: {
          "content-type": "applications",
        },
        body: JSON.stringify(updateShop),
      });
    } else {
      const resp = await fetch(`${config.nextauth_url}/api/locations`, {
        method: "PUT",
        headers: {
          "content-type": "applications",
        },
        body: JSON.stringify(updateShop),
      });
    }
  };

  return (
    <Box>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Name"
            defaultValue={location.name}
            onChange={(evt) =>
              setUpdateShop({ ...updateShop, name: evt.target.value })
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Address"
            defaultValue={location.address}
            onChange={(evt) => {
              setUpdateShop({ ...updateShop, address: evt.target.value });
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Phone number"
            defaultValue={location.phone}
            onChange={(evt) => {
              setUpdateShop({ ...updateShop, phone: evt.target.value });
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <FileDropZone selectedFile={selectFile} />
        </Grid>
      </Grid>
      <Button onClick={handleUpdate} variant="contained">
        Update
      </Button>
    </Box>
  );
}
