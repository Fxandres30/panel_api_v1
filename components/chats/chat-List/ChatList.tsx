"use client";

import { useEffect, useState } from "react";

import "./ChatList.css";

import ChatListHeader from "./ChatListHeader";
import ChatSearch from "./ChatSearch";
import ChatItem from "./ChatItem";

import { supabase } from "@/lib/supabase";

type ChatResumen = {
  telefono: string;
  ultimoMensaje: string;
  hora: string;
  noLeidos: number;
  fromMe: boolean;
  estado?: string | null;
};

type Props = {
  selected: string;
  onSelect: (
    telefono: string
  ) => void;
};

function obtenerPreview(
  msg: any
) {

  if (msg.tipo === "image") {
    return "🖼️ Foto";
  }

  if (msg.tipo === "video") {
    return "🎥 Video";
  }

  if (msg.tipo === "audio") {
    return "🎤 Audio";
  }

  if (msg.tipo === "document") {
    return "📄 Documento";
  }

  if (msg.tipo === "location") {
    return "📍 Ubicación";
  }

  if (msg.tipo === "contacts") {
    return "👤 Contacto";
  }

  if (msg.tipo === "reaction") {

    try {

      const data =
        JSON.parse(
          msg.mensaje
        );

      return `${data.emoji} Reacción`;

    }

    catch {

      return "❤️ Reacción";

    }

  }

  return (
    msg.mensaje ||
    "Sin mensaje"
  );

}

export default function ChatList({
  selected,
  onSelect,
}: Props) {

  const [search, setSearch] =
    useState("");

  const [chats, setChats] =
    useState<ChatResumen[]>([]);

  useEffect(() => {

  cargarChats();

  const channel =
    supabase
      .channel(
        "chat-list-realtime"
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages"
        },
        () => {

          cargarChats();

        }
      )
      .subscribe();

  return () => {

    supabase.removeChannel(
      channel
    );

  };

}, []);

  async function cargarChats() {

    const { data, error } =
      await supabase
        .from("messages")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    if (error) {

      console.error(error);

      return;

    }

    const noLeidos =
      new Map<
        string,
        number
      >();

    data.forEach((msg: any) => {

      if (
        !msg.from_me &&
        !msg.leido
      ) {

        noLeidos.set(

          msg.telefono,

          (
            noLeidos.get(
              msg.telefono
            ) || 0
          ) + 1

        );

      }

    });

    const mapa =
      new Map<
        string,
        ChatResumen
      >();

    data.forEach(
      (msg: any) => {

        if (
          !mapa.has(
            msg.telefono
          )
        ) {

          mapa.set(
            msg.telefono,
            {

              telefono:
                msg.telefono,

              ultimoMensaje:
                obtenerPreview(
                  msg
                ),

              hora:
                msg.created_at
                  ? new Date(
                      msg.created_at
                    ).toLocaleTimeString(
                      "es-CO",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )
                  : "",

              noLeidos:
                noLeidos.get(
                  msg.telefono
                ) || 0,

              fromMe:
                msg.from_me,

              estado:
                msg.estado

            }
          );

        }

      }
    );

    setChats(
      Array.from(
        mapa.values()
      )
    );

  }

  const filteredChats =
    chats.filter(
      (chat) => {

        const texto =
          (
            chat.telefono +
            " " +
            chat.ultimoMensaje
          ).toLowerCase();

        return texto.includes(
          search.toLowerCase()
        );

      }
    );

  return (

    <div className="chat-list">

      <ChatListHeader
        total={
          filteredChats.length
        }
        onNewChat={() =>
          alert(
            "Nuevo chat"
          )
        }
      />

      <ChatSearch
        search={search}
        setSearch={setSearch}
      />

      <div className="chat-list-body">

        {filteredChats.map(
          (chat) => (

            <ChatItem
              key={
                chat.telefono
              }
              telefono={
                chat.telefono
              }
              ultimoMensaje={
                chat.ultimoMensaje
              }
              hora={
                chat.hora
              }
              noLeidos={
                chat.noLeidos
              }
              fromMe={
                chat.fromMe
              }
              estado={
                chat.estado
              }
              selected={
                selected ===
                chat.telefono
              }
              onSelect={() =>
                onSelect(
                  chat.telefono
                )
              }
            />

          )
        )}

      </div>

    </div>

  );

}