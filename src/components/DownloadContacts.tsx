import { Button, Stack, Typography } from '@mui/material';
import vCardsJS from 'vcards-js';
export default function DownloadContacts({
  selectedContacts,
}: {
  selectedContacts: any[];
}) {
  const handleContactsDownload = () => {
    selectedContacts.forEach((contact) => {
      const vCard = vCardsJS();
      Object.keys(contact).forEach((propertyId) => {
        const propertyValue = contact[propertyId];
        if (propertyId === 'id') {
          vCard.uid = propertyValue;
        }
        if (Array.isArray(propertyValue)) {
          (vCard as any)[propertyId] = propertyValue.join(',');
        } else {
          (vCard as any)[propertyId] = propertyValue;
        }
      });
      const vCardString = vCard.getFormattedString();
      const blob = new Blob([vCardString], { type: 'text/vcard' });
      const url = window.URL.createObjectURL(blob);
      // Create a temporary link element to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download =
        `${contact.firstName}_${contact.lastName}.vcf`.toLowerCase();
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography variant="body1">
        {selectedContacts.length} contacts selected
      </Typography>
      <Button variant="contained" onClick={handleContactsDownload}>
        Download
      </Button>
    </Stack>
  );
}
