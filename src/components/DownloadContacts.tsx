/* eslint-disable @typescript-eslint/no-explicit-any */
import { contactProperties } from '@/constant/contactProperties';
import { Button } from '@mui/material';
import vCardsJS from 'vcards-js';

export default function DownloadContacts({
  selectedContacts,
}: {
  selectedContacts: any[];
}) {
  const handleContactsDownload = () => {
    selectedContacts.forEach((contact) => {
      const vCard = vCardsJS();
      const customizedFields: { key: string; value: string }[] = [];
      Object.keys(contact).forEach((propertyId) => {
        const propertyValue = contact[propertyId];
        if (propertyId === 'id') {
          vCard.uid = propertyValue;
        }
        const value = Array.isArray(propertyValue)
          ? propertyValue.join(',')
          : propertyValue;

        const isCustomizedField = contactProperties.find(
          (property) => property.id === propertyId
        )?.isCustomizedField;
        if (isCustomizedField) {
          customizedFields.push({ key: propertyId, value });
        } else {
          (vCard as any)[propertyId] = value;
        }
      });

      // add customized fields to the vCard
      const lines = vCard.getFormattedString().split('\n');
      const customFields = customizedFields.map((field) => {
        return `X-${field.key}: ${field.value}`;
      });
      lines.splice(-3, 0, ...customFields);
      const vCardString = lines.join('\n');
      console.log('vCardString', vCardString);
      const blob = new Blob([vCardString], { type: 'text/vcard' });
      console.log('blob', blob, vCardString, vCard);
      const url = window.URL.createObjectURL(blob);
      //  trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download =
        `${contact.firstName}_${contact.lastName}.vcf`.toLowerCase();
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <Button
      variant="contained"
      onClick={handleContactsDownload}
      sx={{
        width: 'max-content',
      }}
    >
      Download
    </Button>
  );
}
