import { config } from "@/config/config";
import { addon_categories } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useAddonCategories = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  //Create
  const createAddonCategory = async ({
    name,
    is_required,
    product_id,
  }: {
    name: string;
    is_required: boolean;
    product_id: string[];
  }) => {
    setLoading(true);
    const resp = await fetch(`${config.nextauth_url}/api/addon-categories`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, is_required, product_id }),
    });

    if (resp.ok) {
      setLoading(false);
      router.refresh();
      router.push("/backoffice/addon-categories");
    } else {
      setLoading(false);
      setError(true);
    }
  };

  //Update
  const handleUpdate = async (addonCategories: addon_categories) => {
    setLoading(true);
    const resp = await fetch(`${config.nextauth_url}/api/addon-categories`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addonCategories),
    });

    if (resp.ok) {
      setLoading(false);
      router.refresh();
      router.push("/backoffice/addon-categories");
    } else {
      setLoading(false);
      setError(true);
    }
  };

  //Delete
  const handleDelete = async (id: string) => {
    setLoading(true);
    const resp = await fetch(`${config.nextauth_url}/api/addon-categories`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(id),
    });
    if (resp.ok) {
      setLoading(false);
      router.refresh();
      router.push("/backoffice/addon-categories");
    } else {
      setLoading(false);
      setError(true);
    }
  };

  return { createAddonCategory, handleUpdate, handleDelete, loading };
};
