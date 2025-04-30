import { z } from 'zod';

const envSchema = z.object({
  MONGODB_URI: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  API_TIMEOUT: z.string().transform(Number),
  CONTACT_FORM_EMAIL: z.string().email(),
  // Add other environment variables
});

export const env = envSchema.parse(process.env);