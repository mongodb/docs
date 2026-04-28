const { app } = require("@azure/functions");
const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(
  process.env.MONGODB_ATLAS_URI
);

app.http("GetMovies", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    // begin-handler
    try {
      const database = mongoClient.db(
        process.env.MONGODB_ATLAS_DATABASE
      );
      const collection = database.collection(
        process.env.MONGODB_ATLAS_COLLECTION
      );
      const results = await collection
        .find({})
        .limit(10)
        .toArray();
      return { jsonBody: results };
    } catch (error) {
      return {
        status: 500,
        jsonBody: { message: "Internal server error." }
      };
    }
    // end-handler
  }
});
