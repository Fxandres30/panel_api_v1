"use client";

import "./DocumentMessage.css";

type Props = {
  message: any;
};

export default function DocumentMessage({
  message,
}: Props) {

  let data: any = {};

  try {

    data =
      JSON.parse(
        message.mensaje
      );

  } catch {}

  const fileUrl =
    `https://efaat.com/media/${message.media_id}`;

  return (

    <div
      className={
        message.from_me
          ? "document-row right"
          : "document-row left"
      }
    >

      <a

        href={fileUrl}

        target="_blank"

        rel="noreferrer"

        className="document-card"

      >

        <div className="document-icon">
          📄
        </div>

        <div className="document-info">

          <div className="document-name">

            {data.filename ||
              "Documento"}

          </div>

          <div className="document-download">

            Abrir archivo

          </div>

        </div>

      </a>

    </div>

  );

}