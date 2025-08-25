exports = async function MyCustomEndpoint(request, response) {
  try {
    // 1. Parse data from the incoming request
    if (request.body === undefined) {
      throw new Error(`Request body was not defined.`);
    }
    const body = JSON.parse(request.body.text());
    // 2. Handle the request
    const { insertedId } = await context.services
      .get("mongodb-atlas")
      .db("myDb")
      .collection("myCollection")
      .insertOne({ date: new Date(), requestBody: body });
    // 3. Configure the response
    response.setStatusCode(201);
    // tip: You can also use EJSON.stringify instead of JSON.stringify.
    response.setBody(
      JSON.stringify({
        insertedId,
        message: "Successfully saved the request body",
      })
    );
  } catch (error) {
    response.setStatusCode(400);
    response.setBody(error.message);
  }
};
