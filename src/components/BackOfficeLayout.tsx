"use client";
import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { BiLogoProductHunt } from "react-icons/bi";

interface Props {
  children: React.ReactNode;
  title: string;
  link?: string;
  button?: string;
  open?: boolean;
  setOpen?: (value: boolean) => void;
}

export default function BackOfficeLayout({
  children,
  title,
  link,
  button,
  open,
  setOpen,
}: Props) {
  return (
    <Box>
      <Flex justify={"between"} py={"4"}>
        <Heading>
          <BiLogoProductHunt />
          {title}
        </Heading>
        {link ? (
          <Link href={link as string}>
            <Button>{button}</Button>
          </Link>
        ) : (
          <Button onClick={() => setOpen && setOpen(true)}>{button}</Button>
        )}
      </Flex>
      {children}
    </Box>
  );
}
