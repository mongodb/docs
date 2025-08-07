import pymongo
import dns

client = pymongo.MongoClient('<connection-string>')
result = client['sample_mflix']['movies'].aggregate([
  {
    '$search': {
      'index': 'default',
      'text': {
        'path': 'title',
        'query': 'automobile',
        'synonyms': 'transportSynonyms'
      }
    }
  }, 
  {
    '$limit': 10
  }, 
  {
    '$project': {
      '_id': 0,
      'title': 1,
      'score': {
        '$meta': 'searchScore'
      }
    }
  }
])

for i in result:
    print(i)
