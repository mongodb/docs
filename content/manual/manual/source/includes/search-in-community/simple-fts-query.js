const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const agg = [
  {
    $search: {
      text: {
        query: "baseball",
        path: "plot",
      },
    },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      title: 1,
      plot: 1,
    },
  },
];

MongoClient.connect("<connection-string>").then(async function (client) {
   const coll = client.db("sample_mflix").collection("movies");
   const cursor = coll.aggregate(agg);
   for await (const doc of cursor) {
     console.log(doc)
   }
   await client.close();
 });
