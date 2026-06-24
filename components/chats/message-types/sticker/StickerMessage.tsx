"use client";

import "./StickerMessage.css";

type Props = {
  message: any;
};

export default function StickerMessage({
  message,
}: Props) {

  const mediaSrc =
    message.media_id
      ? `https://efaat.com/media/${message.media_id}`
      : message.media_url;

  if (!mediaSrc) {
    return null;
  }

  return (

    <div
      className={
        message.from_me
          ? "sticker-row right"
          : "sticker-row left"
      }
    >

      <img
        src={mediaSrc}
        alt="Sticker"
        className="chat-sticker"
      />

    </div>

  );

}