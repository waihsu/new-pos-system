"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { orders, products } from "@prisma/client";
import Image from "next/image";
import { Cart, addToCart, getCart } from "@/app/actions";

export default function AddToCart({ product }: { product: products }) {
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const getCartProductId = async () => {
      const cart = await getCart();
      if (cart) {
        const data = JSON.parse(cart?.value) as Cart[];
        if (data.filter((item) => item.id === product.id)[0]) {
          const existProduct = data.filter((item) => item.id === product.id)[0];
          console.log("existProduct", existProduct);
          const existQuantity = existProduct?.quantity;
          const existProductId = data.filter((item) => item.id === product.id);
          if (existProductId) {
            console.log(existQuantity);
            setQuantity(Number(existQuantity));
            setAdded(true);
          }
        }
        // // setAdded(addProductId);
        // if (addProductId.includes(product.id)) {
        //   console.log("add");
        //   setAdded(true);
        // }
      }
    };
    getCartProductId();
  }, []);

  const handleQuantityDecrease = () => {
    const newValue = quantity - 1 === 0 ? 1 : quantity - 1;
    setQuantity(newValue);
  };

  const handleQuantityIncrease = () => {
    const newValue = quantity + 1;
    setQuantity(newValue);
    handleAddToCart();
  };

  const handleAddToCart = async () => {
    console.log(quantity);
    await addToCart({
      id: product.id,
      name: product.name,
      asset_url: product.asset_url,
      descritption: product.description,
      price: product.price,
      quantity: String(quantity),
    });
    setAdded(true);
  };
  console.log(product.id, added);
  return (
    <Card style={{ maxWidth: 800 }} mx={"auto"}>
      <Flex gap="3" align="center">
        <Image src={product.asset_url} alt="product" width={400} height={300} />
        <Box>
          <Text as="div" size="2" weight="bold">
            {product.name}
          </Text>
          <Text as="div" size="2" color="gray">
            {product.price}
          </Text>
          <Flex>
            {added ? (
              <span></span>
            ) : (
              <Button
                onClick={() => {
                  setQuantity(quantity + 1);
                  handleAddToCart();
                }}>
                Add To Cart
              </Button>
            )}
            <Flex>
              <Button
                onClick={() => {
                  setQuantity(quantity - 1 === 0 ? 1 : quantity - 1);
                  handleAddToCart();
                }}>
                -
              </Button>
              {quantity}
              <Button onClick={handleQuantityIncrease}>+</Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
}
