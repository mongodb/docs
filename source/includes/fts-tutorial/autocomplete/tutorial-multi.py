import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [
    {
        '$search': {
            'index': 'autocomplete-tutorial',
            'compound': {
                'should': [
                    {
                        'autocomplete': {
                            'query': 'pri', 
                            'path': 'title'
                        }
                    }, {
                        'autocomplete': {
                            'query': 'pri', 
                            'path': 'plot'
                        }
                    }
                ], 
                'minimumShouldMatch': 1
            }
        }
    }, 
    {
        '$limit': 5
    }, 
    {
        '$project': {
            '_id': 0, 'title': 1, 'plot': 1
        }
    }
]
# run pipeline
result = client["sample_mflix"]["movies"].aggregate(pipeline)

# print results
for i in result:
    print(i)
