"use client";
import DeleteDialog from "@/components/DeleteDialog";
import { config } from "@/config/config";
import { useLocation } from "@/hooks/useLocations";
import { Box, Dialog, DialogActions, Typography } from "@mui/material";
import { Button, DialogTitle, Flex } from "@radix-ui/themes";
import React, { useState } from "react";

export default function DeleteShop({ location_id }: { location_id: string }) {
  const [open, setOpen] = useState(false);
  const { deleteLocation, loading } = useLocation();
  return (
    <Box>
      <Button onClick={() => setOpen(true)}>Delete</Button>
      <DeleteDialog
        callback={() => deleteLocation(location_id)}
        open={open}
        setOpen={setOpen}
      />
    </Box>
  );
}
