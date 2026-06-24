"use client";

import "./VideoMessage.css";

import MessageStatus
from "../../message-bubble/MessageStatus";

type Props = {
  message: any;
};

export default function VideoMessage({
  message,
}: Props) {

  const videoSrc =
    message.media_url ||
    (
      message.media_id
        ? `https://efaat.com/media/${message.media_id}`
        : ""
    );

  if (!videoSrc) {
    return null;
  }

  const hora =
    message.created_at
      ? new Date(
          message.created_at
        ).toLocaleTimeString(
          "es-CO",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        )
      : "";

  return (

    <div
      className={
        message.from_me
          ? "video-row right"
          : "video-row left"
      }
    >

      <div className="video-bubble">

        <video
          controls
          preload="metadata"
          className="chat-video"
        >
          <source src={videoSrc} />
        </video>

        <div className="video-footer">

          <span className="video-time">
            {hora}
          </span>

          <MessageStatus
            fromMe={message.from_me}
            estado={message.estado}
          />

        </div>

      </div>

    </div>

  );

}