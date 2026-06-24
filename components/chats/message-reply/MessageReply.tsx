"use client";

import "./MessageReply.css";

type Props = {
  text?: string;
};

export default function MessageReply({
  text,
}: Props) {

  if (!text) return null;

  const preview =
    text.length > 80
      ? text.slice(0, 80) + "..."
      : text;

  return (

    <div className="reply-preview">

      <div className="reply-line" />

      <div className="reply-body">

        <div className="reply-label">
          Respuesta
        </div>

        <div className="reply-text">
          {preview}
        </div>

      </div>

    </div>

  );

}