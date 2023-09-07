"use client";
import FileDropZone from "@/components/FileDropZone";
import { config } from "@/config/config";
import { prisma } from "@/lib";
import { uploadImage } from "@/lib/server";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, TextField } from "@mui/material";
import { categories } from "@prisma/client";
import { Box, Button, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function NewProductFrom({
  categories,
  locations_id,
}: {
  categories: categories[];
  locations_id: string;
}) {
  const router = useRouter();
  const [newProduct, setNewProduct] = useState({
    name: "",
    asset_url: "",
    description: "",
    price: "",
    rating: "",
    stock: "",
    categories_id: [] as string[],
    locations_id: locations_id,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [productImage, setProductImage] = useState<File>();
  const selectedFile = (files: File[]) => {
    setProductImage(files[0]);
  };
  // console.log(productImage);

  const handleClick = async () => {
    setIsLoading(true);
    const image_url = await uploadImage(productImage as File);

    newProduct.asset_url = image_url;
    const resp = await fetch(`${config.nextauth_url}/api/products`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ newProduct }),
    });
    if (resp.ok) {
      setIsLoading(false);
      router.refresh();
      router.push("/backoffice/products");
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={categories}
        getOptionLabel={(categories) => categories.name}
        onChange={(evt, value) =>
          setNewProduct({
            ...newProduct,
            categories_id: value.map((item) => item.id),
          })
        }
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Categories"
            placeholder="Categories"
          />
        )}
      />
      <FileDropZone selectedFile={selectedFile} />
      <Flex direction={"column"} gap={"3"}>
        <TextField
          onChange={(evt) =>
            setNewProduct({ ...newProduct, name: evt.target.value })
          }
          size="small"
          placeholder="Name"
        />
        <TextField
          onChange={(evt) =>
            setNewProduct({ ...newProduct, description: evt.target.value })
          }
          size="small"
          placeholder="Description"
        />
        <TextField
          onChange={(evt) =>
            setNewProduct({ ...newProduct, price: evt.target.value })
          }
          size="small"
          placeholder="Price"
        />
        <TextField
          onChange={(evt) =>
            setNewProduct({ ...newProduct, rating: evt.target.value })
          }
          size="small"
          placeholder="rating"
        />
        <TextField
          onChange={(evt) =>
            setNewProduct({ ...newProduct, stock: evt.target.value })
          }
          size="small"
          placeholder="stock"
        />
        <LoadingButton loading={isLoading} onClick={handleClick}>
          Create
        </LoadingButton>
      </Flex>
    </Box>
  );
}
