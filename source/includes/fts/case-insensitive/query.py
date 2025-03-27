import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [
    {
        '$search': {
            'index': 'case-insensitive-sort', 
            'text': { 'path': 'title', 'query': 'train' }, 
            'sort': { 'title': 1 }
        }
    }, {
        '$limit': 5
    }, {
        '$project': { '_id': 1, 'title': 1, 'awards': 1, 'score': { '$meta': 'searchScore' } }
    }
]

# run pipeline
result = client['sample_mflix']['movies'].aggregate(pipeline)

# print results
for i in result:
    print(i)
