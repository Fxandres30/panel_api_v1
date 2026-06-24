export async function sendTextMessage(
  telefono: string,
  mensaje: string
) {

  const response =
    await fetch(
      "/api/send-message",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          telefono,
          mensaje
        })
      }
    );

  return response.json();

}