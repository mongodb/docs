const { MongoClient } = require("mongodb");

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

async function run() {
  const client = new MongoClient("<connection-string>");
  
  try {
    await client.connect();
    const coll = client.db("sample_analytics").collection("customers");
    const cursor = await coll.aggregate(agg);
    const results = await cursor.toArray();
    console.log(JSON.stringify(results, null, 2));
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
