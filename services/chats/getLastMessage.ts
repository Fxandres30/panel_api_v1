import { Message } from "@/types/chat";

export function getLastMessage(
  telefono: string,
  messages: Message[]
) {
  return messages
    .filter((m) => m.telefono === telefono)
    .sort(
      (a, b) =>
        new Date(b.created_at || "").getTime() -
        new Date(a.created_at || "").getTime()
    )[0];
}