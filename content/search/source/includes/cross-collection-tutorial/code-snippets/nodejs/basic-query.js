const { MongoClient } = require("mongodb");

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

async function run() {
  const client = new MongoClient("<connection-string>");
  
  try {
    await client.connect();
    const coll = client.db("sample_training").collection("companies");
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
