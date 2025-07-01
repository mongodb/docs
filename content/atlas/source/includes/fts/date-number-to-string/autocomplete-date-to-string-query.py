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
                            'path': 'lastScrapedDate',
                            'query': '2'
                        }
                    }, {
                        'autocomplete': {
                            'path': 'maximumNumberOfNights',
                            'query': '1'
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
