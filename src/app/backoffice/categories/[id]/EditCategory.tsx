"use client";
import ItemCard from "@/components/ItemCard";
import { Box, Button } from "@mui/material";
import { categories } from "@prisma/client";
import React, { useState } from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import DeleteDialog from "@/components/DeleteDialog";
import { config } from "@/config/config";
import { Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function EditCategory({ category }: { category: categories }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const deleteCategory = async () => {
    const resp = await fetch(`${config.nextauth_url}/api/categories`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(category.id),
    });
    if (resp.ok) {
      router.refresh();
      router.push("/backoffice/categories");
    }
  };
  return (
    <Box>
      <Flex justify={"center"}>
        <Box width={500}>
          <ItemCard icon={<BiSolidCategoryAlt />} name={category.name} />
        </Box>
        <Button onClick={() => setOpen(true)} color="error">
          <AiFillDelete />
        </Button>
      </Flex>
      <DeleteDialog open={open} setOpen={setOpen} callback={deleteCategory} />
    </Box>
  );
}
