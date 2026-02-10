import { z } from 'zod';

/**
 * Environment variable validation schema
 * Validates critical environment variables at build/runtime
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Public app URL (optional for now)
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  
  // Future database configuration
  DATABASE_URL: z.string().optional(),
  
  // Future API keys (examples)
  NEXT_PUBLIC_API_KEY: z.string().optional(),
});

/**
 * Validated environment variables
 * Throws error on invalid configuration
 */
export const env = envSchema.parse(process.env);

/**
 * Type-safe environment variables
 */
export type Env = z.infer<typeof envSchema>;
