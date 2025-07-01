import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [{
    '$search': {
        'index': 'null-check-tutorial',
        'compound': {
            'must': {
                'exists': {
                    'path': 'password'
                }
            },
            'mustNot': {
                'wildcard': {
                    'path': 'password', 
                    'query': '*', 
                    'allowAnalyzedField': True
                }
            }
        }
    }
}]
# run pipeline
result = client["sample_mflix"]["users"].aggregate(pipeline)

# print results
for i in result:
    print(i)
