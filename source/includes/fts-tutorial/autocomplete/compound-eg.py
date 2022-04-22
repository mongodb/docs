import pymongo
import dns

client = pymongo.MongoClient('mongodb+srv://kanchana:passW0rd@sbx.vlfczaf.mongodb-dev.net/myFirstDatabase?retryWrites=true&w=majority')
result = client['sample_mflix']['movies'].aggregate([
    {
        '$search': {
            'compound': {
                'should': [
                    {
                        'autocomplete': {
                            'path': 'title',
                            'query': 'ball',
                            'score': {
                                'boost': {
                                    'value': 3
                                }
                            }
                        }
                    }, {
                        'text': {
                            'path': 'title',
                            'query': 'ball',
                            'fuzzy': {
                                'maxEdits': 1
                            }
                        }
                    }
                ]
            }
        }
    }, {
        '$limit': 15
    }, {
        '$project': {
            '_id': 0,
            'title': 1,
            'score': {
                '$meta': 'searchScore'
            }
        }
    }
])

for i in result:
    print(i)
