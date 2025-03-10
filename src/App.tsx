import { useState } from "react";
import { Container } from "@mui/material";

// Components
import ContactCard from "@/components/ContactCard";
import ContactForm from "@/components/ContactForm";

import { useStore } from "@/store";

function App() {
  const { contacts } = useStore((state) => state);
  return (
    <Container>
      {contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
      <ContactForm />
    </Container>
  );
}

export default App;
