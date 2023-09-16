"use client";
import DeleteDialog from "@/components/DeleteDialog";
import { config } from "@/config/config";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

export default function DeleteButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    const resp = await fetch(`${config.nextauth_url}/api/orders`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(id),
    });
    if (resp.ok) {
      router.refresh();
    }
  };
  return (
    <Box>
      <Button
        sx={{ color: "red", fontSize: 30 }}
        onClick={() => setOpen(!open)}>
        <AiFillDelete />
      </Button>
      <DeleteDialog setOpen={setOpen} open={open} callback={handleDelete} />
    </Box>
  );
}
