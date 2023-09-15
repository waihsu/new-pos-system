"use client";
import {
  Badge,
  BadgeProps,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex, Heading, TextField } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import CartDrawer from "./CartDrawer";
import { styled } from "@mui/material/styles";
import { FaShoppingCart } from "react-icons/fa";
import { Cart, getCart } from "@/app/actions";

export default function Navbar({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const [carts, setCart] = useState<Cart[]>();
  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  const getCarts = async () => {
    const data = await getCart();
    if (data) {
      const carts = JSON.parse(data?.value as string);
      // console.log(carts);
      setCart(carts);
    }
  };
  useEffect(() => {
    getCarts();
  }, [carts?.length]);
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
        px: 3,
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

      <IconButton onClick={() => setOpen(!open)} aria-label="cart">
        <StyledBadge badgeContent={carts && carts.length} color="secondary">
          <FaShoppingCart />
        </StyledBadge>
      </IconButton>
      <CartDrawer open={open} setOpen={setOpen} />
    </Box>
  );
}
