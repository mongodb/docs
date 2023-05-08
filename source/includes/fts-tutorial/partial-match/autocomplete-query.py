import pymongo
import dns

client = pymongo.MongoClient('<connection-string>')
result = client['sample_mflix']['movies'].aggregate([
  {
    '$search': {
      'index': 'partial-match-tutorial',
      'autocomplete': {
        'path': 'plot',
        'query': 'new purchase',
        'tokenOrder': 'any',
        'fuzzy': {
          'maxEdits': 2,
          'prefixLength': 1,
          'maxExpansions': 256
        }
      },
      'highlight': {
        'path': 'plot'
      }
    }
  }, {
    '$limit': 5
  }, {
    '$project': {
      '_id': 0,
      'title': 1,
      'plot': 1,
      'highlights': {
        '$meta': 'searchHighlights'
      }
    }
  }
])

for i in result:
  print(i)
