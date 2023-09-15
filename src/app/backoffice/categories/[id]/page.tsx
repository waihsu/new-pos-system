import { prisma } from "@/lib";
import React from "react";
import EditCategory from "./EditCategory";
import { categories } from "@prisma/client";

export default async function Category({ params }: { params: any }) {
  const { id } = params;
  const category = await prisma.categories.findFirst({
    where: { id },
  });
  return <EditCategory category={category as categories} />;
}
