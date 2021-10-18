import pymongo
import dns

client = pymongo.MongoClient('<connection-string>')
result = client['sample_mflix']['movies'].aggregate([
    {
        '$search': {
            'compound': {
                'must': [
                    {
                        'text': {
                            'query': [
                                'Hawaii', 'Alaska'
                            ],
                            'path': 'plot'
                        }
                    }, {
                        'regex': {
                            'query': '([0-9]{4})',
                            'path': 'plot',
                            'allowAnalyzedField': True
                        }
                    }
                ],
                'mustNot': [
                    {
                        'text': {
                            'query': [
                                'Comedy', 'Romance'
                            ],
                            'path': 'genres'
                        }
                    }, {
                        'text': {
                            'query': [
                                'Beach', 'Snow'
                            ],
                            'path': 'title'
                        }
                    }
                ]
            }
        }
    }, {
        '$project': {
            'title': 1,
            'plot': 1,
            'genres': 1,
            '_id': 0
        }
    }
])

for i in result:
    print(i)
