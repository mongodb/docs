import pymongo
import dns

client = pymongo.MongoClient('<connection-string>')
result = client['sample_mflix']['movies'].aggregate([
    {
        '$search': {
            'index': 'synonyms-tutorial',
            'compound': {
                'should': [
                    {
                        'text': {
                            'path': 'title',
                            'query': 'automobile',
                            'synonyms': 'transportSynonyms'
                        }
                    }, {
                        'text': {
                            'path': 'title',
                            'query': 'attire',
                            'synonyms': 'attireSynonyms'
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
            'score': {
                '$meta': 'searchScore'
            }
        }
    }
])

for i in result:
    print(i)
