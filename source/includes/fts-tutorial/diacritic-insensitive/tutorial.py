import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [
  {'$search': {
      'compound': {
        'must': [{'wildcard': {'path': 'title', 'query': 'alle*', 'allowAnalyzedField': True}}],
        'should': [{'text': {'query': 'Drama', 'path': 'genres'}}]}}},
  {'$project': {'_id': 0, 'title': 1, 'genres': 1, 'score': {'$meta': 'searchScore'}}}
]

# run pipeline
result = client['sample_mflix']['movies'].aggregate(pipeline)

# print results
for i in result:
    print(i)
