"use client";
import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import React from "react";

export default function page() {
  return (
    <div
      style={{
        background: "red",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Button
        onClick={() =>
          signIn("google", { callbackUrl: "/backoffice/locations" })
        }>
        Login
      </Button>
    </div>
  );
}
