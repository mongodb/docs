const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const agg = [
  {
    '$search': {
      'index': 'date-number-fields-tutorial',
      'compound': {
        'should': [
          {
            'autocomplete': {
              'path': 'lastScrapedDate',
              'query': '2'
            }
          }, {
            'autocomplete': {
              'path': 'maximumNumberOfNights',
              'query': '1'
            }
          }
        ]
      }
    }
  }, {
    '$limit': 5
  }, {
    '$project': {
      '_id': 0
    }
  }
];

MongoClient.connect(
  "<connection-string>",
  { useNewUrlParser: true, useUnifiedTopology: true },
  async function (connectErr, client) {
    assert.equal(null, connectErr);
    const coll = client.db("sample_airbnb").collection("airbnb_mat_view");
    let cursor = await coll.aggregate(agg);
    await cursor.forEach((doc) => console.log(doc));
    client.close();
  }
);