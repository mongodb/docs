pconst MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const agg = [
  {
    '$search': {
      'index': 'synonyms-tutorial',
      'compound': {
        'should': [
          {
            'text': {
              'path': 'title',
              'query': 'automobile',
              'synonyms': 'transportSynonyms'
            }
          }, {
            'text': {
              'path': 'title',
              'query': 'attire',
              'synonyms': 'attireSynonyms'
            }
          }
        ]
      }
    }
  }, {
    '$limit': 10
  }, {
    '$project': {
      '_id': 0,
      'title': 1,
      'score': {
        '$meta': 'searchScore'
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
