import assert from "node:assert";
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

const envLocalResult = config({ path: ".env.local" });
if (envLocalResult.error) {
  config();
}

assert(process.env.DATABASE_URL, "DATABASE_URL is not set");

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
