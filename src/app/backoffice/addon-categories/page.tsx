import { getLocationId } from "@/app/actions";
import BackOfficeLayout from "@/components/BackOfficeLayout";
import ItemCard from "@/components/ItemCard";
import { prisma } from "@/lib";
import { getAddonCategories } from "@/lib/server";
import { Box } from "@mui/material";
import Link from "next/link";
import React from "react";
import { MdClass } from "react-icons/md";

export default async function AddonCategories() {
  const location_id = await getLocationId();
  const addonCategories = await getAddonCategories(location_id);

  console.log(addonCategories);
  return (
    <BackOfficeLayout
      title="Addon Categories"
      link="/backoffice/addon-categories/new-addon-category"
      button="new addoncategory">
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {addonCategories.map((addoncategory) => (
          <Box key={addoncategory.id} sx={{ width: 200, height: 200 }}>
            <Link href={`/backoffice/addon-categories/${addoncategory.id}`}>
              <ItemCard name={addoncategory.name} icon={<MdClass />} />
            </Link>
          </Box>
        ))}
      </Box>
    </BackOfficeLayout>
  );
}
