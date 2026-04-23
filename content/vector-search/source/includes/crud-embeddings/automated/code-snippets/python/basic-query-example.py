import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient("<CONNECTION-STRING>")

# define pipeline
pipeline = [
  {
    '$vectorSearch': {
      'index': 'movies_automated_embeddings',
      'path': 'fullplot',
      'query': "young heroes caught in epic struggles between light and darkness",
      'numCandidates': 100,
      'limit': 10
    },
  },
  {
    '$project': {
      '_id': 0,
      'title': 1,
      'fullplot': 1,
      'score': {'$meta': 'vectorSearchScore'}
    }
  }
]

# run pipeline
result = client["sample_mflix"]["movies"].aggregate(pipeline)

# print results
for i in result:
    print(i)
 