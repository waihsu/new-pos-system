import { Cart, addShopId, addToCart, getCart } from "@/app/actions";
import { products } from "@prisma/client";
import { Button, Flex } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

export default function AddToCartButton({
  product,
  locationId,
}: {
  product: products;
  locationId: string;
}) {
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const getCartProductId = async () => {
      const cart = await getCart();
      if (cart) {
        const data = JSON.parse(cart?.value) as Cart[];
        if (data.filter((item) => item.id === product.id)[0]) {
          const existProduct = data.filter((item) => item.id === product.id)[0];
          // console.log("existProduct", existProduct);
          const existQuantity = existProduct?.quantity;
          const existProductId = data.filter((item) => item.id === product.id);
          if (existProductId) {
            // console.log(existQuantity);
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
    handleAddToCart(String(newValue));
  };

  const handleQuantityIncrease = () => {
    console.log(quantity);
    const newValue = quantity + 1;
    console.log(newValue);
    setQuantity(newValue);
    handleAddToCart(String(newValue));
  };

  const handleAddToCart = async (quantity: string) => {
    await addShopId(locationId);
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
  return (
    <Flex>
      {added ? (
        <Flex>
          <Button onClick={handleQuantityDecrease}>-</Button>
          {quantity}
          <Button onClick={handleQuantityIncrease}>+</Button>
        </Flex>
      ) : (
        <Button
          onClick={() => {
            handleAddToCart("1");
          }}>
          Add To Cart
        </Button>
      )}
    </Flex>
  );
}
