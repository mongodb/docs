import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [
  {'$search': {
      'index': 'compound-query-custom-score-tutorial',
      'compound': {
        'must': [{'range': {'path': 'year', 'gte': 2013, 'lte': 2015}}],
        'should': [{'text': {'query': 'snow', 'path': 'title', 'score': {'boost': {'value': 2}}}}]}, 
      'highlight': {'path': 'title'}}},
  {'$limit': 10}, 
  {'$project': {'_id': 0, 'title': 1, 'year': 1, 'score': {'$meta': 'searchScore'}, "highlights": {"$meta": "searchHighlights"}}}
]

# run pipeline
result = client['sample_mflix']['movies'].aggregate(pipeline)

# print results
for i in result:
    print(i)
