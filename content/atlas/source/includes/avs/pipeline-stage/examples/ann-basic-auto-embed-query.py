import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient("<connection-string>")

# define pipeline
pipeline = [
  {
    '$vectorSearch': {
      'index': 'vector_index', 
      'path': 'fullplot', 
      'query': {
        "text": "young heroes caught in epic struggles between light and darkness"
      }, 
      'numCandidates': 100, 
      'limit': 10
    }
  }, {
    '$project': {
      '_id': 0, 
      'fullplot': 1, 
      'title': 1, 
      'score': {
        '$meta': 'vectorSearchScore'
      }
    }
  }
]

# run pipeline
result = client["sample_mflix"]["movies"].aggregate(pipeline)

# print results
for i in result:
    print(i)
 