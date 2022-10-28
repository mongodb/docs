import datetime
import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [
  {'$search': {
      'compound': {
        'filter': [{'near': {'path': 'released', 'origin': datetime.datetime(2012, 6, 25, 0, 0, 0, 0), 'pivot': 7776000000}}],
        'should': [{'wildcard': {'query': 'Prance*', 'path': 'title', 'score': {'constant': {'value': 99}}, 'allowAnalyzedField': True}},
                   {'wildcard': {'query': 'Prince*', 'path': 'title', 'score': {'constant': {'value': 95}}, 'allowAnalyzedField': True}}]
      },
      'returnStoredSource': True}},
  {'$limit': 5},
  {'$project': {'_id': 0, 'title': 1, 'score': {'$meta': 'searchScore'}}}
]

# run pipeline
result = client['sample_mflix']['movies'].aggregate(pipeline)

# print results
for i in result:
    print(i)
