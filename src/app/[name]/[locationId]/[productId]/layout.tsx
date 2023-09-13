import ShopLayout from "@/components/ShopLayout";
import { prisma } from "@/lib";
import { locations } from "@prisma/client";
import React from "react";

export default async function layout({
  children,
  params,
}: {
  params: any;
  children: React.ReactNode;
}) {
  console.log("params", params);
  const { locationId } = params;
  const location = await prisma.locations.findFirst({
    where: { id: locationId },
  });
  return (
    <div>
      <ShopLayout locations={location as locations}>{children}</ShopLayout>
    </div>
  );
}
