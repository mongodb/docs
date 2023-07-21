import datetime
import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [
  {'$search': {
      'index': 'sort-tutorial',
      'compound': {
        'filter': {'wildcard': {'query': 'Summer*', 'path': 'title'}},
        'must': {'near': {
          "path": "released", 
          "origin": datetime.datetime(2014, 4, 18, 0, 0, 0, 0), 
          "pivot": 13149000000
      }}},
      'sort': { 'released': -1 }}},
  {'$limit': 5},
  {'$project': {'_id': 0, 'title': 1, 'released': 1, 'score': {'$meta': 'searchScore'}}}
]

# run pipeline
result = client['sample_mflix']['movies'].aggregate(pipeline)

# print results
for i in result:
    print(i)
