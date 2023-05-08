const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const agg = [
  {
    '$search': {
      'index': 'compound-query-custom-score-tutorial',
      'compound': {
        'must': [
          {
            'text': {
              'path': 'genres',
              'query': 'comedy',
              'score': {
                'boost': {
                  'value': 9
                }
              }
            }
          }, {
            'text': {
              'path': 'title',
              'query': 'snow',
              'score': {
                'boost': {
                  'value': 5
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
              'lte': 2015,
              'score': {
                'boost': {
                  'value': 3
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
      'genres': 1,
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
