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
                            'path': 'genres',
                            'query': 'comedy',
                            'score': {
                                'boost': {
                                    'value': 9
                                }
                            }
                        }
                    }, {
                        'text': {
                            'path': 'title',
                            'query': 'snow',
                            'score': {
                                'boost': {
                                    'value': 5
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
                            'lte': 2015,
                            'score': {
                                'boost': {
                                    'value': 3
                                }
                            }
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
            'genres': 1,
            'score': {
                '$meta': 'searchScore'
            }
        }
    }
])

for i in result:
    print(i)
