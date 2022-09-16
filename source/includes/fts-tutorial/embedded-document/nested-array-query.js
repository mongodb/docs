const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const agg = [
  {
    '$search': {
      'embeddedDocument': {
        'path': 'teachers',
        'operator': {
          'compound': {
            'must': [
              {
                'embeddedDocument': {
                  'path': 'teachers.classes',
                  'operator': {
                    'compound': {
                      'must': [
                        {
                          'text': {
                            'path': 'teachers.classes.grade',
                            'query': '12th'
                          }
                        }, {
                          'text': {
                            'path': 'teachers.classes.subject',
                            'query': 'science'
                          }
                        }
                      ]
                    }
                  }
                }
              }
            ],
            'should': [
              {
                'text': {
                  'path': 'teachers.last',
                  'query': 'smith'
                }
              }
            ]
          }
        }
      }
    }
  }, {
    '$project': {
      '_id': 1,
      'teachers': 1,
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
    const coll = client.db("local_school_district").collection("schools");
    let cursor = await coll.aggregate(agg);
    await cursor.forEach((doc) => console.log(doc));
    client.close();
  }
);
