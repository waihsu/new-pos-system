import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { customers } from "@prisma/client";
import { Card, Flex } from "@radix-ui/themes";
import React from "react";

export default function EditCustomerForm({
  customers,
}: {
  customers: customers;
}) {
  return (
    <Card style={{ minWidth: 500 }}>
      <Typography>Info</Typography>

      <Flex direction={"column"} gap={"3"}>
        <TextField label="Name" defaultValue={customers.name} />
        <TextField label="PhoneNumber" defaultValue={customers.phone} />
        <TextField label="Address" defaultValue={customers.address} />
      </Flex>
      <Divider />
      <Button variant="contained">Save Info</Button>
    </Card>
  );
}
