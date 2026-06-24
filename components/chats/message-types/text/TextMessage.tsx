"use client";

import "./TextMessage.css";

import MessageReaction
from "../../message-reaction/MessageReaction";

import MessageReply
from "../../message-reply/MessageReply";

import MessageStatus
from "../../message-bubble/MessageStatus";

type Props = {
  message: any;
};

export default function TextMessage({
  message,
}: Props) {

  const hora =
    message.created_at
      ? new Date(
          message.created_at
        ).toLocaleTimeString(
          "es-CO",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        )
      : "";

  const mostrarReply =
    message.reply_text &&
    message.reply_text !==
      message.mensaje;

  return (

    <div
      className={
        message.from_me
          ? "text-row right"
          : "text-row left"
      }
    >

      <div
        className={
          message.from_me
            ? "text-bubble mine"
            : "text-bubble other"
        }
      >

        {mostrarReply && (

          <MessageReply
            text={message.reply_text}
          />

        )}

        <div className="text-content">
          {message.mensaje}
        </div>

        <div className="text-footer">

          <span className="text-time">
            {hora}
          </span>

          <MessageStatus
            fromMe={message.from_me}
            estado={message.estado}
          />

        </div>

        <MessageReaction
          reaction={message.reaction}
        />

      </div>

    </div>

  );

}