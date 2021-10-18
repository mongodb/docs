import pymongo
import dns

client = pymongo.MongoClient('<connection-string>')
result = client['sample_mflix']['movies'].aggregate([
    {
        '$search': {
            'text': {
                'query': 'The Count of Monte Cristo',
                'path': {
                    'value': 'title',
                    'multi': 'keywordAnalyzer'
                }
            }
        }
    }, {
        '$project': {
            'title': 1,
            'year': 1,
            '_id': 0
        }
    }
])

for i in result:
    print(i)
