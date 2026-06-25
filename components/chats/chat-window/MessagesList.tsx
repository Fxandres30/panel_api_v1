"use client";

import "./MessagesList.css";

import MessageRenderer from "../message-renderer/MessageRenderer";

type Props = {
  messages: any[];
};

function obtenerEtiquetaFecha(fecha: string) {
  const date = new Date(fecha);

  const hoy = new Date();

  const inicioHoy = new Date(
    hoy.getFullYear(),
    hoy.getMonth(),
    hoy.getDate()
  );

  const inicioMensaje = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const diferencia = Math.floor(
    (inicioHoy.getTime() - inicioMensaje.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (diferencia === 0) return "Hoy";

  if (diferencia === 1) return "Ayer";

  if (diferencia < 7) {
    return date.toLocaleDateString("es-CO", {
      weekday: "long",
    });
  }

  return date.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function MessagesList({
  messages,
}: Props) {

  const reactions: Record<string, string> = {};

  messages.forEach((msg) => {

    if (msg.tipo === "reaction") {

      try {

        const data = JSON.parse(msg.mensaje);

        reactions[data.message_id] = data.emoji;

      } catch {}

    }

  });

  const visibleMessages = messages
    .filter((msg) => msg.tipo !== "reaction")
    .map((msg) => ({
      ...msg,
      reaction: reactions[msg.wamid] || null,
    }));

  const elementos: React.ReactNode[] = [];

  let ultimaFecha = "";

  visibleMessages.forEach((msg) => {

    const fecha = obtenerEtiquetaFecha(
      msg.created_at
    );

    if (fecha !== ultimaFecha) {

      elementos.push(
        <div
          key={`fecha-${msg.id}`}
          className="date-separator"
        >
          {fecha}
        </div>
      );

      ultimaFecha = fecha;

    }

    elementos.push(
      <MessageRenderer
        key={msg.id}
        message={msg}
      />
    );

  });

  return (
    <div className="messages-list">
      {elementos}
    </div>
  );

}