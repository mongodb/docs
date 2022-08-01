const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const agg = [
  {
    '$search': {
      'index': 'default',
      'compound': {
        'must': [
          {
            'text': {
              'path': 'title',
              'query': 'snow',
              'score': {
                'function': {
                  'path': {
                    'value': 'awards.wins',
                    'undefined': 2
                  }
                }
              }
            }
          }
        ],
        'should': [
          {
            'range': {
              'path': 'year',
              'gte': 2013,
              'lte': 2015
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
      'year': 1,
      'awards': 1,
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
