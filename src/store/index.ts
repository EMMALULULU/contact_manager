import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { generateContactFormSchema } from '@/schema/Contact';
import { contactProperties } from '@/constant/contactProperties';
import { Contact } from '@/components/types';

type State = {
  contacts: Contact[];
  selectedContacts: Contact[];
};

type Actions = {
  addContact: (contact: Contact) => void;
  deleteContact: (id: string) => void;

  updateContact: (contact: Contact) => void;
  setSelectedContacts: (contacts: Contact[]) => void;
};

const getContact = () => {
  const contactStr = localStorage.getItem('contacts');
  if (contactStr) {
    const savedRecords: Contact[] = JSON.parse(contactStr);
    const validRecords = Array.isArray(savedRecords)
      ? savedRecords.filter((record) => {
          return (
            generateContactFormSchema(contactProperties).safeParse(record)
              .success === true
          );
        })
      : [];
    console.log('contactStr', savedRecords);

    return validRecords;
  }
  return [];
};

export const useStore = create<State & Actions>()(
  immer((set) => ({
    selectedContacts: [],
    contacts: getContact(),
    addContact: (contact) =>
      set((state) => {
        const newContact = contact;
        state.contacts.push(newContact);
        localStorage.setItem('contacts', JSON.stringify(state.contacts));
      }),
    deleteContact: (id) =>
      set((state) => {
        state.contacts = state.contacts.filter((contact) => contact.id !== id);
        localStorage.setItem('contacts', JSON.stringify(state.contacts));
        state.selectedContacts = state.selectedContacts.filter(
          (contact) => contact.id !== id
        );
      }),
    updateContact: (contact) =>
      set((state) => {
        console.log('inside store', contact);
        state.contacts = state.contacts.map((c) =>
          c.id === contact.id ? contact : c
        );
        localStorage.setItem('contacts', JSON.stringify(state.contacts));
      }),
    setSelectedContacts: (contacts) => set({ selectedContacts: contacts }),
  }))
);
