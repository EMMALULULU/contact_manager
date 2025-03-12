import { Button, Stack, Typography } from '@mui/material';

export default function DownloadContacts({
  selectedContacts,
}: {
  selectedContacts: any[];
}) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography variant="body1">
        {selectedContacts.length} contacts selected
      </Typography>
      <Button variant="contained">Download</Button>
    </Stack>
  );
}
