"use client";

import { useEffect, useState } from "react";

import "./TemplatePreview.css";

type Template = {
  nombre: string;
  descripcion: string;
  body: string;
  variables: string[];
};

type Props = {
  template: Template | null;
  onSend: (
    template: string,
    parameters: string[]
  ) => void;
};

export default function TemplatePreview({
  template,
  onSend
}: Props) {

  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {

    if (!template) {

      setValues([]);

      return;

    }

    setValues(
      template.variables.map(() => "")
    );

  }, [template]);

  if (!template) {

    return null;

  }

  return (

    <div className="template-preview">

      <div className="template-preview-badge">
        📋 PLANTILLA
      </div>

      <h3 className="template-preview-name">
        {template.nombre}
      </h3>

      <div className="template-preview-body">
        {template.body}
      </div>

      {template.variables.length > 0 && (

        <div className="template-variables">

          {template.variables.map((variable, index) => (

            <input
              key={index}
              className="template-input"
              placeholder={variable}
              value={values[index] ?? ""}
              onChange={(e) => {

                const copy = [...values];

                copy[index] = e.target.value;

                setValues(copy);

              }}
            />

          ))}

        </div>

      )}

      <button
        className="template-send-button"
        onClick={() => {

          const incompletos = values.some(
            value => value.trim() === ""
          );

          if (
            template.variables.length > 0 &&
            incompletos
          ) {

            alert(
              "Debes completar todas las variables."
            );

            return;

          }

          onSend(
            template.nombre,
            values
          );

        }}
      >
        📨 Enviar plantilla
      </button>

    </div>

  );

}