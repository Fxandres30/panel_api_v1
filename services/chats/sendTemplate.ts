type Props = {
  telefono: string;
  template: string;
  language: string;
  parameters?: string[];
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL!;

export async function sendTemplate({
  telefono,
  template,
  language,
  parameters = []
}: Props) {

  try {

    const response = await fetch(

      `${API_URL}/meta/send-template`,

      {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          telefono,

          template,

          language,

          parameters

        })

      }

    );

    const data = await response.json();

    if (!response.ok) {

      throw new Error(

        typeof data?.message === "string"
          ? data.message
          : JSON.stringify(data?.message ?? data)

      );

    }

    return data;

  }

  catch (error) {

    console.error(
      "Error enviando plantilla:",
      error
    );

    throw error;

  }

}