import pymongo

client = pymongo.MongoClient('<connection-string>')
result = client['sample_mflix']['movies'].aggregate([
  {
    '$search': {
      'compound': {
        'must': [
          {
            'text': {
              'query': 'baseball',
              'path': 'plot'
            }
          }
        ],
        'mustNot': [
          {
            'text': {
              'query': ['Comedy', 'Romance'],
              'path': 'genres'
            }
          }
        ]
      },
      'sort': {
          'released': -1
      }
    }
  }, 
  {
    '$limit': 3
  },
  {
    '$project': {
      '_id': 0,           
      'title': 1,
      'plot': 1,
      'genres': 1,
      'released': 1
    }
  }
])

for i in result:
    print(i)
