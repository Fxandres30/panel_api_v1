"use client";

import {
  ArrowLeft,
  MoreVertical,
} from "lucide-react";

import { supabase }
from "@/lib/supabase";

import { useEffect, useState } from "react";

import "./ChatWindow.css";

import { getMessages }
from "@/services/chats/getMessages";

import { sendMessage }
from "@/services/chats/sendMessage";

import MessagesList
from "./MessagesList";

import MessageInput
from "../message-input/MessageInput";

type Message = {
  id: string;
  mensaje?: string;
  telefono: string;
  from_me?: boolean;
  estado?: string;
  created_at?: string;
};

type Props = {
  telefono?: string;
  onBack?: () => void;
};

export default function ChatWindow({
  telefono,
  onBack,
}: Props) {

  const [messages, setMessages] =
    useState<Message[]>([]);

  useEffect(() => {

  if (!telefono) {

    setMessages([]);

    return;

  }

  cargarMensajes();

  const channel =
    supabase
      .channel(
        `chat-${telefono}`
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages"
        },
        () => {

          cargarMensajes();

        }
      )
      .subscribe();

  return () => {

    supabase.removeChannel(
      channel
    );

  };

}, [telefono]);

  async function cargarMensajes() {

  if (!telefono) return;

  try {

    const data =
      await getMessages(
        telefono
      );

    setMessages(data);

    await supabase
      .from("messages")
      .update({
        leido: true
      })
      .eq(
        "telefono",
        telefono
      )
      .eq(
        "from_me",
        false
      )
      .eq(
        "leido",
        false
      );

  }

  catch (error) {

    console.error(error);

  }

}

  async function handleSend(
    mensaje: string,
    archivo?: File | null
  ) {

    if (!telefono) return;

    try {

      await sendMessage({

        telefono,
        mensaje,
        archivo

      });

      await cargarMensajes();

    }

    catch (error) {

      console.error(error);

    }

  }

  if (!telefono) {

    return (
      <div className="chat-window-empty">
        Selecciona una conversación
      </div>
    );

  }

  const [fotoPerfil, setFotoPerfil] =
  useState<string | null>(null);

  return (

    <div className="chat-window">

      <div className="chat-header">

  <button
    className="back-button"
    onClick={onBack}
  >
    <ArrowLeft size={22}/>
  </button>

  <div className="chat-header-avatar">

  {fotoPerfil ? (

    <img
      src={fotoPerfil}
      alt=""
      className="chat-avatar-image"
    />

  ) : (

    <span>
      {telefono.slice(-2)}
    </span>

  )}

</div>

  <div className="chat-header-info">

    <div className="chat-header-name">
      {telefono}
    </div>

    <div className="chat-header-status">
      Conversación activa
    </div>

  </div>

  <button className="info-button">
    <MoreVertical size={20}/>
</button>

</div>

      <MessagesList
        messages={messages}
      />

      <MessageInput
  telefono={telefono}
  onSend={handleSend}
/>

    </div>

  );

}