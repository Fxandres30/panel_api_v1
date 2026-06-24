"use client";

import "./MessageReaction.css";

type Props = {
  reaction?: string | null;
};

export default function MessageReaction({
  reaction,
}: Props) {

  if (!reaction) return null;

  return (

    <div className="message-reaction">
      {reaction}
    </div>

  );

}