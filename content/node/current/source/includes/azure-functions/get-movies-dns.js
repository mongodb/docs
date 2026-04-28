const { app } = require("@azure/functions");
const { MongoClient } = require("mongodb");

// Forces DNS servers explicitly before connecting to MongoDB
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

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