export async function sendMediaMessage(
  telefono: string,
  mensaje: string,
  archivo: File
) {

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

  const response =
    await fetch(
      "/api/send-media",
      {
        method: "POST",
        body: formData
      }
    );

  return response.json();

}