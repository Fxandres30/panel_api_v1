"use client";

import "./MessageReaction.css";

type Props = {
  reaction?: string | null;
  className?: string;
};

export default function MessageReaction({
  reaction,
  className = "",
}: Props) {

  if (!reaction) return null;

  return (
    <div className={`message-reaction ${className}`}>
      {reaction}
    </div>
  );

}