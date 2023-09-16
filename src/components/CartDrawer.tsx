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
import CheckOutStepper from "./CheckOutStepper";

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
      // console.log(carts);
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
  // console.log(carts);
  // console.log(locationId);

  const total = carts
    ?.map((item) => Number(item.quantity) * Number(item.price))
    .reduce((pre, curr) => pre + curr, 0) as number;

  const newCarts = carts?.map((item) => ({
    product_id: item.id,
    quantity: item.quantity as string,
  })) as NewCart[];
  // console.log(newCarts);

  const [order, setOrder] = useState({
    user_id: user_id,
    cart: newCarts,
    total: String(total),
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
      await delectcart();
      router.refresh();
    } else {
      setError("Please Retry");
      await delectcart();
      router.refresh();
    }
  };
  return (
    <Drawer
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        "& .MuiDrawer-paper": {
          minHeight: "100vh",
          width: "40%",
          position: "absolute",
          right: 0,
          opacity: 0.9,
          px: 2,
        },
      }}
      anchor="right"
      open={open}
      onClose={() => setOpen(!open)}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}>
        <CheckOutStepper
          carts={carts as Cart[]}
          deleteCartItem={deleteCartItem}
        />
      </Box>
      <Box position={"absolute"} bottom={0} width={"100%"}>
        <Button sx={{ mx: "auto" }} variant="contained" onClick={handleClick}>
          Check out : {carts ? total : 0}
        </Button>
      </Box>
    </Drawer>
  );
}
