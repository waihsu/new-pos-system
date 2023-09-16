"use client";
import {
  Avatar,
  Badge,
  BadgeProps,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex, Heading, TextField } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import CartDrawer from "./CartDrawer";
import { styled } from "@mui/material/styles";
import { FaShoppingCart } from "react-icons/fa";
import { Cart, getCart } from "@/app/actions";
import { useSession } from "next-auth/react";
import { users } from "@prisma/client";
import Link from "next/link";

export default function Navbar({ name }: { name: string }) {
  const { data: session } = useSession();
  const user = session?.user as users;
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
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

      <Box sx={{ display: "flex", gap: 2 }}>
        <div style={{ backgroundColor: "red", position: "relative" }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => setProfileOpen(!profileOpen)}
            color="inherit">
            <Avatar src={user?.asset_url} alt="profile" />
          </IconButton>
          <Menu
            sx={{ mt: 10 }}
            id="menu-appbar"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={profileOpen}
            onClose={() => setProfileOpen(!profileOpen)}>
            <MenuItem onClick={() => setProfileOpen(!profileOpen)}>
              <Link href="/profile">Profile</Link>
            </MenuItem>
            <MenuItem onClick={() => setProfileOpen(!profileOpen)}>
              Log Out
            </MenuItem>
          </Menu>
        </div>

        <IconButton onClick={() => setOpen(!open)} aria-label="cart">
          <StyledBadge badgeContent={carts && carts.length} color="secondary">
            <FaShoppingCart />
          </StyledBadge>
        </IconButton>
      </Box>
      <CartDrawer open={open} setOpen={setOpen} />
    </Box>
  );
}
