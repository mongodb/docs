const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const agg = [
  {
    '$search': {
      'index': 'compound-query-custom-score-tutorial',
      'compound': {
        'must': [
          {
            'range': {
              'path': 'year',
              'gte': 2013,
              'lte': 2015
            }
          }
        ],
        'should': [
          {
            'text': {
              'query': 'snow',
              'path': 'title',
              'score': {
                'boost': {
                  'value': 2
                }
              }
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
