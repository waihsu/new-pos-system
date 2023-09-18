"use server";

import { products } from "@prisma/client";
import { cookies } from "next/headers";

export interface Cart {
  id: string;
  asset_url: string;
  descritption: string;
  name: string;
  price: string;
  quantity: string;
}

export async function addShopId(location_id: string) {
  cookies().set("locationId", location_id);
}

export async function getShopId() {
  const locationId = cookies().get("locationId");
  return locationId;
}

export async function getLocationId() {
  const cookieStore = cookies();

  const locations_id = cookieStore.get("selectedLocationId")?.value as string;
  return locations_id;
}

export async function setLocation(location_id: string) {
  cookies().set("selectedLocationId", location_id);
}

export async function getCart() {
  const cart = cookies().get("cart");
  return cart;
}

export async function addToCart({
  id,
  name,
  descritption,
  price,
  asset_url,
  quantity,
}: Cart) {
  const existCart = cookies().get("cart");
  // if (data.map((item) => item.id === id)) {
  //   const notSameCart = data.filter((item) => item.id !== id);
  //   console.log(notSameCart);
  //   return;
  // }

  if (existCart) {
    const data = JSON.parse(existCart?.value as string) as Cart[];
    // console.log("data", data);
    const productIds = data.map((item) => item.id);
    if (productIds.includes(id)) {
      // console.log("same");
      const sameCart = data.filter((item) => item.id === id)[0];
      const different = data.filter((item) => item.id !== id);
      // console.log("differ", different);
      const newQuantityCart = { ...sameCart, quantity: quantity };
      // console.log("sameCart", sameCart, "newQuantity", newQuantityCart);
      cookies().set("cart", JSON.stringify([...different, newQuantityCart]));
    } else {
      // console.log("not same");
      cookies().set(
        "cart",
        JSON.stringify([
          ...data,
          { id, name, descritption, price, asset_url, quantity },
        ])
      );
    }
  } else {
    cookies().set(
      "cart",
      JSON.stringify([{ id, name, descritption, price, asset_url, quantity }])
    );
  }
}

// export const addQuantity = async () => {
//   const existCart = cookies().get("cart");
//   const data = JSON.parse(existCart?.value as string) as Cart[];
//   console.log(data);
// };

export async function deleteCartItem(productId: string) {
  const data = JSON.parse(cookies().get("cart")?.value as string) as Cart[];
  // console.log("data", data);
  const validCart = data.filter((item) => item.id !== productId);
  // console.log(validCart);
  cookies().set("cart", JSON.stringify(validCart));
}

export async function delectcart() {
  cookies().delete("cart");
}
