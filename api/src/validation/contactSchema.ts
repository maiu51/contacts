import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().optional().nullable(),
});

export type ContactInput = z.infer<typeof contactSchema>;

