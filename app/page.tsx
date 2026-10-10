import { Suspense } from "react";
import { getMessages } from "@/db";
import { addMessage } from "./actions";
import { LikeButton } from "./like-button";

export default function Home() {
  return (
    <main>
      <h1>Guestbook</h1>
      <p className="subtitle">
        Next.js + Neon hello world. The same messages are also served as JSON at <a href="/api/messages">/api/messages</a>.
      </p>

      <form action={addMessage}>
        <input name="name" placeholder="Your name" maxLength={50} required />
        <textarea name="body" placeholder="Say hello" maxLength={280} required />
        <button type="submit">Sign the guestbook</button>
      </form>

      <Suspense fallback={<p>Loading messages…</p>}>
        <MessageList />
      </Suspense>
    </main>
  );
}

// A Server Component: it runs only on the server and reads the database directly while rendering.
async function MessageList() {
  const messages = await getMessages();
  if (messages.length === 0) {
    return <p>No messages yet. Be the first!</p>;
  }

  return (
    <ul className="messages">
      {messages.map((m) => (
        <li key={m.id}>
          <div>
            <strong>{m.name}</strong> <time>{m.createdAt.toLocaleString("en-US", { timeZone: "UTC" })} UTC</time>
          </div>
          <p>{m.body}</p>
          <LikeButton id={m.id} initialLikes={m.likes} />
        </li>
      ))}
    </ul>
  );
}
