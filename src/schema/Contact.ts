import { ContactProperty } from '@/components/types';
import { z, ZodRawShape } from 'zod';
import parsePhoneNumber from 'libphonenumber-js';

export type ContactFormData = z.infer<
  ReturnType<typeof generateContactFormSchema>
>;

export type ContactFormError = z.inferFlattenedErrors<
  ReturnType<typeof generateContactFormSchema>
>;

function getContactPropertySchema(property: ContactProperty) {
  switch (property.type) {
    case 'email':
      return property.isRequired
        ? z.string().email({ message: 'Invalid email' }).min(1, {
            message: 'Email is required',
          })
        : z
            .string()
            .email({ message: 'Invalid email' })
            .optional()
            .or(z.literal(''));
    case 'multiLineString':
      return property.isRequired
        ? z
            .string()
            .max(200, {
              message: 'This field requires less than 200 characters',
            })
            .min(1, {
              message: 'This field is required',
            })
        : z
            .string()
            .max(200, {
              message: 'This field requires less than 200 characters',
            })
            .optional();
    case 'phoneNumber':
      return property.isRequired
        ? z.string().transform((value, ctx) => validatePhoneNumber(value, ctx))
        : z.string().trim().optional();
    case 'singleLineString':
      return property.isRequired
        ? z.string().min(1, {
            message: 'This field is required',
          })
        : z.string().optional();
    case 'tag':
      return property.isRequired
        ? z.array(z.string()).min(1, {
            message: 'At least one tag is required',
          })
        : z.array(z.string()).optional();
    case 'url':
      return property.isRequired
        ? z.string().url({ message: 'Invalid URL' }).min(1, {
            message: 'This field is required',
          })
        : z
            .string()
            .url({ message: 'Invalid URL' })
            .optional()
            .or(z.literal(''));
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

function validatePhoneNumber(value: string, ctx: z.RefinementCtx) {
  const phoneNumber = parsePhoneNumber(value, {
    defaultCountry: 'HK',
  });

  if (!phoneNumber || !phoneNumber.isValid()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid phone number',
    });
    return z.NEVER;
  }

  return phoneNumber.formatInternational();
}
