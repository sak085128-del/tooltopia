import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import * as schema from "./schema";

declare global {
  // eslint-disable-next-line no-var
  var dbClient: ReturnType<typeof createClient> | undefined;
}

function createClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  return { pool, db: drizzle({ client: pool, schema }) };
}

/** Singleton connection reused across hot serverless invocations. */
export function getDb() {
  if (!globalThis.dbClient) {
    globalThis.dbClient = createClient();
  }
  return globalThis.dbClient.db;
}

export { schema };