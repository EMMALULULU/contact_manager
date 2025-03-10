import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Chip,
} from '@mui/material';


import { Contact } from '@/schema/Contact';

interface ContactCardProps {
  contact: Contact
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {contact.firstName} {contact.lastName}
        </Typography>
        <Typography variant="h5" component="div">
          {contact.emails}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        {contact.tags.map(tag => <Chip label={tag} />)}
      </CardActions>
    </Card>
  );
}

export default ContactCard;