import { v4 as uuid } from "uuid";
import { useState } from "react";

// components
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";

// Types
import { contactSchema, Contact, ContactFormError } from "@/schema/Contact";

// Store
import { useStore } from "@/store";

export default function ContactForm() {
  const initialContact = {
    firstName: "",
    lastName: "",
    isSelected: false,
    phones: 10000000,
    emails: "",
    address: "",
    categories: "",
    organizationName: "",
    websiteURL: "",
    notes: "",
    tags: [],
  };

  const initialFormError = { formErrors: [], fieldErrors: {} };

  const addContact = useStore((state) => state.addContact);

  const [formError, setFormError] = useState<ContactFormError>({
    ...initialFormError,
  });
  const [contact, setContact] = useState<Contact>({
    id: uuid(),
    ...initialContact,
  });

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setContact((prevState) => ({ ...prevState, [name]: value }));
  };

  const onTagsChange = (tags: string[]) => {
    setContact((prevState) => ({ ...prevState, tags }));
  };

  const resetForm = () => {
    setContact({
      id: uuid(),
      ...initialContact,
    });
  };

  const onSubmit = () => {
    setFormError({ ...formError });
    const { data, success, error } = contactSchema.safeParse(contact);
    if (!success) {
      console.log("error  >>>>>>>>>>>> ", error.flatten().fieldErrors);
      return setFormError(error.flatten());
    }
    addContact(data);
    resetForm();
  };

  return (
    <Paper elevation={3}>
      <Box sx={{ p: 2 }} component="form">
        <Typography variant="h4" textAlign="center">
          Create Contact
        </Typography>
        <TextField
          name="firstName"
          label="FirstName"
          value={contact.firstName}
          error={Array.isArray(formError.fieldErrors.firstName)}
          helperText={
            Array.isArray(formError.fieldErrors.firstName)
              ? formError.fieldErrors.firstName[0]
              : ""
          }
          onChange={onInputChange}
          variant="outlined"
          sx={{ my: 1 }}
          fullWidth
        />
        <TextField
          name="lastName"
          label="LastName"
          variant="outlined"
          value={contact.lastName}
          error={Array.isArray(formError.fieldErrors.lastName)}
          helperText={
            Array.isArray(formError.fieldErrors.lastName)
              ? formError.fieldErrors.lastName[0]
              : ""
          }
          onChange={onInputChange}
          sx={{ my: 1 }}
          fullWidth
        />
        <TextField
          name="phones"
          label="Phones"
          value={contact.phones}
          error={Array.isArray(formError.fieldErrors.phones)}
          helperText={
            Array.isArray(formError.fieldErrors.phones)
              ? formError.fieldErrors.phones[0]
              : ""
          }
          onChange={onInputChange}
          variant="outlined"
          sx={{ my: 1 }}
          fullWidth
        />
        <TextField
          name="emails"
          label="Emails"
          value={contact.emails}
          error={Array.isArray(formError.fieldErrors.emails)}
          helperText={
            Array.isArray(formError.fieldErrors.emails)
              ? formError.fieldErrors.emails[0]
              : ""
          }
          onChange={onInputChange}
          variant="outlined"
          sx={{ my: 1 }}
          fullWidth
        />
        <TextField
          name="address"
          label="Address"
          value={contact.address}
          error={Array.isArray(formError.fieldErrors.address)}
          helperText={
            Array.isArray(formError.fieldErrors.address)
              ? formError.fieldErrors.address[0]
              : ""
          }
          onChange={onInputChange}
          variant="outlined"
          sx={{ my: 1 }}
          fullWidth
        />
        <TextField
          name="categories"
          label="Categories"
          variant="outlined"
          error={Array.isArray(formError.fieldErrors.categories)}
          helperText={
            Array.isArray(formError.fieldErrors.categories)
              ? formError.fieldErrors.categories[0]
              : ""
          }
          value={contact.categories}
          onChange={onInputChange}
          sx={{ my: 1 }}
          fullWidth
        />
        <TextField
          name="organizationName"
          label="OrganizationName"
          variant="outlined"
          value={contact.organizationName}
          error={Array.isArray(formError.fieldErrors.organizationName)}
          helperText={
            Array.isArray(formError.fieldErrors.organizationName)
              ? formError.fieldErrors.organizationName[0]
              : ""
          }
          onChange={onInputChange}
          sx={{ my: 1 }}
          fullWidth
        />
        <TextField
          name="websiteURL"
          label="WebsiteURL"
          variant="outlined"
          value={contact.websiteURL}
          error={Array.isArray(formError.fieldErrors.websiteURL)}
          helperText={
            Array.isArray(formError.fieldErrors.websiteURL)
              ? formError.fieldErrors.websiteURL[0]
              : ""
          }
          onChange={onInputChange}
          sx={{ my: 1 }}
          fullWidth
        />
        <TextField
          name="notes"
          label="Notes"
          variant="outlined"
          onChange={onInputChange}
          error={Array.isArray(formError.fieldErrors.notes)}
          helperText={
            Array.isArray(formError.fieldErrors.notes)
              ? formError.fieldErrors.notes[0]
              : ""
          }
          sx={{ my: 1 }}
          fullWidth
        />

        <MuiChipsInput
          label="Tags"
          value={contact.tags}
          error={Array.isArray(formError.fieldErrors.tags)}
          helperText={
            Array.isArray(formError.fieldErrors.tags)
              ? formError.fieldErrors.tags[0]
              : ""
          }
          fullWidth
          onChange={onTagsChange}
        />

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          gap={1}
          sx={{ my: 1 }}
        >
          <Button onClick={resetForm}>Clear</Button>
          <Button variant="contained" onClick={onSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
