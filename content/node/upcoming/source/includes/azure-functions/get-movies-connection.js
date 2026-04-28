const { app } = require("@azure/functions");
const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(
  process.env.MONGODB_ATLAS_URI
);

app.http("GetMovies", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    // Query logic added in the next step
  }
});
