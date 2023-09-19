"use client";
import {
  Cart,
  delectcart,
  deleteCartItem,
  getCart,
  getShopId,
} from "@/app/actions";
import { config } from "@/config/config";
import { Box, Button, Drawer, TextField } from "@mui/material";
import { customers, orders, users } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Typography from "@mui/material/Typography";
import { LoadingButton } from "@mui/lab";

const steps = ["Order Items", "Info", "Pay and Confirm"];

interface Props {
  qrcode: string;
  open: boolean;
  setOpen: (value: boolean) => void;
}

interface NewCart {
  product_id: string;
  quantity: string;
  addon_id: string[];
}

interface Order {
  user_id: string;
  cart: NewCart[];
  total: number;
  status: string;
  location_id: string;
}

export default function CartDrawer({ open, setOpen, qrcode }: Props) {
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
  const total = carts
    ?.map((item) => Number(item.quantity) * Number(item.price))
    .reduce((pre, curr) => pre + curr, 0) as number;

  const newCarts = carts?.map((item) => ({
    product_id: item.id,
    quantity: item.quantity as string,
    addon_id: item.selectedAddons.map((addon) => addon.id),
  })) as NewCart[];
  // console.log(newCarts);

  const [order, setOrder] = useState({
    user_id: user_id,
    cart: newCarts,
    total: String(total),
    status: "",
    location_id: locationId as string,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleClick = async () => {
    if (!user_id) return alert("You must be login");
    setLoading(true);
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
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
      }),
    });

    if (resp.ok) {
      setLoading(false);
      router.refresh();
    } else {
      setLoading(false);
      router.refresh();
    }
  };

  //for stepper
  const [activeStep, setActiveStep] = React.useState(0);

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    setActiveStep(activeStep === 3 ? 0 : activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
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
          pt: 6,
        },
      }}
      anchor="right"
      open={open}
      onClose={() => setOpen(!open)}>
      <Box sx={{ width: "100%" }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          <Box sx={{ py: 6 }}>
            {activeStep === 0 ? (
              carts &&
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
              ))
            ) : (
              <span></span>
            )}
            {activeStep === 1 ? (
              <Flex direction={"column"} gap={"3"}>
                <TextField
                  label="Name"
                  onChange={(evt) =>
                    setCustomer({ ...customer, name: evt.target.value })
                  }
                />
                <TextField
                  label="PhoneNumber"
                  onChange={(evt) =>
                    setCustomer({ ...customer, phone: evt.target.value })
                  }
                />
                <TextField
                  label="Address"
                  onChange={(evt) =>
                    setCustomer({ ...customer, address: evt.target.value })
                  }
                />
              </Flex>
            ) : (
              <span></span>
            )}
            {activeStep === 2 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Typography sx={{ fontSize: 30, fontWeight: 600 }}>
                  KBZ Pay
                </Typography>
                <Image src={qrcode} alt="qrcode" width={200} height={200} />
              </Box>
            ) : (
              <span></span>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {activeStep === 2 ? (
              <LoadingButton
                loading={loading}
                disabled={carts?.length ? false : true}
                sx={{ mx: "auto" }}
                variant="contained"
                onClick={handleClick}>
                Confirm : {carts ? total : 0} ks
              </LoadingButton>
            ) : (
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
            )}
          </Box>
        </div>
      </Box>
    </Drawer>
  );
}
