import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// Types
import { Contact } from '@/schema/Contact';


type State = {
    contacts: Contact[];
}

type Actions = {
    addContact: (contact: Contact) => void;
    removeContact: (id: string) => void;
    // addCustomer: (customer: Customer) => void;
}

export const useStore = create<State & Actions>()(
    immer((set) => ({
        contacts: [],
        addContact: (contact) => set((state) => {
            state.contacts.push(contact);
        }),
        removeContact: (id) => set((state) => {
            state.contacts = state.contacts.filter((contact) => contact.id !== id);
        }),
    }))
)