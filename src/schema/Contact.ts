import { ContactProperty } from '@/components/types';
import { z, ZodRawShape } from 'zod';

export type ContactFormData = z.infer<ReturnType<typeof generateContactFormSchema>>;

export type ContactFormError = z.inferFlattenedErrors<
  ReturnType<typeof generateContactFormSchema>
>;

function getContactPropertySchema(property: ContactProperty) {
  switch (property.type) {
    case 'email':
      return property.isRequired
        ? z.string().email()
        : z.string().email().optional();
    case 'multiLineString':
      return property.isRequired
        ? z.string().max(200)
        : z.string().max(200).optional();
    case 'phoneNumber':
      return property.isRequired
        ? z.number().min(10000000).max(99999999)
        : z.number().min(10000000).max(99999999).optional();
    case 'singleLineString':
      return property.isRequired ? z.string() : z.string().optional();
    case 'tag':
      return property.isRequired
        ? z.array(z.string()).min(1, {
            message: 'At least one tag is required',
          })
        : z.array(z.string()).optional();
    case 'url':
      return property.isRequired
        ? z.string().url()
        : z.string().url().optional();
    default:
      return z.unknown();
  }
}

export function generateContactFormSchema(properties: ContactProperty[]) {
  const shape: ZodRawShape = {};

  properties.forEach((property) => {
    const propertySchema = getContactPropertySchema(property);
    shape[property.id] = propertySchema;
  });

  return z.object(shape);
}
