"use server";

import { eq, sql } from "drizzle-orm";
import { refresh } from "next/cache";
import { db } from "@/db";
import { messages } from "@/db/schema";

// Server Actions are reachable through direct POST requests, so they must validate their input like any API endpoint.
export async function addMessage(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (!name || !body || name.length > 50 || body.length > 280) {
    throw new Error("Invalid message");
  }

  await db().insert(messages).values({ name, body });
  refresh();
}

export async function likeMessage(id: number) {
  const [row] = await db()
    .update(messages)
    .set({ likes: sql`${messages.likes} + 1` })
    .where(eq(messages.id, id))
    .returning({ likes: messages.likes });
  return row?.likes ?? 0;
}
