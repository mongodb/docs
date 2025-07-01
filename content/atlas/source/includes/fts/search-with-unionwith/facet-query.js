const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

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
