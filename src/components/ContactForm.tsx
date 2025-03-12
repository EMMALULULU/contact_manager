import { Controller, FormProvider, useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { Box, Paper, TextField, Button, Stack } from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input';
import { ContactFormData, generateContactFormSchema } from '@/schema/Contact';
import DeleteIcon from '@mui/icons-material/Delete';

import { Contact, ContactProperty } from './types';
import { contactProperties } from '@/constant/contactProperties';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStore } from '@/store';

const initialContact = {
  firstName: '',
  lastName: '',
  phone: 10000000,
  emails: '',
  address: '',
  categories: '',
  organizationName: '',
  websiteURL: '',
  notes: '',
  tags: [],
};
export default function ContactForm({
  onSubmit,
  contact,
}: {
  onSubmit?: (contact: Contact) => void;
  contact?: Contact;
}) {
  const methods = useForm<ContactFormData>({
    defaultValues: contact ?? initialContact,
    resolver: zodResolver(generateContactFormSchema(contactProperties)),
  });
  const { deleteContact } = useStore((state) => state);

  return (
    <Paper elevation={3}>
      <FormProvider {...methods}>
        <Box sx={{ p: 2 }} component="form">
          {contactProperties.map((property) => {
            return getContactPropertyInput(property);
          })}

          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ my: 3, width: '100%' }}
            spacing={2}
          >
            {contact?.id && (
              <Button
                variant="outlined"
                onClick={() => deleteContact(contact?.id ?? '')}
              >
                Delete
                <DeleteIcon />
              </Button>
            )}
            <Button
              variant="contained"
              onClick={methods.handleSubmit((data) => {
                onSubmit?.({ ...data, id: contact?.id ?? uuid() });
              })}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </FormProvider>
    </Paper>
  );
}

function getContactPropertyInput(property: ContactProperty) {
  switch (property.type) {
    case 'email':
    case 'singleLineString':
    case 'url':
      return (
        <Controller
          key={property.id}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <TextField
                label={property.name}
                value={value}
                error={!!error}
                helperText={error?.message}
                onChange={onChange}
                variant="outlined"
                sx={{ my: 1 }}
                fullWidth
              />
            );
          }}
          name={property.id}
        />
      );
    case 'multiLineString':
      return (
        <Controller
          key={property.id}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <TextField
                multiline
                value={value}
                name={property.name}
                label={property.name}
                variant="outlined"
                onChange={onChange}
                error={!!error}
                rows={3}
                helperText={error?.message}
                sx={{ my: 1 }}
                fullWidth
              />
            );
          }}
          name={property.id}
        />
      );
    case 'phoneNumber':
      return (
        <Controller
          key={property.id}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              // TODO: phone number input
              <TextField
                multiline
                value={value}
                name={property.name}
                label={property.name}
                variant="outlined"
                onChange={onChange}
                error={!!error}
                helperText={error?.message}
                sx={{ my: 1 }}
                fullWidth
              />
            );
          }}
          name={property.id}
        />
      );
    case 'tag':
      return (
        <Controller
          key={property.id}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <MuiChipsInput
                label={property.name}
                value={value}
                error={!!error}
                helperText={error?.message}
                fullWidth
                onChange={onChange}
              />
            );
          }}
          name={property.id}
        />
      );
  }
}
