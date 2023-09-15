"use client";
import { Box, Button, Typography } from "@mui/material";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex, Heading, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import CartDrawer from "./CartDrawer";

export default function Navbar({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Box
      sx={{
        minWidth: "100vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background:
          "linear-gradient(90deg, rgba(250,126,60,1) 0%, rgba(255,147,14,1) 100%)",
        boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
        position: "fixed",
        zIndex: 10,
        top: 0,
        left: 0,
        py: 2,
      }}
      style={{
        boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
        minWidth: "100vw",
        position: "fixed",
      }}>
      <Typography sx={{ color: "yellowgreen" }} variant="h4">
        {name}
      </Typography>
      <Box>
        <TextField.Root>
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Input placeholder="Search the docs…" />
        </TextField.Root>
      </Box>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Cart
      </Button>
      <CartDrawer open={open} setOpen={setOpen} />
    </Box>
  );
}
