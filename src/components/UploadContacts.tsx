import { useState, useRef, ChangeEvent } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import { useStore } from '@/store';
import { Contact } from './types';

import { checkUploadContactStatus, formatContact, parseVCardToContact } from './utils';
type ContactWithUploadStatus = {
  status: 'add' | 'update' | 'skip';
  contact: Contact;
};

export default function UploadContacts() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [uploadContactsStatus, setUploadContactsStatus] =
    useState<ContactWithUploadStatus[]>();
  const { contacts, addContact, updateContact } = useStore();
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const processVCards = async (files: FileList) => {
    const processedFiles = await Promise.all(
      Array.from(files).map(async (file) => {
        const text = await file.text();
    
        const parsedContact = parseVCardToContact(text);
        const formattedContact = formatContact(parsedContact);

        return {
          contact : formattedContact,
          status: checkUploadContactStatus(contacts, formattedContact),
        };
      })
    );
    console.log('processedFiles', processedFiles);
    const uniqueById = new Map<string, ContactWithUploadStatus>();
    processedFiles.forEach((item) => {
      if (item.contact.id) {
        uniqueById.set(item.contact.id, item);
      }
    });

    const processed = Array.from(uniqueById.values());

    setUploadContactsStatus(processed);
    setOpen(true);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      processVCards(files);
    }
    event.target.value = '';
  };
  const handleConfirm = () => {
    uploadContactsStatus?.forEach(({ status, contact }) => {
      if (status === 'add') {
        addContact(contact);
      } else if (status === 'update') {
        updateContact(contact);
      }
    });
    setOpen(false);
  };

  console.log('uploadContactsStatus', uploadContactsStatus);
  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        multiple
        accept=".vcf,.vcard"
      />
      <Button variant="outlined" onClick={handleFileSelect}>
        Upload <UploadIcon />
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Contact Import Summary</DialogTitle>
        <DialogContent>
          <List>
            {uploadContactsStatus?.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={
                    <>
                      <Chip
                        label={item.status.toUpperCase()}
                        size="small"
                        color={
                          getActionColor(item.status) as
                            | 'success'
                            | 'warning'
                            | 'default'
                        }
                        sx={{ mr: 1 }}
                      />
                      {`${item.contact.firstName} ${item.contact.lastName}`}
                    </>
                  }
                  secondary={
                    <>
                      {`Phone: ${item.contact.workPhone} • Email: ${
                        item.contact.email || 'N/A'
                      }`}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirm} variant="contained" color="primary">
            Confirm Import
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function getActionColor(
  status: ContactWithUploadStatus['status']
): 'success' | 'warning' | 'default' {
  switch (status) {
    case 'add':
      return 'success';
    case 'update':
      return 'warning';
    case 'skip':
      return 'default';
    default:
      return 'default';
  }
}
