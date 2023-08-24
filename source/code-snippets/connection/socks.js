import { MongoClient } from "mongodb";

// start-socks
const uri = "<connection string uri>";

const socksOptions = {
  proxyHost: "<host>",
  proxyPort: 1080,
  proxyUsername: "<username>",
  proxyPassword: "<password>",
};

const client = new MongoClient(uri, socksOptions);
// end-socks

async function run() {
  try {
    const db = client.db("myDB");
    const myColl = db.collection("myColl");
    const doc = await myColl.findOne({});
    console.log(doc);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
