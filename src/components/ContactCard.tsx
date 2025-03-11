import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Chip,
  Select,
  Checkbox,
  IconButton
} from '@mui/material';

import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

import { Contact } from '@/schema/Contact';
import { useStore } from '@/store'

interface ContactCardProps {
  contact: Contact
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  const {
    onSelectContactCheckbox,
    deleteContact,
  } = useStore(state => state)
  
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {contact.firstName} {contact.lastName}
          </Typography>
          <Box  display="flex" flexDirection="row" alignItems="center">
            <Checkbox size='small' value={contact.isSelected} onSelect={() => onSelectContactCheckbox(contact.id)}/>
            <IconButton aria-label="create" size="small">
              <CreateIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => deleteContact(contact.id)} size="small">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="h6" sx={{ color: 'text.secondary', fontSize: 14 }} >
          {contact.emails}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>{contact.phones}</Typography>
      </CardContent>
      <CardActions sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.12)'}}>
        <Box>
        {contact.tags.map(tag => <Chip sx={{ m: 0.25}} key={tag} label={tag} />)}
        </Box>
      </CardActions>
    </Card>
  );
}

export default ContactCard;