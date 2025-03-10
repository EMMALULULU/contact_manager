import { z } from 'zod';

export const contactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phones: z.number().min(10000000).max(99999999).min(1),
  emails: z.string().email().min(1),
  categories: z.string().min(1),
  organizationName: z.string().min(1),
  websiteURL: z.string().min(1),
  notes: z.string().max(200).min(1),
  tags: z.array(z.string()).min(1),
});

export type Contact = z.infer<typeof contactSchema>;