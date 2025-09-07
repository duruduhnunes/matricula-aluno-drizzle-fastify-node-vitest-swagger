
import { defineConfig } from 'drizzle-kit';
import 'dotenv/config'



  if (!process.env.DATABASE_URL){
    throw new Error('DATABASE_URL is not defined in the environment variables');
  }


export default defineConfig({


     dialect: 'postgresql',
     dbCredentials: {
        url: process.env.DATABASE_URL
     },

     out: './drizzle',
     schema: './src/database/schema.ts',
})