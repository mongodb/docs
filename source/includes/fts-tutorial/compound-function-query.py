import pymongo
import dns

client = pymongo.MongoClient('<connection-string>')
result = client['sample_mflix']['movies'].aggregate([
  {
    '$search': {
      'compound': {
        'must': [
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
                'function': {
                  'add': [
                    {
                      'path': {
                        'value': 'imdb.rating',
                        'undefined': 2
                      }
                    }, 
                    {
                      'score': 'relevance'
                    }
                  ]
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
