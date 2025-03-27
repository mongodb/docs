import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [{
        '$search': {
            'index': 'null-check-tutorial',
            'compound': {
                'should': [
                    {
                        'wildcard': {
                            'path': 'password', 
                            'query': '*', 
                            'allowAnalyzedField': True
                        }
                    }, {
                        'compound': {
                            'mustNot': {
                                'exists': {
                                    'path': 'password'
                                }
                            }, 
                            'score': {
                                'constant': {
                                    'value': 2
                                }
                            }
                        }
                    }
                ]
            }
        }
    }, {
        '$project': {
            '_id': 0, 
            'name': 1, 
            'password': 1, 
            'score': {
                '$meta': 'searchScore'
            }
        }
    }, {
        '$limit': 5
    }
]
# run pipeline
result = client["sample_mflix"]["users"].aggregate(pipeline)

# print results
for i in result:
    print(i)


