const { MongoClient } = require("mongodb");

const agg = [
  {'$search': { 'text': {
    'query': 'mobile', 
    'path': 'name', 
    'score': {
      'boost': { 'value': 1.6 }
    }
  }}}, 
  {'$project': {
    'score': { '$meta': 'searchScore' }, 
    '_id': 0, 
    'number_of_employees': 1, 
    'founded_year': 1, 
    'name': 1
  }}, 
  {'$addFields': {
    'source': 'companies', 
    'source_count': '$$SEARCH_META.count.lowerBound'
  }}, 
  {'$limit': 3}, 
  {'$unionWith': {
    'coll': 'inspections', 
    'pipeline': [
      {'$search': {
        'text': { 'query': 'mobile', 'path': 'business_name' }
      }}, 
      {'$project': {
        'score': { '$meta': 'searchScore' }, 
        'business_name': 1, 
        'address': 1, 
        '_id': 0
      }}, 
      {'$limit': 3}, 
      {'$set': {
        'source': 'inspections', 
        'source_count': '$$SEARCH_META.count.lowerBound'
      }}, 
      {'$sort': { 'score': -1 } }
    ]
  }}, 
  {'$facet': {
    'allDocs': [], 
    'totalCount': [
      {'$group': {
        '_id': '$source', 
        'firstCount': {  '$first': '$source_count' }
      }}, 
      {'$project': {
        'totalCount': { '$sum': '$firstCount' }
      }}
    ]
  }}
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
