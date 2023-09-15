import BackOfficeLayout from "@/components/BackOfficeLayout";
import React from "react";
import NewProductFrom from "./NewProductFrom";
import { getCategoriesBySelectedLocation } from "@/lib/server";
import { getLocationId } from "@/app/actions";

export default async function NewProduct() {
  const locations_id = await getLocationId();
  const categories = await getCategoriesBySelectedLocation(locations_id);

  return (
    <BackOfficeLayout
      title="New Product"
      link="/backoffice/products"
      button="Back To Products">
      <NewProductFrom categories={categories} locations_id={locations_id} />
    </BackOfficeLayout>
  );
}
