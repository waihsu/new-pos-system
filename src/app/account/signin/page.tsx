"use client";
import { Box, Button, Typography } from "@mui/material";
import { Card, Flex, Text } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function page() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Box>
        <Card>
          <Flex direction={"column"} gap={"4"} py={"9"} px={"6"}>
            <Typography
              sx={{ fontSize: 30, fontWeight: 700, textAlign: "center" }}>
              All In One Shop
            </Typography>
            <Button
              size="small"
              sx={{ display: "flex", gap: 1, px: 10 }}
              variant="outlined"
              onClick={() =>
                signIn("google", { callbackUrl: "/backoffice/locations" })
              }>
              <Typography sx={{ fontSize: 23, mt: 1 }}>
                <FcGoogle />
              </Typography>

              <Typography sx={{ fontSize: 16 }}>Login with google</Typography>
            </Button>
          </Flex>
        </Card>
      </Box>
    </div>
  );
}
