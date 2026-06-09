import pymongo
import dns

client = pymongo.MongoClient('<connection-string>')
result = client['sample_training']['companies'].aggregate([
  {
    '$search': {
      'text': { 'query': 'Mobile', 'path': 'name' }
    }
  }, {
    '$project': {
      'score': { '$meta': 'searchScore' }, '_id': 0, 'number_of_employees': 1, 'founded_year': 1, 'name': 1
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
            'score': { '$meta': 'searchScore' }, 'source': 1, '_id': 0, 'business_name': 1, 'address': 1
          }
        }, {
          '$limit': 3
        }, {
          '$sort': { 'score': -1 }
        }
      ]
    }
  }
])

for i in result:
    print(i)
