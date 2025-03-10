import { useState } from 'react'
import { Box, Paper, Typography,  TextField, Button } from "@mui/material";
import { MuiChipsInput } from 'mui-chips-input'

import { Contact } from '@/schema/Contact'

export default function BasicTextFields() {

  const initialContact = {
    firstName: "", 
    lastName: "", 
    phones: 10000000,
    emails: "",
    categories: "",
    organizationName: "",
    websiteURL: "",
    notes: "",
    tags: []
  }

  const [contact, setContact] = useState<Contact>({ ...initialContact });

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setContact({ ...contact, [name]: value })
  }

  const onTagsChange = (tags: string[]) => {
    setContact({...contact, tags})
  }

  const resetForm = () => {
    setContact({ ...initialContact })
  }

  return (
    <Paper sx={{ my: 2 }} elevation={3}>
      <Box sx={{ p: 2 }} component="form">
        <Typography variant="h4" textAlign="center" >Create Contact</Typography>
        <TextField
          name="firstName"
          label="firstName"
          value={contact.firstName}
          onChange={onInputChange}
          variant="outlined"
          sx={{ my: 1 }}
          fullWidth
        />
        <TextField
          name="lastName"
          label="lastName"
          variant="outlined"
          value={contact.lastName}
          onChange={onInputChange}
          sx={{ my: 1 }}
          fullWidth
        />
        <TextField name="phones" label="phones" value={contact.phones} onChange={onInputChange} variant="outlined" sx={{ my: 1 }} fullWidth />
        <TextField name="emails" label="emails" value={contact.emails} onChange={onInputChange} variant="outlined" sx={{ my: 1 }} fullWidth />
        <TextField
          name="categories"
          label="categories"
          variant="outlined"
          value={contact.categories}
          onChange={onInputChange}
          sx={{ my: 1 }}
          fullWidth
        />
        <TextField
          name="organizationName"
          label="organizationName"
          variant="outlined"
          value={contact.organizationName}
          onChange={onInputChange}
          sx={{ my: 1 }}
          fullWidth
        />
        <TextField
          name="websiteURL"
          label="websiteURL"
          variant="outlined"
          value={contact.websiteURL}
          onChange={onInputChange}
          sx={{ my: 1 }}
          fullWidth
        />
        <TextField name="notes" label="notes" variant="outlined" onChange={onInputChange} sx={{ my: 1 }} fullWidth />

        <MuiChipsInput label="Tags" value={contact.tags} fullWidth onChange={onTagsChange} />

        <Box display="flex" flexDirection="row" justifyContent="center" gap={1} sx={{ my: 1}}>
          <Button onClick={resetForm}>Clear</Button>
          <Button variant="contained">Submit</Button>
        </Box>
      </Box>
    </Paper>
  );
}
