const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const agg = [
  {
    '$search': {
      'compound': {
        'should': [
          {
            'autocomplete': {
              'path': 'title', 
              'query': 'ball', 
              'score': {
                'boost': {
                  'value': 3
                }
              }
            }
          }, {
            'text': {
              'path': 'title', 
              'query': 'ball', 
              'fuzzy': {
                'maxEdits': 1
              }
            }
          }
        ]
      }
    }
  }, {
    '$limit': 15
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
