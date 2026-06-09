const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const agg = [
  {
    $search: {
      index: "default",
      text: {
        path: "title",
        query: "boat",
        synonyms: "transportSynonyms",
      },
    },
  },
  {
    $limit: 10,
  },
  {
    $project: {
      _id: 0,
      title: 1,
      score: { $meta: "searchScore" },
    },
  },
];

// Connection URI
const uri = "<connection-string>";

MongoClient.connect(uri)
  .then((client) => {
    const coll = client.db("sample_mflix").collection("movies");
    return coll
      .aggregate(agg)
      .toArray()
      .then((results) => {
        console.log(results);
        client.close();
        process.exit(0);
      });
  })
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });