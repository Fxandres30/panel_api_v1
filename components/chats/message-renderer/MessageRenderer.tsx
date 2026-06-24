"use client";

import TextMessage from "../message-types/text/TextMessage";
import ImageMessage from "../message-types/image/ImageMessage";
import AudioMessage from "../message-types/audio/AudioMessage";
import StickerMessage from "../message-types/sticker/StickerMessage";
import ContactMessage from "../message-types/contact/ContactMessage";
import LocationMessage from "../message-types/location/LocationMessenge";
import DocumentMessage from "../message-types/document/DocumentMessage";
import ReactionMessage from "../message-types/reaction/ReactionMessage";
import VideoMessage from "../message-types/video/VideoMessage";

type Props = {
  message: any;
};

export default function MessageRenderer({
  message,
}: Props) {

  switch (message.tipo) {

    case "image":
      return <ImageMessage message={message} />;

    case "audio":
      return <AudioMessage message={message} />;

    case "sticker":
      return <StickerMessage message={message} />;

    case "contacts":
      return <ContactMessage message={message} />;

    case "location":
      return <LocationMessage message={message} />;

    case "document":
      return <DocumentMessage message={message} />;

      case "video":
  return ( <VideoMessage message={message} /> );

    case "reaction":
      return <ReactionMessage message={message} />;

    default:
      return <TextMessage message={message} />;

  }

}