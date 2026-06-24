"use client";

import "./ReactionMessage.css";

type Props = {
  message: any;
};

export default function ReactionMessage({
  message,
}: Props) {

  let emoji = "👍";

  try {

    const data =
      JSON.parse(
        message.mensaje
      );

    emoji =
      data.emoji || "👍";

  } catch {}

  return (

    <div
      className={
        message.from_me
          ? "reaction-row right"
          : "reaction-row left"
      }
    >

      <div className="reaction-bubble">
        {emoji}
      </div>

    </div>

  );

}