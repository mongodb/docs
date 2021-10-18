const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const agg = [
  {
    $search: {
      text: {
        query: "The Count of Monte Cristo",
        path: {
          value: "title",
          multi: "keywordAnalyzer",
        },
      },
    },
  },
  {
    $project: {
      title: 1,
      year: 1,
      _id: 0,
    },
  },
];

MongoClient.connect(
  "<connection-string>",
  { useNewUrlParser: true, useUnifiedTopology: true },
  async function (connectErr, client) {
    assert.equal(null, connectErr);
    const coll = client.db("sample_mflix").collection("movies");
    let cursor = await coll.aggregate(agg);
    await cursor.forEach((doc) => console.log(doc));
    client.close();
  }
);
