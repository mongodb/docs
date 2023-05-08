import datetime
import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [
  {'$search': {
      'index': 'sort-tutorial',
      'near': {
        'path': 'year', 
        'origin': 2015,
        'pivot': 5
        }
    }},
  {'$limit': 5},
  {'$project': {'title': 1, 'released': 1, 'year': 1 }}
]

# run pipeline
result = client['sample_mflix']['movies'].aggregate(pipeline)

# print results
for i in result:
    print(i)
