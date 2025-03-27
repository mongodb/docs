import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [
  {'$search': {
      'index': 'sort-tutorial',
      'compound': {
        'should': [{'wildcard': {'query': 'Prance*', 'path': 'title', 'allowAnalyzedField': True}},
                   {'wildcard': {'query': 'Prince*', 'path': 'title', 'allowAnalyzedField': True}}]
      }, 
      'sort': { 'title': 1 }}},
  {'$limit': 5},
  {'$project': {'_id': 0, 'title': 1, 'score': {'$meta': 'searchScore'}}}
]

# run pipeline
result = client['sample_mflix']['movies'].aggregate(pipeline)

# print results
for i in result:
    print(i)
