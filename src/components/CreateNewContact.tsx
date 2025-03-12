import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import ContactForm from './ContactForm';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import { useStore } from '@/store';

export default function CreateNewContact() {
  const [open, setOpen] = useState(false);
  const addContact = useStore((state) => state.addContact);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
      >
        Create New Contact
        <CreateIcon />
      </Button>

      <Dialog open={open}>
        <DialogTitle>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>Create New Contact</Typography>
            <IconButton
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <ContactForm
          onSubmit={(contact) => {
            addContact(contact);
            setOpen(false);
          }}
        />
      </Dialog>
    </>
  );
}
