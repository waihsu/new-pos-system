"use client";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { users } from "@prisma/client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

export default function ProfileAvatar() {
  const { data: session } = useSession();
  const user = session?.user as users;
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <div>
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
        {user ? (
          <MenuItem
            onClick={() => {
              signOut();
              setProfileOpen(!profileOpen);
            }}>
            Log Out
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              signIn();
              setProfileOpen(!profileOpen);
            }}>
            Sign In
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
