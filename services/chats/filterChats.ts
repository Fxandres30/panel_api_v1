import { Message } from "@/types/chat";
import { getLastMessage } from "./getLastMessage";

export function filterChats(
  chats: string[],
  messages: Message[],
  search: string
) {

  return chats.filter(
    (telefono) => {

      const ultimo =
        getLastMessage(
          telefono,
          messages
        );

      const texto =
        (
          telefono +
          " " +
          (ultimo?.mensaje || "")
        )
          .toLowerCase();

      return texto.includes(
        search.toLowerCase()
      );
    }
  );

}