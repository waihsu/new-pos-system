"use client";
import DeleteDialog from "@/components/DeleteDialog";
import { config } from "@/config/config";
import { Box, Dialog, DialogActions, Typography } from "@mui/material";
import { Button, DialogTitle, Flex } from "@radix-ui/themes";
import React, { useState } from "react";

export default function DeleteShop({ location_id }: { location_id: string }) {
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    const resp = await fetch(`${config.nextauth_url}/api/locations`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(location_id),
    });
  };
  return (
    <Box>
      <Button onClick={() => setOpen(true)}>Delete</Button>
      <DeleteDialog callback={handleDelete} open={open} setOpen={setOpen} />
    </Box>
  );
}
