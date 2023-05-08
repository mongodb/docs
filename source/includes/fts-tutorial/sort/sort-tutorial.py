import datetime
import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [
  {'$search': {
      'index': 'sort-tutorial',
      'autocomplete': {
        'path': 'title', 
        'query': 'Happy'
        },
        'returnStoredSource': True
    }},
  {'$limit': 5},
  {'$sort': {'title': -1}}
]

# run pipeline
result = client['sample_mflix']['movies'].aggregate(pipeline)

# print results
for i in result:
    print(i)
