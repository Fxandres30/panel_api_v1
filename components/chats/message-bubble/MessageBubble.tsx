import "./MessageBubble.css";

import MessageStatus
from "./MessageStatus";

type Props = {
  mensaje: string;
  fromMe: boolean;
  estado?: string | null;
  createdAt?: string;
};

export default function MessageBubble({
  mensaje,
  fromMe,
  estado,
  createdAt,
}: Props) {

  const hora =
    createdAt
      ? new Date(
          createdAt
        ).toLocaleTimeString(
          "es-CO",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        )
      : "";

  return (

    <div
      className={
        fromMe
          ? "message-row right"
          : "message-row left"
      }
    >

      <div
        className={
          fromMe
            ? "message-bubble mine"
            : "message-bubble other"
        }
      >

        <div className="message-text">
          {mensaje}
        </div>

        <div className="message-footer">

          <span className="message-time">
            {hora}
          </span>

          <MessageStatus
            fromMe={fromMe}
            estado={estado}
          />

        </div>

      </div>

    </div>

  );

}