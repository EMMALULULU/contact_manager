import { useMemo } from 'react';

import { Stack, Typography } from '@mui/material';

// Components
import ContactCard from '@/components/ContactCard';

import SearchBar from '@/components/SearchBar';

import UploadIcon from '@mui/icons-material/Upload';

import Button from '@mui/material/Button';

import { useStore } from '@/store';
import TagSelector from './components/TagSelector';
import CreateNewContact from './components/CreateNewContact';
import { useSearchParams } from 'react-router-dom';
import { contactProperties } from './constant/contactProperties';
import DownloadContacts from './components/DownloadContacts';

function App() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const tags = searchParams.get('tags');
  const { contacts, selectedContacts } = useStore((state) => state);

  const tagOptions = useMemo(() => {
    const flattened = contacts.map((contact) => contact.tags).flat();
    return [...new Set(flattened)];
  }, [contacts]);

  const displayedContacts = useMemo(() => {
    let filteredContacts = contacts;
    if (query) {
      filteredContacts = Object.values(filteredContacts).filter((contact) => {
        const isMatchSearchTerm = Object.entries(contact).find(
          ([key, value]) => {
            const property = contactProperties.find(
              (property) => property.id === key
            );
            if (property?.isSearchable) {
              return Array.isArray(value)
                ? value.some((v) =>
                    v.toString().toLowerCase().includes(query.toLowerCase())
                  )
                : value.toString().toLowerCase().includes(query.toLowerCase());
            }
            return false;
          }
        );
        return isMatchSearchTerm;
      });
    }
    if (tags) {
      filteredContacts = filteredContacts.filter((contact) => {
        return contact.tags.some((tag: string) => tags.includes(tag));
      });
    }
    return filteredContacts;
  }, [contacts, query, tags]);

  return (
    <Stack
      sx={{
        p: 3,
        width: '100%',
      }}
    >
      <Stack
        sx={{
          height: '80px',
          p: 2,
        }}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Typography
          sx={{
            fontWeight: 800,
          }}
          variant="h5"
        >
          Contact Manager
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined">
            Upload <UploadIcon />
          </Button>
          <CreateNewContact />
        </Stack>
      </Stack>

      <Stack spacing={4}>
        <Stack spacing={1} direction="row" alignItems="center">
          <SearchBar sx={{ width: '360px', height: '60px' }} />
          <TagSelector options={tagOptions} />
        </Stack>
        {selectedContacts.length > 0 && (
          <DownloadContacts selectedContacts={selectedContacts} />
        )}
        {displayedContacts.length ? (
          <Stack spacing={2}>
            {displayedContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                isSelected={selectedContacts.includes(contact)}
              />
            ))}
          </Stack>
        ) : (
          <Stack
            sx={{
              height: '300px',
            }}
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="body1">No contacts found</Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

export default App;
