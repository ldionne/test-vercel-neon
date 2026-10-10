"use client";

import { useState, useTransition } from "react";
import { likeMessage } from "./actions";

export function LikeButton({ id, initialLikes }: { id: number; initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [pending, startTransition] = useTransition();

  return (
    <button
      className="like"
      disabled={pending}
      onClick={() => startTransition(async () => setLikes(await likeMessage(id)))}
    >
      ♥ {likes}
    </button>
  );
}
