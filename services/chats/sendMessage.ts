type Props = {
  telefono: string;
  mensaje: string;
  archivo?: File | null;
};

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
      "/api/send-message",
      {
        method: "POST",
        body: formData,
      }
    );

  }

  return fetch(
    "/api/send-message",
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