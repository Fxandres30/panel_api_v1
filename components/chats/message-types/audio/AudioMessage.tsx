"use client";

import { useEffect, useRef, useState } from "react";

import "./AudioMessage.css";

type Props = {
  message: any;
};

export default function AudioMessage({
  message,
}: Props) {

  const audioRef =
    useRef<HTMLAudioElement>(null);

  const [duration, setDuration] =
    useState(0);

  const [currentTime, setCurrentTime] =
    useState(0);

  const [playing, setPlaying] =
    useState(false);

  const mediaSrc =
    message.media_id
      ? `https://efaat.com/media/${message.media_id}`
      : message.media_url;

  if (!mediaSrc) {
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

  const formatTime = (
    seconds: number
  ) => {

    const mins =
      Math.floor(seconds / 60);

    const secs =
      Math.floor(seconds % 60);

    return `${mins}:${secs
      .toString()
      .padStart(2, "0")}`;

  };

  const toggleAudio = () => {

    if (!audioRef.current) {
      return;
    }

    if (playing) {

      audioRef.current.pause();

    } else {

      audioRef.current.play();

    }

  };

  useEffect(() => {

    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }

    const loaded = () =>
      setDuration(audio.duration);

    const update = () =>
      setCurrentTime(audio.currentTime);

    const play = () =>
      setPlaying(true);

    const pause = () =>
      setPlaying(false);

    audio.addEventListener(
      "loadedmetadata",
      loaded
    );

    audio.addEventListener(
      "timeupdate",
      update
    );

    audio.addEventListener(
      "play",
      play
    );

    audio.addEventListener(
      "pause",
      pause
    );

    return () => {

      audio.removeEventListener(
        "loadedmetadata",
        loaded
      );

      audio.removeEventListener(
        "timeupdate",
        update
      );

      audio.removeEventListener(
        "play",
        play
      );

      audio.removeEventListener(
        "pause",
        pause
      );

    };

  }, []);

  return (

    <div
      className={
        message.from_me
          ? "audio-row right"
          : "audio-row left"
      }
    >

      <div className="audio-bubble">

        <audio
          ref={audioRef}
          preload="metadata"
          src={mediaSrc}
        />

        <button
          className="audio-play"
          onClick={toggleAudio}
        >
          {playing ? "⏸" : "▶"}
        </button>

        <div className="audio-center">

          <input
            type="range"
            min="0"
            max={duration || 1}
            value={currentTime}
            readOnly
            className="audio-progress"
          />

          <div className="audio-duration">

            {formatTime(currentTime)}
            {" / "}
            {formatTime(duration)}

          </div>

        </div>

        <div className="audio-footer">
          {hora}
        </div>

      </div>

    </div>

  );

}