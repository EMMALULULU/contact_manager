import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Chip,
  Checkbox,
  IconButton,
  Dialog,
  DialogTitle,
  Stack,
  Avatar,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import { useStore } from '@/store';
import { useState } from 'react';
import ContactForm from './ContactForm';
import CloseIcon from '@mui/icons-material/Close';
import { Contact } from './types';

export default function ContactCard({ contact }: { contact: Contact }) {
  const {
    setSelectedContacts,
    selectedContacts,
    deleteContact,
    updateContact,
  } = useStore((state) => state);
  const [open, setOpen] = useState(false);
  const isSelected = selectedContacts.includes(contact);

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent
          onClick={() => {
            setOpen(true);
          }}
          sx={{
            padding: '24px',
            cursor: 'pointer',
            height: '200px',
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={4} alignItems="center">
              <Avatar />
              <Stack spacing={0.5}>
                <Typography variant="subtitle1">
                  {contact.firstName} {contact.lastName}
                </Typography>
                <Typography variant="body2">{contact.workPhone}</Typography>
                <Typography variant="body2">{contact.cellPhone}</Typography>
                <Typography variant="body2">{contact.workAddress}</Typography>
                <Typography variant="body2">{contact.workEmail}</Typography>
              </Stack>
            </Stack>
            <Box>
              {contact.tags?.map((tag: string) => (
                <Chip sx={{ m: 0.25 }} key={tag} label={tag} />
              ))}
            </Box>
          </Stack>
        </CardContent>
        <CardActions sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Checkbox
              size="small"
              checked={isSelected}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedContacts([...selectedContacts, contact]);
                } else {
                  setSelectedContacts(
                    selectedContacts.filter((c) => c.id !== contact.id)
                  );
                }
              }}
            />

            {!isSelected && (
              <IconButton
                aria-label="delete"
                onClick={() => deleteContact(contact.id)}
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        </CardActions>
      </Card>
      {/* Edit Contact Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>Contact Details</Typography>
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
          contact={contact}
          onSubmit={(contact) => {
            updateContact(contact);
            setOpen(false);
          }}
        />
      </Dialog>
    </>
  );
}
