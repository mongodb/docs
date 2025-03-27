const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const agg = [
  {
    '$search': {
      'index': 'partial-match-tutorial',
      'autocomplete': {
        'path': 'plot',
        'query': 'new purchase',
        'tokenOrder': 'any',
        'fuzzy': {
          'maxEdits': 2,
          'prefixLength': 1,
          'maxExpansions': 256
        }
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
      'title': 1,
      'plot': 1,
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