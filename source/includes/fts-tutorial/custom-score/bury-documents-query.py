import pymongo
import dns
from bson import ObjectId

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
                  'in': {
                    'value': [ ObjectId('573a13cdf29313caabd83c08'), ObjectId('573a13cef29313caabd873a2') ], 
                    'path': '_id'
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
                  'in': {
                    'value': [ ObjectId('573a13cdf29313caabd83c08'), ObjectId('573a13cef29313caabd873a2') ], 
                    'path': '_id'
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
      'score': { '$meta': 'searchScore' }
    }
  }
])

for i in result:
    print(i)
