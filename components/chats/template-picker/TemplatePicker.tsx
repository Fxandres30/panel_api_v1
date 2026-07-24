"use client";

import { useEffect, useMemo, useState } from "react";

import "./TemplatePicker.css";

import { Template } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

type Props = {
  onSelect: (template: Template) => void;
};

export default function TemplatePicker({
  onSelect
}: Props) {

  const [search, setSearch] = useState("");

  const [templates, setTemplates] = useState<Template[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    cargarTemplates();

  }, []);

  async function cargarTemplates() {

    try {

      console.log("API_URL:", API_URL);
      console.log("URL:", `${API_URL}/meta/templates`);

      const res = await fetch(
        `${API_URL}/meta/templates`
      );

      console.log("STATUS:", res.status);

      const data = await res.json();

      console.log("DATA:", data);

      setTemplates(data);

    }

    catch (err) {

      console.error("ERROR:", err);

    }

    finally {

      setLoading(false);

    }

  }

  const filtered = useMemo(() => {

    return templates.filter((t) =>

      t.nombre
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [templates, search]);

  return (

    <div className="template-picker">

      <input
        className="template-search"
        placeholder="Buscar plantilla..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {loading && (

        <div className="template-loading">
          Cargando plantillas...
        </div>

      )}

      {!loading && filtered.length === 0 && (

        <div className="template-loading">
          No hay plantillas disponibles.
        </div>

      )}

      {!loading && filtered.map((template) => (

        <div
          key={template.nombre}
          className="template-item"
          onClick={() => onSelect(template)}
        >

          <div className="template-name">
            {template.nombre}
          </div>

          <div className="template-description">
            {template.descripcion}
          </div>

        </div>

      ))}

    </div>

  );

}