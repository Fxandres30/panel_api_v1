"use client";

import "./TemplatePreview.css";

type Props = {
  template: string | null;
  onSend: (
    template: string
  ) => void;
};

export default function TemplatePreview({
  template,
  onSend
}: Props) {

  if (!template) {
    return null;
  }

  return (

    <div className="template-preview">

      <div className="template-preview-badge">
        📋 PLANTILLA
      </div>

      <div className="template-preview-name">
        {template}
      </div>

      <div className="template-preview-text">

        Vista previa de la plantilla seleccionada.
        Próximamente aquí aparecerán las variables,
        encabezados, botones y contenido real
        cargado desde Meta.

      </div>

      <button
        className="template-send-button"
        onClick={() =>
          onSend(template)
        }
      >
        📨 Enviar plantilla
      </button>

    </div>

  );

}