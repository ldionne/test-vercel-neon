import { getMessages } from "@/db";

// A Route Handler: the Next.js equivalent of a Fastify route. Each exported function handles one HTTP method.
export async function GET() {
  return Response.json(await getMessages());
}
