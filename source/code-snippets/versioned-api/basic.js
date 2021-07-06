// begin serverApiVersion
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
// end serverApiVersion

