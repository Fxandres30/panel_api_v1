"use client";

import "./MessagesList.css";

import MessageRenderer
from "../message-renderer/MessageRenderer";

type Props = {
  messages: any[];
};

export default function MessagesList({
  messages,
}: Props) {

  const reactions: Record<
    string,
    string
  > = {};

  messages.forEach((msg) => {

    if (
      msg.tipo === "reaction"
    ) {

      try {

        const data =
          JSON.parse(
            msg.mensaje
          );

        reactions[
          data.message_id
        ] = data.emoji;

      }

      catch {}

    }

  });

  const visibleMessages =
    messages
      .filter(
        (msg) =>
          msg.tipo !==
          "reaction"
      )
      .map((msg) => ({

        ...msg,

        reaction:
          reactions[
            msg.wamid
          ] || null,

      }));

  return (

    <div className="messages-list">

      {visibleMessages.map(
        (msg) => (

          <MessageRenderer
            key={msg.id}
            message={msg}
          />

        )
      )}

    </div>

  );

}