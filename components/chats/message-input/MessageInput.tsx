"use client";

import {
  SendHorizontal,
  Paperclip,
  UserRound,
  MessageSquareText,
} from "lucide-react";

import "./MessageInput.css";

import { useRef, useState } from "react";

import TemplatePreview
from "../template-picker/TemplatePreview";

import { sendTemplate }
from "@/services/chats/sendTemplate";

import TemplatePicker from "../template-picker/TemplatePicker";

type Props = {
  telefono: string;

  onSend: (
    mensaje: string,
    file?: File | null
  ) => void | Promise<void>;
};

export default function MessageInput({
  telefono,
  onSend
}: Props) {

  const [mensaje, setMensaje] =
    useState("");

  const [archivo, setArchivo] =
    useState<File | null>(null);

    const [
  showTemplates,
  setShowTemplates
] = useState(false);

const [
  selectedTemplate,
  setSelectedTemplate
] = useState<string | null>(
  null
);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const enviar = () => {

    if (
      !mensaje.trim() &&
      !archivo
    ) {
      return;
    }

    onSend(
      mensaje,
      archivo
    );

    setMensaje("");
    setArchivo(null);

    if (
      fileInputRef.current
    ) {
      fileInputRef.current.value =
        "";
    }

  };

  return (

    <div className="message-input-container">

      {archivo && (

  <div className="file-preview">

    {archivo.type.startsWith("image/") ? (

      <div className="image-preview">

        <img
          src={URL.createObjectURL(archivo)}
          alt="Vista previa"
          className="preview-image"
        />

        <button
          className="remove-preview"
          onClick={() => {
            setArchivo(null);

            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }}
        >
          ✕
        </button>

      </div>

    ) : (

      <div className="file-preview-name">
        <Paperclip size={16} />
        <span>{archivo.name}</span>
      </div>

    )}

  </div>

)}

{showTemplates && (

  <TemplatePicker
  onSelect={(template) => {

    setSelectedTemplate(
      template
    );

    setShowTemplates(
      false
    );

  }}
/>

)}


<TemplatePreview
  template={
    selectedTemplate
  }
 onSend={async (template) => {

  try {

    await sendTemplate({

      telefono,

      template

    });

    setSelectedTemplate(
      null
    );

  }

  catch (error) {

    console.error(
      error
    );

  }

}}
/>


      <div className="message-input-row">

      <button
  className="template-button"
  onClick={() =>
    setShowTemplates(!showTemplates)
  }
>
  <MessageSquareText size={20} />
</button>

        <button
  className="attach-button"
  onClick={() =>
    fileInputRef.current?.click()
  }
>
  <Paperclip size={20} />
</button>

        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={(e) => {

            const file =
              e.target.files?.[0];

            if (file) {
              setArchivo(file);
            }

          }}
        />

        <input
          value={mensaje}
          onChange={(e) =>
            setMensaje(
              e.target.value
            )
          }
          placeholder="Escribe un mensaje..."
          className="message-input"
          onKeyDown={(e) => {

            if (
              e.key === "Enter"
            ) {
              enviar();
            }

          }}
        />

        <button
  className="send-button"
  onClick={enviar}
>
  <SendHorizontal size={20} />
</button>

      </div>

    </div>

  );

}