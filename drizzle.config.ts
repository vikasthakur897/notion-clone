import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.log('🔴DataBase is not Find');
}

export default {
  schema: './src/lib/superbase/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || '',
  },
} satisfies Config;
