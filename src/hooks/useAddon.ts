import { config } from "@/config/config";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useAddons = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  //Create
  const createAddon = async ({
    name,
    price,
    addon_category_id,
  }: {
    name: string;
    price: string;
    addon_category_id: string;
  }) => {
    setLoading(true);
    const resp = await fetch(`${config.nextauth_url}/api/addons`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, price, addon_category_id }),
    });
    if (resp.ok) {
      setLoading(false);
      router.refresh();
      router.push("/backoffice/addons");
    } else {
      setLoading(false);
      setError(true);
    }
  };

  //Delete
  const deleteAddon = async (id: string) => {
    setLoading(true);
    const resp = await fetch(`${config.nextauth_url}/api/addons`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(id),
    });
    if (resp.ok) {
      setLoading(false);
      router.refresh();
      router.push("/backoffice/addons");
    } else {
      setLoading(false);
      setError(true);
    }
  };

  return { createAddon, deleteAddon, loading };
};
