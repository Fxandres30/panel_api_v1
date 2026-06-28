"use client";

import { MessageSquarePlus } from "lucide-react";

import "./ChatListHeader.css";

type Props = {
  total: number;
  onNewChat: () => void;
};

export default function ChatListHeader({
  total,
  onNewChat,
}: Props) {

  return (

    <div className="chat-list-header">

      <div className="chat-list-title">

        <h2>Chats</h2>

        <span>
          {total} conversaciones
        </span>

      </div>

      <button
        className="new-chat-button"
        onClick={onNewChat}
        title="Nuevo chat"
      >

        <MessageSquarePlus
          size={22}
          strokeWidth={2.2}
        />

      </button>

    </div>

  );

}