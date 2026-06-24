"use client";

import { useState, useEffect } from "react";

import "./ChatLayout.css";

import ChatList from "./chat-List/ChatList";
import ChatWindow from "./chat-window/ChatWindow";

export default function ChatLayout() {

  const [selectedChat, setSelectedChat] =
    useState("");

  const [isMobile, setIsMobile] =
    useState(false);

  useEffect(() => {

    const checkScreen = () => {

      setIsMobile(
        window.innerWidth <= 768
      );

    };

    checkScreen();

    window.addEventListener(
      "resize",
      checkScreen
    );

    return () =>
      window.removeEventListener(
        "resize",
        checkScreen
      );

  }, []);

  return (

    <div className="chat-layout">

      {(!isMobile || !selectedChat) && (

        <ChatList
          selected={selectedChat}
          onSelect={setSelectedChat}
        />

      )}

      {(!isMobile || selectedChat) && (

        <ChatWindow
          telefono={selectedChat}
          onBack={() =>
            setSelectedChat("")
          }
        />

      )}

    </div>

  );

}