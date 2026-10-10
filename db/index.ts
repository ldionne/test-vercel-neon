import { drizzle } from "drizzle-orm/neon-http";
import { desc } from "drizzle-orm";
import { io } from "next/cache";
import { messages } from "./schema";

let client: ReturnType<typeof drizzle> | undefined;

// The Neon HTTP driver sends each query as a single HTTP request, which suits serverless functions: there is no
// connection pool to keep alive between invocations. The client is created on first use so that modules importing
// this one (e.g. during `next build`) don't need DATABASE_URL.
export function db() {
  if (!client) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error("DATABASE_URL is not set. Locally, run `vercel env pull .env.local` to fetch it.");
    }
    client = drizzle(url);
  }
  return client;
}

export async function getMessages() {
  // Tells Next.js the data below must be fetched per request, so the build never prerenders (and never queries) it.
  await io();
  return db().select().from(messages).orderBy(desc(messages.createdAt)).limit(50);
}
