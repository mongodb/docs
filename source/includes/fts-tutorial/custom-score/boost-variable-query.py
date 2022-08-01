import pymongo
import dns

client = pymongo.MongoClient('<connection-string>')
result = client['sample_mflix']['movies'].aggregate([
    {
        '$search': {
            'index': 'default',
            'compound': {
                'must': [
                    {
                        'text': {
                            'path': 'title',
                            'query': 'snow',
                            'score': {
                                'function': {
                                    'path': {
                                        'value': 'awards.wins',
                                        'undefined': 2
                                    }
                                }
                            }
                        }
                    }
                ],
                'should': [
                    {
                        'range': {
                            'path': 'year',
                            'gte': 2013,
                            'lte': 2015
                        }
                    }
                ]
            }
        }
    }, {
        '$limit': 10
    }, {
        '$project': {
            '_id': 0,
            'title': 1,
            'year': 1,
            'awards': 1,
            'score': {
                '$meta': 'searchScore'
            }
        }
    }
])

for i in result:
    print(i)
