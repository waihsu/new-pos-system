import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";

export default function DeleteDialog({
  open,
  setOpen,
  callback,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  callback: () => void;
}) {
  return (
    <Dialog open={open} onClose={() => setOpen(!open)}>
      <DialogTitle>Are You Sure?</DialogTitle>
      <DialogActions>
        <Button onClick={() => setOpen(!open)}>No</Button>
        <Button
          onClick={() => {
            callback();
            setOpen(false);
          }}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
