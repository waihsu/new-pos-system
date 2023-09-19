import BackOfficeLayout from "@/components/BackOfficeLayout";
import { Box } from "@mui/material";
import React from "react";
import CreateAddon from "./CreateAddon";
import { getLocationId } from "@/app/actions";
import { getAddonCategories } from "@/lib/server";

export default async function NewAddons() {
  const location_id = await getLocationId();
  const addonCategories = await getAddonCategories(location_id);
  return (
    <BackOfficeLayout title="New Addon" link="/backoffice/addons" button="Back">
      <Box>
        <CreateAddon addonCategories={addonCategories} />
      </Box>
    </BackOfficeLayout>
  );
}
