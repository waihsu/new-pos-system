"use client";
import {
  Cart,
  delectcart,
  deleteCartItem,
  getCart,
  getShopId,
} from "@/app/actions";
import { config } from "@/config/config";
import { Box, Button, Drawer } from "@mui/material";
import { orders, users } from "@prisma/client";
import { Avatar, Card, Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

interface NewCart {
  product_id: string;
  quantity: string;
}

interface Order {
  user_id: string;
  cart: NewCart[];
  total: number;
  status: string;
  location_id: string;
}

export default function CartDrawer({ open, setOpen }: Props) {
  const { data: session } = useSession();
  const user = session?.user as users;
  const user_id = user?.id as string;
  const router = useRouter();
  const [carts, setCart] = useState<Cart[]>();
  const [locationId, setLocationId] = useState<string>();
  const getCarts = async () => {
    const data = await getCart();
    if (data) {
      const carts = JSON.parse(data?.value as string);
      console.log(carts);
      setCart(carts);
    }
  };

  async function getLocationId() {
    const data = await getShopId();
    if (data) {
      setLocationId(data.value as string);
    }
  }

  useEffect(() => {
    getCarts();
    getLocationId();
  }, [open]);
  console.log(carts);
  console.log(locationId);

  const total = carts
    ?.map((item) => Number(item.quantity) * Number(item.price))
    .reduce((pre, curr) => pre + curr, 0) as number;

  const newCarts = carts?.map((item) => ({
    product_id: item.id,
    quantity: item.quantity as string,
  })) as NewCart[];
  console.log(newCarts);

  const [order, setOrder] = useState({
    user_id: user_id,
    cart: newCarts,
    total: total,
    status: "",
    location_id: locationId as string,
  });

  const [error, setError] = useState<string>();
  const [message, setMessage] = useState<string>();

  const handleClick = async () => {
    if (!user_id) return alert("You must be login");
    const resp = await fetch(`${config.nextauth_url}/api/orders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        cart: newCarts,
        total: total,
        status: "Pedding",
        location_id: locationId,
      }),
    });

    if (resp.ok) {
      setMessage("Success");
      delectcart();
    } else {
      setError("Please Retry");
      delectcart();
    }
  };
  return (
    <Drawer
      // ModalProps={{
      //   keepMounted: true, // Better open performance on mobile.
      // }}
      sx={{
        "& .MuiDrawer-paper": {
          width: "35vw",
          minHeight: "100vh",

          position: "absolute",
          right: 0,
          opacity: 0.9,
          px: 2,
        },
      }}
      anchor="right"
      open={open}
      onClose={() => setOpen(!open)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {carts &&
          carts.map((cart) => (
            <Card key={cart.id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}>
                <Image
                  src={cart.asset_url}
                  alt="product"
                  width={100}
                  height={100}
                />
                <Box>
                  <Text as="div" size="2" weight="bold">
                    {cart.name}
                  </Text>
                  <Text as="div" size="2" color="gray">
                    {cart.price}
                  </Text>
                  <Text as="div" size="2" color="gray">
                    {cart.quantity}
                  </Text>
                  <Text as="div" size="2" color="gray">
                    Total: {Number(cart.quantity) * Number(cart.price)}
                  </Text>
                </Box>
                <Button
                  onClick={() => {
                    deleteCartItem(cart.id);
                    router.refresh();
                  }}>
                  <AiFillDelete />
                </Button>
              </Box>
            </Card>
          ))}
      </Box>
      <Box position={"absolute"} bottom={0} width={"100%"}>
        <Button sx={{ mx: "auto" }} variant="contained" onClick={handleClick}>
          Check out : {carts ? total : 0}
        </Button>
      </Box>
    </Drawer>
  );
}
