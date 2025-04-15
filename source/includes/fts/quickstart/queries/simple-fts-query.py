import pymongo

client = pymongo.MongoClient('<connection-string>')
result = client['sample_mflix']['movies'].aggregate([
  {
    '$search': 
     {
        'text': {
          'query': 'baseball',
          'path': 'plot'
        }
     }
  }, 
  {
    '$limit': 3
  }, 
  {
    '$project': {
       '_id': 0,
       'title': 1,
       'plot': 1
    }
  }
])

for i in result:
    print(i)
