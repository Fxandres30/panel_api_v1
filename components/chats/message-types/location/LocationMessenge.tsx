"use client";

import "./LocationMessage.css";

import MessageReaction
from "../../message-reaction/MessageReaction";

type Props = {
  message: any;
};

export default function LocationMessage({
  message,
}: Props) {

  let location: any = null;

  try {

    location =
      JSON.parse(
        message.mensaje
      );

  } catch {

    return null;

  }
return (

  <div
    className={
      message.from_me
        ? "location-row right"
        : "location-row left"
    }
  >

    <a
      href={`https://maps.google.com/?q=${location.latitude},${location.longitude}`}
      target="_blank"
      rel="noreferrer"
      className="location-card"
    >

      <MessageReaction
        reaction={message.reaction}
      />

      <div className="location-title">
        📍 Ubicación
      </div>

      <div className="location-coords">
        {location.latitude}
        <br />
        {location.longitude}
      </div>

    </a>

  </div>

);

}