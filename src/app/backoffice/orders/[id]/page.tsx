import BackOfficeLayout from "@/components/BackOfficeLayout";
import { prisma } from "@/lib";
import { Box, Typography } from "@mui/material";
import { Card, Flex } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";

export default async function Order({ params }: { params: any }) {
  const { id } = params;
  const order = await prisma.orders.findFirst({
    where: { id: id },
  });

  const productIds = order?.cart.map((item) => item.product_id);
  const products = await prisma.products.findMany({
    where: { id: { in: productIds } },
  });
  const customers = await prisma.customers.findFirst({
    where: { user_id: order?.user_id },
  });
  // console.log(customers);

  const validProduct = (id: string) => {
    const product = products.filter((item) => item.id === id)[0];
    return (
      <Card style={{ maxWidth: 250 }}>
        <Flex align={"center"}>
          <Image
            src={product.asset_url}
            alt="product"
            width={100}
            height={100}
          />
          <Box>
            <Typography>Brand: {product.name}</Typography>
            <Typography>Price: {product.price} ks</Typography>
          </Box>
        </Flex>
      </Card>
    );
  };

  return (
    <BackOfficeLayout title="Confirm" link="/backoffice/orders" button="Back">
      <Box>
        <Box>
          <Typography>Products</Typography>
          <Box>
            {order?.cart.map((item) => (
              <Box key={item.product_id}>
                {validProduct(item.product_id)}
                <Typography> Quantity : {item.quantity}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Typography variant="h4" py={2}>
          Total Price: {order?.total}
        </Typography>
        <Box>
          <Typography>Customer Address</Typography>
          <Card>
            <Typography>Name: {customers?.name}</Typography>
            <Typography>Phone: {customers?.phone}</Typography>
            <Typography>Address: {customers?.address}</Typography>
          </Card>
        </Box>
      </Box>
    </BackOfficeLayout>
  );
}
