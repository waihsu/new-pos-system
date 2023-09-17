"use client";
import { config } from "@/config/config";
import { getLocations } from "@/lib/server";
import { Box, Pagination, Stack } from "@mui/material";
import { locations } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ShopCard() {
  const [page, setPage] = useState(1);
  const [locations, setLocations] = useState<locations[]>();

  const getShops = async () => {
    const resp = await fetch(`${config.nextauth_url}/api/locations/${page}`);
    const data = await resp.json();
    console.log(data);
    if (resp.ok) {
      setLocations(data);
    }
  };

  useEffect(() => {
    getShops();
  }, [page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        width: { md: 1100 },
        mx: "auto",
        boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
        py: 4,
      }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mx: "auto",
          py: 2,
        }}>
        {locations &&
          locations.map((location) => (
            <Link
              key={location.id}
              href={`/${location.name}/${location.id}`}
              style={{ textDecoration: "none", maxWidth: 300, maxHeight: 200 }}>
              <Card
                style={{
                  minWidth: 300,
                  backgroundColor: "crimson",
                  minHeight: 200,
                }}>
                <Flex direction={"column"} justify={"start"} gap="3">
                  <Image
                    src={location.asset_url as string}
                    alt="shop"
                    layout="responsive"
                    width={100}
                    height={100}
                  />
                  <Box>
                    <Text as="div" size="3" color="gray" weight="bold">
                      Shop-{location.name}
                    </Text>
                    <Text as="div" size="2" color="gray">
                      Address-{location.address}
                    </Text>
                    <Text as="div" size="2" color="gray">
                      Phone-{location.phone}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </Link>
          ))}
        {/* {locations?.length ? <span></span> : <h1>No More Shop</h1>} */}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Stack>
          <Pagination
            count={locations?.length ? page + 1 : page}
            onChange={handleChange}
          />
        </Stack>
      </Box>
    </Box>
  );
}
