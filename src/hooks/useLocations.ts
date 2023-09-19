import { config } from "@/config/config";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLocation = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  //Create
  const createLocation = async ({
    name,
    address,
    asset_url,
    phone,
    user_id,
  }: {
    name: string;
    address: string;
    asset_url: string;
    phone: string;
    user_id: string;
  }) => {
    setLoading(true);

    const resp = await fetch(`${config.nextauth_url}/api/locations`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, address, asset_url, phone, user_id }),
    });
    if (resp.ok) {
      setLoading(false);
      router.refresh();
    }
    setLoading(false);
  };

  //Delete
  const deleteLocation = async (location_id: string) => {
    const resp = await fetch(`${config.nextauth_url}/api/locations`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(location_id),
    });
    if (resp.ok) {
      setLoading(false);
      router.refresh();
    }
    setLoading(false);
  };

  return { createLocation, deleteLocation, loading };
};
