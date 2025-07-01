import pymongo
import dns

client = pymongo.MongoClient('<connection-string>')
result = client['sample_mflix']['movies'].aggregate([
    {
        '$search': {
            'index': 'partial-match-tutorial',
            'wildcard': {
                'path': 'plot',
                'query': '*new* pur*'
            }
        }
    }, {
        '$limit': 5
    }, {
        '$project': {
            '_id': 0,
            'plot': 1,
            'title': 1
        }
    }
])

for i in result:
    print(i)
