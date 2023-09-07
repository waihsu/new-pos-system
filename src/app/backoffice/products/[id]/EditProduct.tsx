"use client";
import FileDropZone from "@/components/FileDropZone";
import { config } from "@/config/config";
import { prisma } from "@/lib";
import { uploadImage } from "@/lib/server";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Box, TextField } from "@mui/material";
import { categories, products } from "@prisma/client";
import { Button, Flex } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export default function EditProduct({
  id,
  product,
  productBycategories,
  categories,
  locations_id,
}: {
  id: string;
  product: products;
  productBycategories: categories[];
  categories: categories[];
  locations_id: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [updateProduct, setUpdateProduct] = useState({
    id: product.id,
    name: product.name,
    asset_url: "",
    description: product.description,
    price: product.price,
    rating: product.rating,
    stock: product.rating,
    categories_id: [] as string[],
  });
  const [productImage, setProductImage] = useState<File>();
  const selectedFile = (files: File[]) => {
    setProductImage(files[0]);
  };
  // console.log(productImage);

  const handleClick = async () => {
    setIsLoading(true);
    const asset_url = await uploadImage(productImage as File);

    // if (asset_url.length) {
    //   setUpdateProduct({ ...updateProduct, asset_url });
    // }
    const resp = await fetch(`${config.nextauth_url}/api/products`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: updateProduct.id,
        name: updateProduct.name,
        asset_url: asset_url,
        description: updateProduct.description,
        price: updateProduct.price,
        rating: updateProduct.rating,
        stock: updateProduct.stock,
        categories_id: updateProduct.categories_id,
        locations_id: locations_id,
      }),
    });
    setIsLoading(false);
    router.refresh();
    router.push("/backoffice/products");
  };

  return (
    <Box>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={categories}
        defaultValue={productBycategories}
        isOptionEqualToValue={(categories, value) => categories.id === value.id}
        getOptionLabel={(categories) => categories.name}
        onChange={(evt, value) =>
          setUpdateProduct({
            ...updateProduct,
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
      {/* {product.asset_url ? (
        <Box sx={{ position: "relative", width: "fit-content" }}>
          <Box
            onClick={() => {
              product.asset_url;
            }}
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              zIndex: 10,
              color: "red",
            }}>
            <AiFillCloseCircle />
          </Box>
          <Image
            src={product.asset_url}
            alt="product"
            width={100}
            height={100}
          />
        </Box>
      ) : null} */}
      <Flex direction={"column"} gap={"3"}>
        <TextField
          defaultValue={product.name}
          onChange={(evt) =>
            setUpdateProduct({ ...updateProduct, name: evt.target.value })
          }
          size="small"
          placeholder="Name"
        />
        <TextField
          defaultValue={product.description}
          onChange={(evt) =>
            setUpdateProduct({
              ...updateProduct,
              description: evt.target.value,
            })
          }
          size="small"
          placeholder="Description"
        />
        <TextField
          defaultValue={product.price}
          onChange={(evt) =>
            setUpdateProduct({ ...updateProduct, price: evt.target.value })
          }
          size="small"
          placeholder="Price"
        />
        <TextField
          defaultValue={product.rating}
          onChange={(evt) =>
            setUpdateProduct({ ...updateProduct, rating: evt.target.value })
          }
          size="small"
          placeholder="rating"
        />
        <TextField
          defaultValue={product.stock}
          onChange={(evt) =>
            setUpdateProduct({ ...updateProduct, stock: evt.target.value })
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
