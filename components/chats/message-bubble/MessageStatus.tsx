import "./MessageStatus.css";

type Props = {
  fromMe: boolean;
  estado?: string | null;
};

export default function MessageStatus({
  fromMe,
  estado,
}: Props) {

  if (!fromMe) {
    return null;
  }

  if (estado === "read") {
    return (
      <span className="status-read">
        ✓✓
      </span>
    );
  }

  if (estado === "delivered") {
    return (
      <span>
        ✓✓
      </span>
    );
  }

  if (estado === "sent") {
    return (
      <span>
        ✓
      </span>
    );
  }

  return null;
}