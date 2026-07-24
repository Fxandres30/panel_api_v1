type Props = {
  telefono: string;
  mensaje: string;
  archivo?: File | null;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function sendMessage({
  telefono,
  mensaje,
  archivo,
}: Props) {

  if (archivo) {

    const formData = new FormData();

    formData.append("telefono", telefono);
    formData.append("mensaje", mensaje);
    formData.append("file", archivo);

    const response = await fetch(
      `${API_URL}/meta/send-media`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Error enviando archivo"
      );
    }

    return data;
  }

  const response = await fetch(
    `${API_URL}/meta/send-message`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        telefono,
        mensaje,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Error enviando mensaje"
    );
  }

  return data;
}