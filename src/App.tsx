import { useState } from 'react'
import { Container } from '@mui/material';

// Components
import ContactForm from '@/components/ContactForm';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container>
          <ContactForm />
    </Container>

  )
}

export default App
