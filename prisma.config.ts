// Prisma configuration for Prisma 7+
// See: https://pris.ly/d/config-datasource
import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Load environment variables from .env.local (for local development)
// On Vercel, environment variables are already available
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
