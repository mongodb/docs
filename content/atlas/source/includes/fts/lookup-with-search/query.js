const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const agg = [
    {
      '$lookup': {
        'from': 'accounts', 
        'localField': 'accounts', 
        'foreignField': 'account_id', 
        'as': 'purchases', 
        'pipeline': [
          {
            '$search': {
              'index': 'lookup-with-search-tutorial', 
              'compound': {
                'must': [
                  {
                    'queryString': {
                      'defaultPath': 'products', 
                      'query': 'products: (CurrencyService AND InvestmentStock)'
                    }
                  }
                ], 
                'should': [
                  {
                    'range': {
                      'path': 'limit', 
                      'gte': 5000, 
                      'lte': 10000
                    }
                  }
                ]
              }
            }
          }, {
            '$project': {
              '_id': 0
            }
          }
        ]
      }
    }, {
      '$limit': 5
    }, {
      '$project': {
        '_id': 0, 
        'address': 0, 
        'birthdate': 0, 
        'username': 0, 
        'tier_and_details': 0
      }
    }
  ];

MongoClient.connect(
  "<connection-string>",
  { useNewUrlParser: true, useUnifiedTopology: true },
  async function (connectErr, client) {
    assert.equal(null, connectErr);
    const coll = client.db("sample_analytics").collection("customers");
    let cursor = await coll.aggregate(agg);
    await cursor.forEach((doc) => console.log(doc));
    client.close();
  }
);
