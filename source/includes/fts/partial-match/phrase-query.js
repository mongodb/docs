const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const agg = [
  {
    '$search': {
      'index': 'partial-match-tutorial',
      'phrase': {
        'path': 'plot',
        'query': 'new purpose',
        'slop': 5
      },
      'highlight': {
        'path': 'plot'
      }
    }
  }, {
    '$limit': 5
  }, {
    '$project': {
      '_id': 0,
      'plot': 1,
      'title': 1,
      'highlights': {
        '$meta': 'searchHighlights'
      }
    }
  }
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
