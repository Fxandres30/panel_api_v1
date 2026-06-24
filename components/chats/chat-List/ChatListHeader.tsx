"use client";

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

  <div>

    <h2>Chats</h2>

    <span>
      {total} conversaciones
    </span>

  </div>

  <button
    onClick={onNewChat}
    title="Nuevo chat"
  >
    +
  </button>

</div>
  );

}