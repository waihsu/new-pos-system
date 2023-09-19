"use client";
import { useAddons } from "@/hooks/useAddon";
import { LoadingButton } from "@mui/lab";
import React from "react";

export default function DeleteAddon({ id }: { id: string }) {
  const { deleteAddon, loading } = useAddons();
  return (
    <LoadingButton loading={loading} onClick={() => deleteAddon(id)}>
      Delete
    </LoadingButton>
  );
}
