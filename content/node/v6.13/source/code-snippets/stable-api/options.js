// Stable API - with options

// begin serverApiVersion
const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace the placeholders in the connection string uri with your credentials
const uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

/* Create a client with options to specify Stable API Version 1, return
errors for commands outside of the API version, and raise exceptions
for deprecated commands */
const client = new MongoClient(uri,
    {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
// end serverApiVersion

