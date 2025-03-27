import pymongo
import dns

client = pymongo.MongoClient('<connection-string>')
result = client['sample_mflix']['movies'].aggregate([
  {
    '$search': {
      'index': 'compound-query-custom-score-tutorial',
      'compound': {
        'should': [
          {
            'compound': {
              'must': [
                {
                  'text': {
                    'query': 'ghost', 
                    'path': [ 'plot', 'title' ]
                  }
                }
              ], 
              'mustNot': [
                {
                  'text': {
                    'query': 'Comedy', 
                    'path': [ 'genres' ]
                  }
                }
              ]
            }
          }, {
            'compound': {
              'must': [
                {
                  'text': {
                    'query': 'ghost', 
                    'path': [ 'plot', 'title' ]
                  }
                }
              ], 
              'filter': [
                {
                  'text': {
                    'query': 'Comedy', 
                    'path': [ 'genres' ]
                  }
                }
              ], 
              'score': { 'boost': { 'value': 0.5 } }
            }
          }
        ]
      }
    }
  }, {
    '$limit': 10
  }, {
    '$project': {
      '_id': 1, 
      'title': 1, 
      'plot': 1, 
      'genres': 1, 
      'score': { '$meta': 'searchScore' }
    }
  }
])

for i in result:
    print(i)
