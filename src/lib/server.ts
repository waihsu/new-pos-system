import { categories } from "@prisma/client";
import { prisma } from ".";
import { supabase } from "./supabase";
import { cookies } from "next/headers";

export const getLocations = async () => {
  const locations = await prisma.locations.findMany();
  return locations;
};

export const getProducts = async (location_id: string) => {
  const locations_categories_products =
    await prisma.locations_categories_products.findMany({
      where: { location_id: location_id },
    });
  const productIds = locations_categories_products.map(
    (item) => item.product_id
  );
  const products = await prisma.products.findMany({
    where: {
      id: { in: productIds },
    },
  });
  return products;
};

export const getLocationsByUserId = async (user_id: string) => {
  const locations = await prisma.locations.findMany({
    select: {
      id: true,
      name: true,
      address: true,
      user_id: true,
    },
    where: {
      user_id: user_id,
    },
  });
  return locations;
};

export const getCategoriesBySelectedLocation = async (locations_id: string) => {
  const categoreisBylocation = await prisma.categories.findMany({
    where: { location_id: locations_id },
  });
  return categoreisBylocation;
};

export const getSingleProduct = async (id: string) => {
  const product = await prisma.products.findUnique({ where: { id } });
  return product;
};

export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const uploadImage = async (files: File) => {
  const uniqueNumber = generateRandomNumber(100, 999);
  const file = files;
  const { data: image } = await supabase.storage
    .from("products")
    .upload(
      uniqueNumber + "_" + file.name.toLowerCase().replace(/ /g, ""),
      file
    );
  const { data: image_url } = supabase.storage
    .from("products")
    .getPublicUrl(image?.path as string);
  return image_url.publicUrl;
};

export const deleteImage = async () => {};
