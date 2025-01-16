import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [
  {
    '$search': {
      'index': 'sort-tutorial',
      'range': {
        'path': 'awards.wins',
        'gte': 10
      },
      'sort': {
        'awards.wins': -1
      }
    }
  }, {
    '$limit': 5
  }, {
    '$project': {'_id': 0, 'title': 1, 'awards.wins': 1
    }
  }
]

# run pipeline
result = client['sample_mflix']['movies'].aggregate(pipeline)

# print results
for i in result:
    print(i)
