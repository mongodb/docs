import pymongo
import dns

client = pymongo.MongoClient('<connection-string>')
result = client['sample_mflix']['movies'].aggregate([
  {
    '$search': {
      'index': 'pagination-tutorial', 
      'text': {
        'query': 'tom hanks', 
        'path': 'cast'
      }
    }
  }, {
    '$project': {
      '_id': 0, 
      'title': 1, 
      'cast': 1
    }
  }, {
    '$set': {
      'score': { '$meta': 'searchScore'  }
    }
  }, {
    '$facet': {
      'rows': [
        { '$skip': 10 }, 
        { '$limit': 10 }
      ], 
      'totalRows': [
        { '$replaceWith': '$$SEARCH_META' }, 
        { '$limit': 1 }
      ]
    }
  }, {
    '$set': {
      'totalRows': { '$arrayElemAt': [ '$totalRows', 0 ] }
    }
  }
])

for i in result:
    print(i)
