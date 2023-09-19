import { config } from "@/config/config";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useProducts = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  //Create
  const createProduct = async ({
    name,
    asset_url,
    description,
    price,
    rating,
    stock,
    categories_id,
    locations_id,
  }: {
    name: string;
    asset_url: string;
    description: string;
    price: string;
    rating: string;
    stock: string;
    categories_id: string[];
    locations_id: string;
  }) => {
    setLoading(true);

    const resp = await fetch(`${config.nextauth_url}/api/products`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        asset_url,
        description,
        price,
        rating,
        stock,
        categories_id,
        locations_id,
      }),
    });
    if (resp.ok) {
      setLoading(false);
      router.refresh();
      router.push("/backoffice/products");
    } else {
      setLoading(false);
    }
  };

  return { createProduct, loading };
};
