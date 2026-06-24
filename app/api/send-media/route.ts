export async function POST(req: Request) {

  const formData =
    await req.formData();

  const response =
    await fetch(
      "http://209.38.77.179:3001/meta/send-media",
      {
        method: "POST",
        body: formData
      }
    );

  const data =
    await response.json();

  return Response.json(
    data,
    {
      status: response.status
    }
  );

}