const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const agg = [
  {
    '$search': {
      'index': 'pagination-tutorial', 
      'text': {
        'query': 'tom hanks', 
        'path': 'cast'
      }
    }
  }, {
    '$project': {
      '_id': 0, 
      'title': 1, 
      'cast': 1
    }
  }, {
    '$set': {
      'score': { '$meta': 'searchScore' }
    }
  }, {
    '$facet': {
      'rows': [
          { '$skip': 10 }, 
          { '$limit': 10 }
        ], 
      'totalRows': [
        { '$replaceWith': '$$SEARCH_META' }, 
        { '$limit': 1 }
      ]
    }
  }, {
    '$set': {
      'totalRows': { '$arrayElemAt': [ '$totalRows', 0 ] }
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
