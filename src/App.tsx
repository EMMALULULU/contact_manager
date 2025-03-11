import { useMemo } from 'react'
import Grid from "@mui/material/Grid2";
import { Box, ButtonGroup, Container, Paper } from "@mui/material";

// Components
import ContactCard from "@/components/ContactCard";
import ContactForm from "@/components/ContactForm";

import SearchBar from "@/components/SearchBar";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import CreateIcon from "@mui/icons-material/Create";
import Button from "@mui/material/Button";

import { useStore } from "@/store";
import TagSelector from "./components/TagSelector";

function App() {
  const { searchKeyword, contacts, selectedTags, setSelectedTags, setSearchKey } = useStore((state) => state);

  const tagOptions = useMemo(() => {
    const flattened = contacts.map(contact => contact.tags).flat()
    return [...new Set(flattened)]
  }, [contacts]) 


  const filteredContact = useMemo(() => {
    return contacts.filter(contact => {
      const isMatchSearchTerm = JSON.stringify(contact).includes(searchKeyword);
      const isMatchTags = selectedTags.length === 0 || contact.tags.some(tag => selectedTags.includes(tag))
      return isMatchSearchTerm && isMatchTags;
    })
  }, [contacts, searchKeyword, selectedTags])
  
  return (
    <Container>
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid size={4}>
          <SearchBar onSearchClicked={(searchKey) => setSearchKey(searchKey)}/>
          <Paper sx={{ borderRadius: 0, my: 2 }}>
            <ButtonGroup fullWidth variant="outlined">
              <Button>
                Upload <UploadIcon />
              </Button>
              <Button>
                Download <DownloadIcon />
              </Button>
              <Button>
                Create <CreateIcon />
              </Button>
            </ButtonGroup>

            <TagSelector options={tagOptions} selectedTags={selectedTags} setSelectedTags={(event) => setSelectedTags(event.target.value)} />
          </Paper>

          <Box display="flex" flexDirection="column" gap={2}>
          {filteredContact.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
          </Box>
        </Grid>
        <Grid size={8}>
          <ContactForm />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
