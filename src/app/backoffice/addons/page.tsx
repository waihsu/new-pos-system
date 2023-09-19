import { getLocationId } from "@/app/actions";
import BackOfficeLayout from "@/components/BackOfficeLayout";
import ItemCard from "@/components/ItemCard";
import { prisma } from "@/lib";
import { getAddonCategories } from "@/lib/server";
import { Box } from "@mui/material";
import Link from "next/link";
import React from "react";
import { MdClass } from "react-icons/md";

export default async function Addons() {
  const location_id = await getLocationId();
  const addonCategories = await getAddonCategories(location_id);
  const addonCategoryIds = addonCategories.map((item) => item.id);
  const addons = await prisma.addons.findMany({
    where: { addon_category_id: { in: addonCategoryIds } },
  });
  console.log(addons);
  return (
    <BackOfficeLayout
      title="Addons"
      link="/backoffice/addons/new-addons"
      button="New Addons">
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {addons.map((addon) => (
          <Box key={addon.id} sx={{ width: 200, height: 200 }}>
            <Link href={`/backoffice/addons/${addon.id}`}>
              <ItemCard name={addon.name} icon={<MdClass />} />
            </Link>
          </Box>
        ))}
      </Box>
    </BackOfficeLayout>
  );
}
