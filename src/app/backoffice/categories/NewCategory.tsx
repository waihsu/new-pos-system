"use client";
import BackOfficeLayout from "@/components/BackOfficeLayout";
import { config } from "@/config/config";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function NewCategory({ location_id }: { location_id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    location_id: location_id,
  });

  const handleClick = async () => {
    setLoading(true);
    const resp = await fetch(`${config.nextauth_url}/api/categories`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCategory),
    });
    if (resp.ok) {
      setLoading(false);
      setOpen(false);
      router.refresh();
    }
  };
  return (
    <BackOfficeLayout
      title="Categories"
      link=""
      button="Add Category"
      open={open}
      setOpen={setOpen}>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>New Category</DialogTitle>
        <DialogContent>
          <TextField
            label="New Category"
            onChange={(evt) =>
              setNewCategory({ ...newCategory, name: evt.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton loading={loading} onClick={handleClick}>
            Create
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </BackOfficeLayout>
  );
}
