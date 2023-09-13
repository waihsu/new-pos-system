import BackOfficeLayout from "@/components/BackOfficeLayout";
import { Box } from "@mui/material";
import React from "react";
import NewCategory from "./NewCategory";
import { cookies } from "next/headers";
import ItemCard from "@/components/ItemCard";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { getCategoriesBySelectedLocation } from "@/lib/server";

export default async function page() {
  const location_id = cookies().get("selectedLocationId")?.value as string;
  const categories = await getCategoriesBySelectedLocation(location_id);
  console.log(categories);
  return (
    <Box>
      <NewCategory location_id={location_id} />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {categories.map((category) => (
          <Box key={category.id} sx={{ width: 200, height: 200 }}>
            <ItemCard icon={<BiSolidCategoryAlt />} name={category.name} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
