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

    const formData = new FormData();

    formData.append("telefono", telefono);
    formData.append("mensaje", mensaje);
    formData.append("file", archivo);

    console.log("=========== ENVIANDO MEDIA ===========");
    console.log("Nombre:", archivo.name);
    console.log("Tipo:", archivo.type);
    console.log("Tamaño:", archivo.size);

    const response = await fetch(
      "https://efaat.com/meta/send-media",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    console.log("RESPUESTA MEDIA:", data);

    if (!response.ok) {

      throw new Error(
        data.message || "Error enviando archivo"
      );

    }

    return data;

  }

  const response = await fetch(
    "/api/send-message",
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

  console.log("RESPUESTA TEXTO:", data);

  if (!response.ok) {

    throw new Error(
      data.message || "Error enviando mensaje"
    );

  }

  return data;

}