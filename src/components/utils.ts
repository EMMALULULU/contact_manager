import { contactProperties } from '@/constant/contactProperties';
import { Contact } from './types';
import _lodash from 'lodash';

export function parseVCardToContact(vCardText: string): Contact {
  const lines = vCardText.split('\n').filter((line) => line.trim());
  const result: Contact = { id: '' };

  lines.forEach((line) => {
    if (line.length === 0) return;

    const [keyPart, value] = line.split(':', 2);
    const key = keyPart.split(';')[0];

    if (key === 'UID') {
      result.id = value.trim();
    } else if (key === 'FN') {
      const fullName = value.trim();
      const [firstName, ...lastNameParts] = fullName.split(' ');
      result.firstName = firstName;
      result.lastName = lastNameParts.join(' ').trim();
    } else if (key === 'N') {
      const [family, given] = value.split(';');
      result.lastName = family.trim();
      result.firstName = given.trim();
    } else if (key === 'EMAIL') {
      const params = keyPart.split(';').slice(1);
      const typeMatch = params.find((prop) => prop.startsWith('type='));
      const emailType = typeMatch
        ? typeMatch.split('=')[1].split(',')[0]
        : null;
      if (emailType === 'HOME') result.email = value.trim();
      if (emailType === 'WORK') result.workEmail = value.trim();
    } else if (key === 'TEL') {
      const params = keyPart.split(';').slice(1);
      const typeMatch = params.find((prop) => prop.startsWith('TYPE='));
      const telType = typeMatch ? typeMatch.split('=')[1].split(',')[0] : null;
      if (telType === 'CELL') result.cellPhone = value.trim();
      if (telType === 'WORK') result.workPhone = value.trim();
    } else if (key === 'X-workAddress') {
      result.workAddress = value.trim();
    } else if (key === 'X-categories') {
      result.categories = value.trim();
    } else if (key === 'X-tags') {
      const tagsValue = value.trim();
      result.tags = tagsValue ? tagsValue.split(',') : [];
    } else if (key === 'ORG') {
      result.organization = value.trim();
    } else if (key === 'URL') {
      result.url = value.trim();
    } else if (key === 'NOTE') {
      result.note = value.trim();
    }
  });

  return result;
}

export function isContactValidToUpload(contact: Contact): boolean {
  return Object.entries(contact).every(([key, value]) => {
    const property = contactProperties.find((p) => p.id === key);

    if (property?.isRequired) {
      return !!value;
    }
    return true;
  });
}

export function checkUploadContactStatus(
  contacts: Contact[],
  contact: Contact
): 'add' | 'update' | 'skip' {
  const existingContact = contacts.find((c) => c.id === contact.id);
  const isContactValid = isContactValidToUpload(contact);

  if (!existingContact && isContactValid) return 'add';
  else if (existingContact && isContactValid) {
    const isUpdate = Object.keys(contact).find((key) => {
      if (contactProperties.find((p) => p.id === key)?.type === 'tag') {
        return !_lodash.isEqual(existingContact[key], contact[key]);
      }
      return existingContact[key] != contact[key];
    });
    console.log('isUpdate', isUpdate);

    return isUpdate ? 'update' : 'skip';
  }
  return 'skip';
}
