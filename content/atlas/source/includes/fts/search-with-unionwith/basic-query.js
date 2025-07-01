const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const agg = [
    {
      '$search': {
        'text': { 'query': 'Mobile', 'path': 'name'  }
      }
    }, {
      '$project': {
        'score': { '$meta': 'searchScore' }, 
        '_id': 0, 'number_of_employees': 1, 'founded_year': 1, 'name': 1
      }
    }, {
      '$set': { 'source': 'companies' }
    }, {
      '$limit': 3
    }, {
      '$unionWith': {
        'coll': 'inspections', 
        'pipeline': [
          {
            '$search': {
              'text': { 'query': 'Mobile', 'path': 'business_name' }
            }
          }, {
            '$set': { 'source': 'inspections' }
          }, {
            '$project': {
              'score': { '$meta': 'searchScore' }, 
              'source': 1, '_id': 0, 'business_name': 1, 'address': 1
            }
          }, {
            '$limit': 3
          }, {
            '$sort': { 'score': -1 }
          }
        ]
      }
    }
  ];

MongoClient.connect(
  "<connection-string>",
  { useNewUrlParser: true, useUnifiedTopology: true },
  async function (connectErr, client) {
    assert.equal(null, connectErr);
    const coll = client.db("sample_training").collection("companies");
    let cursor = await coll.aggregate(agg);
    await cursor.forEach((doc) => console.log(doc));
    client.close();
  }
);
