import { ContactFormData } from "@/schema/Contact";

export const contactPropertyTypes = [
  'singleLineString',
  'multiLineString',
  'phoneNumber',
  'email',
  'url',
  'tag',
] as const;

export type ContactPropertyType = (typeof contactPropertyTypes)[number];

export type ContactProperty = {
  name: string;
  type: ContactPropertyType;
  id: string;
  isRequired:boolean
  isSearchable: boolean;
  isCustomizedField?: boolean;
};

export type Contact = ContactFormData & {
  id: string;
};
