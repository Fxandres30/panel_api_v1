"use client";

import "./ImageMessage.css";

import MessageReaction
from "../../message-reaction/MessageReaction";

import MessageStatus
from "../../message-bubble/MessageStatus";

type Props = {
  message: any;
};

export default function ImageMessage({
  message,
}: Props) {

  const imageSrc =
    message.media_url ||
    (
      message.media_id
        ? `https://efaat.com/media/${message.media_id}`
        : ""
    );

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

  const caption =
    message.mensaje?.trim() || "";

  const mostrarCaption =
    caption &&
    !caption.startsWith("{") &&
    !caption.startsWith("[");

  return (

    <div
      className={
        message.from_me
          ? "image-row right"
          : "image-row left"
      }
    >

      <div className="image-bubble">

        <img
          src={imageSrc}
          alt="Imagen"
          className="chat-image"
        />

        {mostrarCaption && (

          <div className="image-caption">
            {caption}
          </div>

        )}

        <div className="image-footer">

  <span className="image-time">
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