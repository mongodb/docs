import pymongo
import dns

client = pymongo.MongoClient('<connection-string>')
result = client['sample_mflix']['movies'].aggregate([
  {
    '$search': {
      'compound': {
        'filter': [
          {
            'range': {
               'path': 'year',
               'gte': 2013,
               'lte': 2015
            }
          }
        ],
        'should': [
          {
            'text': {
              'query': 'snow',
              'path': 'title',
              'score': {
                'constant': {
                  'value': 5
                }
              }
            }
          }
        ]
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
      'year': 1,
      'score': {
        '$meta': 'searchScore'
      }
    }
  }
])

for i in result:
    print(i)
