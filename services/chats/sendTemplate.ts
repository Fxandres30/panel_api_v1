type Props = {
  telefono: string;
  template: string;
};

const API_URL =
  "https://efaat.com";

export async function sendTemplate({
  telefono,
  template
}: Props) {

  const response =
    await fetch(

      `${API_URL}/meta/send-template`,

      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          telefono,
          template
        })

      }

    );

  return response.json();

}