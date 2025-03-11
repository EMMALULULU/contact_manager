import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// Types
import { Contact, contactSchema } from '@/schema/Contact';


type State = {
    searchKeyword: string;
    selectedTags: string[];
    contacts: Contact[];
}

type Actions = {
    addContact: (contact: Contact) => void;
    deleteContact: (id: string) => void;
    onSelectContactCheckbox: (id: string) => void;
    setSearchKey: (keyword: string) => void;
    setSelectedTags: (selectedTags: string[]) => void;
    // addCustomer: (customer: Customer) => void;
}

const getContact = () => {
    const contactStr = localStorage.getItem("contacts");
    if (contactStr) {
        const savedRecords: Contact[] = JSON.parse(contactStr);
        const isValid = Array.isArray(savedRecords) && savedRecords.every(record => contactSchema.safeParse(record).success === true);
        if (isValid) {
            return savedRecords;
        }
    }
    return []
}

export const useStore = create<State & Actions>()(
    immer((set) => ({
        searchKeyword: "",
        selectedTags: [],
        contacts: getContact(),
        addContact: (contact) => set((state) => {
            state.contacts.push(contact);
            localStorage.setItem('contacts', JSON.stringify(state.contacts))
        }),
        deleteContact: (id) => set((state) => {
            state.contacts = state.contacts.filter((contact) => contact.id !== id);
            localStorage.setItem('contacts', JSON.stringify(state.contacts))
        }),
        onSelectContactCheckbox: (id) => set((state) => {
            state.contacts = state.contacts.map((contact) => {
                const isSelectedThisContact = contact.id === id
                return {
                    ...contact,
                    isSelected: isSelectedThisContact ? !contact.isSelected : contact.isSelected
                };
            });
        }),
        setSearchKey: (keyword) => set((state) => {
            state.searchKeyword = keyword;
        }),
        setSelectedTags: (selectedTags) => set((state) => {
            state.selectedTags = selectedTags;
        }),
    }))
)