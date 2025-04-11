import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';

export default function FormDialog() {
  const [open, setOpen] = useState(true);
  const [hasName, setHasName] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setHasName(true);
      setOpen(false);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  if (hasName) {
    return null; // Ad zaten kayıtlıysa hiç gösterme
  }

  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
          handleClose();
        }
      }}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const name = formJson.text;

            if (name && name.trim() !== "") {
              localStorage.setItem("userName", name);
              setHasName(true);
              window.location.reload(); // Sayfayı yenile
              handleClose();
            } else {
              alert("Lütfen adınızı girin.");
            }
          },
        },
      }}
    >
      <DialogTitle>Adınız Nedir?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Size hitap etmek için adınızı öğrenmek istiyoruz.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="text"
          label="Adınızı girin"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="standard" type="submit">
          Gönder
        </Button>
      </DialogActions>
    </Dialog>
  );
}
