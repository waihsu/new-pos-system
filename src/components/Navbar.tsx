"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Flex, Heading, TextField } from "@radix-ui/themes";
import React from "react";

export default function Navbar() {
  return (
    <Flex
      justify={"between"}
      width={"100%"}
      py={"4"}
      style={{ backgroundColor: "red", minWidth: "100vw" }}>
      <Heading>Pos</Heading>
      <Box>
        <TextField.Root>
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Input placeholder="Search the docs…" />
        </TextField.Root>
      </Box>
      <span></span>
    </Flex>
  );
}
