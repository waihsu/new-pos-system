import { getLocationId } from "@/app/actions";
import BackOfficeLayout from "@/components/BackOfficeLayout";
import { prisma } from "@/lib";
import React from "react";
import SettingForm from "./SettingForm";
import { locations } from "@prisma/client";

export default async function SiteSettings() {
  const location_id = await getLocationId();
  if (!location_id) return <h1>Please Select Shop First!!</h1>;
  const location = await prisma.locations.findUnique({
    where: { id: location_id },
  });

  console.log(location);
  return (
    <BackOfficeLayout
      title="Edit Page"
      link="/backoffice/locations"
      button="Back to Shops">
      <SettingForm location={location as locations} />
    </BackOfficeLayout>
  );
}
