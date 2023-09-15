"use client";
import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { locations } from "@prisma/client";
import { useRouter } from "next/navigation";
import { setLocation } from "@/app/actions";
import BackOfficeLayout from "@/components/BackOfficeLayout";
import { LoadingButton } from "@mui/lab";
import { config } from "@/config/config";
import FileDropZone from "@/components/FileDropZone";
import { uploadImage } from "@/lib/server";

export default function NewLocation({
  locations,
  locations_id,
  user_id,
}: {
  locations: locations[];
  locations_id: string;
  user_id: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    asset_url: "",
    phone: "",
    user_id: user_id,
  });
  const [shopImage, setShopImage] = useState<File>();
  const selectFile = (files: File[]) => {
    setShopImage(files[0]);
  };
  useEffect(() => {
    if (!locations_id) {
      setLocation(locations[0].id);
      // router.refresh();
    }
  }, []);
  const defaultLocation = locations.filter(
    (item) => item.id === locations_id
  )[0] as locations;

  const handleClick = (locations_id: string) => {
    setLocation(locations_id);
  };

  const createLocation = async () => {
    setLoading(true);

    const image_url = await uploadImage(shopImage as File);
    newLocation.asset_url = image_url;
    const resp = await fetch(`${config.nextauth_url}/api/locations`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ newLocation }),
    });
    if (resp.ok) {
      setLoading(false);
      setOpen(false);
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <BackOfficeLayout
      title="Shop"
      link=""
      button="Add New Shop"
      open={open}
      setOpen={setOpen}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={locations}
        defaultValue={defaultLocation}
        getOptionLabel={(locations) => locations.name}
        onChange={(evt, value) => handleClick(value?.id as string)}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Please Select Shop" />
        )}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>New Shop</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            size="small"
            label="Name"
            onChange={(evt) =>
              setNewLocation({ ...newLocation, name: evt.target.value })
            }
          />
          <TextField
            size="small"
            label="Address"
            onChange={(evt) =>
              setNewLocation({ ...newLocation, address: evt.target.value })
            }
          />
          <TextField
            size="small"
            label="Phone Number"
            onChange={(evt) =>
              setNewLocation({ ...newLocation, phone: evt.target.value })
            }
          />
          <FileDropZone selectedFile={selectFile} />
        </DialogContent>
        <DialogActions>
          <LoadingButton loading={loading} onClick={createLocation}>
            Create
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </BackOfficeLayout>
  );
}
