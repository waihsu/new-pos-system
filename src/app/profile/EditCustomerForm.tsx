import { Box, TextField, Typography } from "@mui/material";
import { customers } from "@prisma/client";
import React from "react";

export default function EditCustomerForm({
  customers,
}: {
  customers: customers;
}) {
  return (
    <Box>
      <Typography>Info</Typography>
      <Box>
        <TextField defaultValue={customers.name} />
        <TextField defaultValue={customers.phone} />
        <TextField defaultValue={customers.address} />
      </Box>
    </Box>
  );
}
