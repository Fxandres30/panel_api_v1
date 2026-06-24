"use client";

import "./ContactMessage.css";

type Props = {
  message: any;
};

export default function ContactMessage({
  message,
}: Props) {

  let contacto: any = null;

  try {

    contacto =
      JSON.parse(
        message.mensaje
      )[0];

  } catch {

    return null;

  }

  const nombre =
    contacto?.name?.formatted_name ||
    "Contacto";

  const telefono =
    contacto?.phones?.[0]?.wa_id ||
    contacto?.phones?.[0]?.phone ||
    "";

  const abrirChat = () => {

    window.dispatchEvent(

      new CustomEvent(
        "abrir-chat",
        {
          detail: telefono
        }
      )

    );

  };

  return (

    <div
      className={
        message.from_me
          ? "contact-row right"
          : "contact-row left"
      }
    >

      <div className="contact-card">

        <div className="contact-avatar">
          👤
        </div>

        <div className="contact-info">

          <div className="contact-name">
            {nombre}
          </div>

          <div className="contact-phone">
            {telefono}
          </div>

          <button
            className="contact-button"
            onClick={abrirChat}
          >
            Abrir conversación
          </button>

        </div>

      </div>

    </div>

  );

}