import pymongo
import dns

client = pymongo.MongoClient('<connection-string>')
result = client['sample_airbnb']['airbnb_mat_view'].aggregate([
    {
        '$search': {
            'index': 'date-number-fields-tutorial',
            'queryString': {
                'defaultPath': 'propertyType',
                'query': 'propertyType: House OR accommodatesNumber: 2 OR lastScrapedDate: 2019 OR maximumNumberOfNights: 30'
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
