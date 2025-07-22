// Stable API - no options

// begin serverApiVersion
const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace the placeholders in the connection string uri with your credentials
const uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

// Create a client with options to specify Stable API Version 1
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
// end serverApiVersion