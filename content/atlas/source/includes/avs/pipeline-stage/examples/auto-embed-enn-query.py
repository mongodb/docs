import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient("mongodb://adminUser:adminUserPWD@localhost:27017/?authSource=admin&directConnection=true")

# define pipeline
pipeline = [
  {
    '$vectorSearch': {
      'index': 'vector_index', 
      'path': 'fullplot', 
      'query': {
        "text": "solo traveler discovering new cultures"
      }, 
      'model': 'voyage-4',
      'exact': True, 
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
 