"use client";

import "./ChatItem.css";

type Props = {
  telefono: string;
  ultimoMensaje?: string;
  hora?: string;
  noLeidos?: number;
  fromMe?: boolean;
  estado?: string | null;
  selected: boolean;
  onSelect: () => void;
};

export default function ChatItem({
  telefono,
  ultimoMensaje,
  hora,
  noLeidos = 0,
  fromMe = false,
  estado,
  selected,
  onSelect,
}: Props) {

  function renderEstado() {

    if (!fromMe) {
      return null;
    }

    if (estado === "read") {
      return (
        <span className="chat-check read">
          ✓✓
        </span>
      );
    }

    if (estado === "delivered") {
      return (
        <span className="chat-check">
          ✓✓
        </span>
      );
    }

    if (estado === "sent") {
      return (
        <span className="chat-check">
          ✓
        </span>
      );
    }

    return null;

  }

  return (

    <div
      className={
        selected
          ? "chat-item selected"
          : "chat-item"
      }
      onClick={onSelect}
    >

      <div className="chat-avatar">
  {telefono?.slice(-2) || "--"}
</div>

      <div className="chat-info">

        <div className="chat-top">

          <div className="chat-phone">
            {telefono}
          </div>

          <div className="chat-time">
            {hora}
          </div>

        </div>

        <div className="chat-bottom">

          <div className="chat-last-message">

            {renderEstado()}

            <span>
              {ultimoMensaje || "Sin mensajes"}
            </span>

          </div>

          {noLeidos > 0 && (

            <div className="chat-unread">

              {noLeidos}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}