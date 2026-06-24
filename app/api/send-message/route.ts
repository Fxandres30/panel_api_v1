export async function POST(req: Request) {
  try {
    const contentType =
      req.headers.get("content-type") || "";

    let response;

    if (
      contentType.includes(
        "multipart/form-data"
      )
    ) {
      const formData =
        await req.formData();

      response = await fetch(
        "http://209.38.77.179:3001/meta/send-media",
        {
          method: "POST",
          body: formData,
        }
      );
    } else {
      const body =
        await req.json();

      response = await fetch(
        "http://209.38.77.179:3001/meta/send-message",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(body),
        }
      );
    }

    const data =
      await response.json();

    return Response.json(
      data,
      {
        status: response.status,
      }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: true,
      },
      {
        status: 500,
      }
    );
  }
}