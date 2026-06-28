"use client";

import { useState } from "react";

import {
  X,
  User,
  Phone,
  MessageSquarePlus,
} from "lucide-react";

import "./NewChatModal.css";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (
    telefono: string,
    nombre: string,
    guardar: boolean
  ) => void;
};

export default function NewChatModal({
  open,
  onClose,
  onCreate,
}: Props) {

  const [nombre, setNombre] =
    useState("");

  const [telefono, setTelefono] =
    useState("");

  const [guardar, setGuardar] =
    useState(true);

  if (!open) return null;

  function iniciar() {

    const numero =
      telefono.replace(/\D/g, "");

    if (
      numero.length < 10 ||
      numero.length > 13
    ) {

      alert("Número inválido");

      return;

    }

    onCreate(
      numero,
      nombre.trim(),
      guardar
    );

    setNombre("");
    setTelefono("");
    setGuardar(true);

  }

  return (

    <div
      className="new-chat-overlay"
      onClick={onClose}
    >

      <div
        className="new-chat-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <div className="new-chat-header">

          <h2>

            <MessageSquarePlus
              size={24}
            />

            Nuevo chat

          </h2>

          <button
            onClick={onClose}
          >

            <X size={22}/>

          </button>

        </div>

        <div className="new-chat-body">

          <label>

            <User size={18}/>

            Nombre
            <span>
              (opcional)
            </span>

          </label>

          <input
            value={nombre}
            onChange={(e)=>
              setNombre(
                e.target.value
              )
            }
            placeholder="Ej. Juan Pérez"
          />

          <label>

            <Phone size={18}/>

            Número

          </label>

          <input
            value={telefono}
            onChange={(e)=>
              setTelefono(
                e.target.value
              )
            }
            placeholder="573001234567"
          />

          <div
            className="guardar-contacto"
          >

            <input
              type="checkbox"
              checked={guardar}
              onChange={(e)=>
                setGuardar(
                  e.target.checked
                )
              }
            />

            <span>
              Guardar como contacto
            </span>

          </div>

        </div>

        <div className="new-chat-footer">

          <button
            className="cancelar"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            className="crear"
            onClick={iniciar}
          >

            <MessageSquarePlus
              size={18}
            />

            Iniciar chat

          </button>

        </div>

      </div>

    </div>

  );

}