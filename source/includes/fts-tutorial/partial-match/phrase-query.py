import pymongo
import dns

client = pymongo.MongoClient('<connection-string>')
result = client['sample_mflix']['movies'].aggregate([
    {
        '$search': {
            'index': 'partial-match-tutorial',
            'phrase': {
                'path': 'plot',
                'query': 'new purpose',
                'slop': 5
            },
            'highlight': {
                'path': 'plot'
            }
        }
    }, {
        '$limit': 5
    }, {
        '$project': {
            '_id': 0,
            'plot': 1,
            'title': 1,
            'highlights': {
                '$meta': 'searchHighlights'
            }
        }
    }
])

for i in result:
    print(i)
