type Props = {
  telefono: string;
  mensaje: string;
  archivo?: File | null;
};

const API_URL =
  "http://209.38.77.179:3001";

export async function sendMessage({
  telefono,
  mensaje,
  archivo,
}: Props) {

  if (archivo) {

    const formData =
      new FormData();

    formData.append(
      "telefono",
      telefono
    );

    formData.append(
      "mensaje",
      mensaje
    );

    formData.append(
      "file",
      archivo
    );

    return fetch(
      `${API_URL}/meta/send-media`,
      {
        method: "POST",
        body: formData,
      }
    );

  }

  return fetch(
    `${API_URL}/meta/send-message`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        telefono,
        mensaje,
      }),
    }
  );

}