"use client";
import { TextField } from "@radix-ui/themes";
import React from "react";

export default function ProductSearch() {
  return (
    <div>
      <TextField.Input size="2" placeholder="Search the docs…" />
    </div>
  );
}
