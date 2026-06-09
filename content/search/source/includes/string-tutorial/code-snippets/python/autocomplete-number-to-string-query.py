import pymongo
import dns

client = pymongo.MongoClient('<connection-string>')
result = client['sample_airbnb']['airbnb_mat_view'].aggregate([
    {
        '$search': {
            'index': 'date-number-fields-tutorial',
            'compound': {
                'should': [
                    {
                        'autocomplete': {
                            'path': 'maximumNumberOfNights',
                            'query': '3'
                        }
                    }, {
                        'autocomplete': {
                            'path': 'accommodatesNumber',
                            'query': '2'
                        }
                    }
                ]
            }
        }
    }, {
        '$limit': 5
    }, {
        '$project': {
            '_id': 0
        }
    }
])

for i in result:
    print(i)
