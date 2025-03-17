import { Controller, FormProvider, useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Paper,
  TextField,
  Button,
  Stack,
  FormHelperText,
  FormControl,
} from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input';
import { ContactFormData, generateContactFormSchema } from '@/schema/Contact';

import { Contact, ContactProperty } from './types';
import { contactProperties } from '@/constant/contactProperties';
import { zodResolver } from '@hookform/resolvers/zod';

import PhoneInputComponent from './PhoneInput';
import { useStore } from '@/store';
import { getEmptyContact } from './utils';

const initialContact = getEmptyContact();

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
  const { setSelectedContacts } = useStore((state) => state);
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
            <Button
              variant="contained"
              onClick={methods.handleSubmit((data) => {
                onSubmit?.({ ...data, id: contact?.id ?? uuid() });
                setSelectedContacts([]);
              })}
            >
              {contact?.id ? 'Update' : 'Submit'}
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
          key={property.name + Math.random()}
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
          key={property.name + Math.random()}
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
        <Stack
          sx={{
            display: 'block',
            py: '6px',
          }}
        >
          <Controller
            key={property.name + Math.random()}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <FormControl error={!!error} fullWidth>
                  <PhoneInputComponent
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    label={property.name}
                  />
                  {!!error && <FormHelperText>{error?.message}</FormHelperText>}
                </FormControl>
              );
            }}
            name={property.id}
          />
        </Stack>
      );
    case 'tag':
      return (
        <Controller
          key={property.name + Math.random()}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <MuiChipsInput
                label={property.name}
                value={value}
                error={!!error}
                helperText={error?.message}
                fullWidth
                onChange={(value) => {
                  const updated = new Set(value);
                  onChange([...updated]);
                }}
              />
            );
          }}
          name={property.id}
        />
      );
  }
}
