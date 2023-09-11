import { Cart, deleteCartItem, getCart } from "@/app/actions";
import { Box, Drawer } from "@mui/material";
import { Avatar, Button, Card, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function CartDrawer({ open, setOpen }: Props) {
  const router = useRouter();
  const [carts, setCart] = useState<Cart[]>();
  const getCarts = async () => {
    const data = await getCart();
    if (data) {
      const carts = JSON.parse(data?.value as string);
      console.log(carts);
      setCart(carts);
    }
  };
  useEffect(() => {
    getCarts();
  }, []);
  console.log(carts);

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
    </Drawer>
  );
}
