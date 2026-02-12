import assert from "node:assert";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";

const envLocalResult = config({ path: ".env.local" });
if (envLocalResult.error) {
  config();
}

assert(process.env.DATABASE_URL, "DATABASE_URL is not set");

const db = drizzle(process.env.DATABASE_URL);

export default db;
