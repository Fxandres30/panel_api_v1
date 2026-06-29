"use client";

import "./DocumentMessage.css";

import MessageReaction from "../../message-reaction/MessageReaction";
import MessageStatus from "../../message-bubble/MessageStatus";

type Props = {
  message: any;
};

export default function DocumentMessage({
  message,
}: Props) {

  let data: any = {};

  try {
    data = JSON.parse(message.mensaje);
  } catch {
    data = {};
  }

  const fileUrl =
    message.media_url ||
    (
      message.media_id
        ? `https://efaat.com/media/${message.media_id}`
        : "#"
    );

  const caption =
    data.caption ||
    message.caption ||
    message.text ||
    (
      typeof message.mensaje === "string" &&
      !message.mensaje.startsWith("{")
        ? message.mensaje
        : ""
    ) ||
    "";

  const hora =
    message.created_at
      ? new Date(message.created_at).toLocaleTimeString(
          "es-CO",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        )
      : "";

  const fileName =
    data.filename ||
    message.file_name ||
    "Documento";

  const extension =
    fileName
      .split(".")
      .pop()
      ?.toLowerCase() || "";

  const iconos: Record<string, string> = {

    pdf: "📕",

    doc: "📘",
    docx: "📘",

    xls: "📗",
    xlsx: "📗",

    ppt: "🟧",
    pptx: "🟧",

    zip: "🗜️",
    rar: "🗜️",
    "7z": "🗜️",

    txt: "📄",

    csv: "📊",

    apk: "🤖",

    mp3: "🎵",
    wav: "🎵",
    ogg: "🎵",

    mp4: "🎥",
    mov: "🎥",
    avi: "🎥"

  };

  const icono =
    iconos[extension] || "📄";

  const fileSize =
    data.filesize ||
    message.file_size ||
    "";

  return (

    <div
      className={
        message.from_me
          ? "document-row right"
          : "document-row left"
      }
    >

      <div className="document-bubble">

        <a
          href={fileUrl}
          target="_blank"
          rel="noreferrer"
          className="document-card"
        >

          <div className="document-icon">

            {icono}

          </div>

          <div className="document-info">

            <div className="document-name">

              {fileName}

            </div>

            <div className="document-type">

              {extension
                ? extension.toUpperCase()
                : "DOCUMENTO"}

            </div>

            {fileSize && (

              <div className="document-size">

                {fileSize}

              </div>

            )}

            <div className="document-download">

              ⬇ Abrir documento

            </div>

          </div>

        </a>

        {caption && (

          <div className="document-caption">

            {caption}

          </div>

        )}

        <div className="document-footer">

          <span className="document-time">

            {hora}

          </span>

          <MessageStatus
            fromMe={message.from_me}
            estado={message.estado}
          />

        </div>

        <MessageReaction
          reaction={message.reaction}
          className="reaction-document"
        />

      </div>

    </div>

  );

}