import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient("<connection-string>")

# define pipeline
pipeline = [
  {
    '$vectorSearch': {
      'index': 'vector_index', 
      'path': 'fullplot', 
      'filter': {
        '$and': [
          {
            'year': {
              '$gt': 1980
            }
          }, 
          {
            'year': {
              '$lt': 2020
            }
          },
          {  
            'genres': {  
              '$in': ['Action', 'Adventure', 'Family']
            }  
          } 
        ]
      }, 
      'query': {
        'text': 'epic fantasy journey with reluctant heroes'
      }, 
      'model': 'voyage-4',
      'numCandidates': 100, 
      'limit': 10
    }
  }, {
    '$project': {
      '_id': 0, 
      'title': 1, 
      'fullplot': 1, 
      'year': 1, 
      'genres': 1,
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
 