"use client";

import "./TemplatePicker.css";

type Props = {
  onSelect: (
    template: string
  ) => void;
};

const templates = [

  {
    nombre:
      "bienvenida_efaat_v1",
    descripcion:
      "Mensaje de bienvenida",
    categoria:
      "MARKETING"
  },

  {
    nombre:
      "ganador_info_v1",
    descripcion:
      "Notificar ganador",
    categoria:
      "MARKETING"
  },

  {
    nombre:
      "cobro_recordatorio_numeros",
    descripcion:
      "Recordatorio de pago",
    categoria:
      "UTILITY"
  },

  {
    nombre:
      "acceso_a_grupos_v1",
    descripcion:
      "Enviar acceso a grupos",
    categoria:
      "UTILITY"
  },

  {
    nombre:
      "inicio_conversacion",
    descripcion:
      "Abrir conversación",
    categoria:
      "UTILITY"
  },

  {
    nombre:
      "comprobante_recibido",
    descripcion:
      "Confirmar comprobante",
    categoria:
      "UTILITY"
  },

  {
    nombre:
      "hello_world",
    descripcion:
      "Prueba Meta",
    categoria:
      "UTILITY"
  }

];

export default function TemplatePicker({
  onSelect
}: Props) {

  return (

    <div className="template-picker">

      <div className="template-header">
        📋 Plantillas disponibles
      </div>

      <div className="template-list">

        {templates.map(
          (template) => (

            <button
              key={template.nombre}
              className="template-item"
              onClick={() =>
                onSelect(
                  template.nombre
                )
              }
            >

              <div className="template-top">

                <span className="template-name">
                  {template.nombre}
                </span>

                <span className="template-category">
                  {template.categoria}
                </span>

              </div>

              <div className="template-description">
                {template.descripcion}
              </div>

            </button>

          )
        )}

      </div>

    </div>

  );

}