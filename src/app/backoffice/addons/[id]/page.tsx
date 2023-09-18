import ItemCard from "@/components/ItemCard";
import { prisma } from "@/lib";
import { Box } from "@mui/material";
import React from "react";
import { MdClass } from "react-icons/md";
import DeleteAddon from "./DeleteAddon";

export default async function EditAddon({ params }: { params: any }) {
  const { id } = params;
  const addon = await prisma.addons.findFirst({
    where: { id: id },
  });
  console.log(addon);
  return (
    <Box>
      <ItemCard name={addon?.name as string} icon={<MdClass />} />
      <DeleteAddon id={id} />
    </Box>
  );
}
