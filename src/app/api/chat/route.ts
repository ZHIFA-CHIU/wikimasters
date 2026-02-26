import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { stackServerApp } from "@/stack/server";

export async function POST(req: Request) {
  const user = await stackServerApp.getUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: "google/gemini-3-flash",
    messages: await convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}
