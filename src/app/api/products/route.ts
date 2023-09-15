import { prisma } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { newProduct } = await req.json();

  const {
    name,
    asset_url,
    description,
    price,
    rating,
    stock,
    categories_id,
    locations_id,
  } = newProduct;
  const createProduct = await prisma.products.create({
    data: {
      name,
      asset_url,
      description,
      price,
      rating,
      stock,
    },
  });
  const product_id = createProduct.id;
  categories_id.map(async (item: string) => {
    await prisma.locations_categories_products.create({
      data: {
        product_id: product_id,
        location_id: locations_id,
        category_id: item,
      },
    });
  });
  return NextResponse.json({ createProduct });
}

export async function PUT(req: NextRequest) {
  const {
    id,
    name,
    asset_url,
    description,
    price,
    rating,
    stock,
    categories_id,
    locations_id,
  } = await req.json();

  const updatedProduct = await prisma.products.update({
    where: { id },
    data: {
      name,
      asset_url,
      description,
      price,
      rating,
      stock,
    },
  });

  const existCategories = await prisma.locations_categories_products.findMany({
    where: { location_id: locations_id, product_id: id },
  });
  // console.log("existCategories", existCategories);
  const existCategoriesIds = existCategories.map((item) => item.category_id);
  const addedCategories = categories_id.filter(
    (item: string) => !existCategoriesIds.includes(item)
  ) as string[];
  // console.log(addedCategories);
  if (addedCategories.length) {
    addedCategories.map(
      async (item: string) =>
        await prisma.locations_categories_products.createMany({
          data: {
            location_id: locations_id,
            product_id: id,
            category_id: item,
          },
        })
    );
  }
  const removeCategoryIds = existCategoriesIds.filter(
    (item) => !categories_id.includes(item)
  );
  // console.log("removeIds", removeCategoryIds);
  if (removeCategoryIds.length) {
    removeCategoryIds.map(async (item: string) => {
      await prisma.locations_categories_products.deleteMany({
        where: {
          location_id: locations_id,
          product_id: id,
          category_id: item,
        },
      });
    });
  }

  return NextResponse.json({ messg: "k" });
}

export async function DELETE(req: NextRequest) {
  const id = await req.json();
  const deletedProduct = await prisma.products.delete({
    where: { id },
  });
  return NextResponse.json({ deletedProduct });
}
