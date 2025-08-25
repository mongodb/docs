exports = async function (payload, response) {
  // Convert the webhook body from BSON to an EJSON object
  const body = EJSON.parse(payload.body.text());

  // Execute application logic, such as working with MongoDB
  if (body.someField) {
    const mdb = context.services.get("mongodb-atlas");
    const requests = mdb.db("demo").collection("requests");
    const { insertedId } = await requests.insertOne({
      someField: body.someField,
    });
    // Respond with an affirmative result
    response.setStatusCode(200);
    response.setBody(`Successfully saved "someField" with _id: ${insertedId}.`);
  } else {
    // Respond with a malformed request error
    response.setStatusCode(400);
    response.setBody(`Could not find "someField" in the webhook request body.`);
  }
  // This return value does nothing because we already modified the response object.
  // If you do not modify the response object and you enable *Respond with Result*,
  // App Services will include this return value as the response body.
  return { msg: "finished!" };
};
