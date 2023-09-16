"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { orders, products } from "@prisma/client";
import Image from "next/image";
import { Cart, addShopId, addToCart, getCart } from "@/app/actions";
import AddToCartButton from "@/components/AddToCartButton";

export default function AddToCart({
  product,
  locationId,
}: {
  product: products;
  locationId: string;
}) {
  // const [quantity, setQuantity] = useState<number>(1);
  // const [added, setAdded] = useState(false);

  // useEffect(() => {
  //   const getCartProductId = async () => {
  //     const cart = await getCart();
  //     if (cart) {
  //       const data = JSON.parse(cart?.value) as Cart[];
  //       if (data.filter((item) => item.id === product.id)[0]) {
  //         const existProduct = data.filter((item) => item.id === product.id)[0];
  //         // console.log("existProduct", existProduct);
  //         const existQuantity = existProduct?.quantity;
  //         const existProductId = data.filter((item) => item.id === product.id);
  //         if (existProductId) {
  //           // console.log(existQuantity);
  //           setQuantity(Number(existQuantity));
  //           setAdded(true);
  //         }
  //       }
  //       // // setAdded(addProductId);
  //       // if (addProductId.includes(product.id)) {
  //       //   console.log("add");
  //       //   setAdded(true);
  //       // }
  //     }
  //   };
  //   getCartProductId();
  // }, []);

  // const handleQuantityDecrease = () => {
  //   const newValue = quantity - 1 === 0 ? 1 : quantity - 1;
  //   setQuantity(newValue);
  //   handleAddToCart(String(newValue));
  // };

  // const handleQuantityIncrease = () => {
  //   console.log(quantity);
  //   const newValue = quantity + 1;
  //   console.log(newValue);
  //   setQuantity(newValue);
  //   handleAddToCart(String(newValue));
  // };

  // const handleAddToCart = async (quantity: string) => {
  //   await addShopId(locationId);
  //   await addToCart({
  //     id: product.id,
  //     name: product.name,
  //     asset_url: product.asset_url,
  //     descritption: product.description,
  //     price: product.price,
  //     quantity: String(quantity),
  //   });
  //   setAdded(true);
  // };
  // console.log(product.id, added);
  return (
    <Card style={{ maxWidth: 800 }} mx={"auto"}>
      <Flex gap="3" align="center">
        <Image src={product.asset_url} alt="product" width={400} height={300} />

        <Box>
          <Text as="div" size="2" weight="bold" mb={"2"}>
            {product.name}
          </Text>
          <Text as="div" size="3" color="gray" weight={"bold"} mb={"1"}>
            Description
          </Text>
          <Text as="div" size="2" color="gray" mb={"2"}>
            {product.description}
          </Text>
          <Text as="div" size="2" color="gray" mb={"2"} weight={"bold"}>
            Price - <span>{product.price} - Ks</span>
          </Text>
          <Text as="div" size="2" color="gray"></Text>
          <AddToCartButton locationId={locationId} product={product} />
        </Box>
      </Flex>
    </Card>
  );
}
