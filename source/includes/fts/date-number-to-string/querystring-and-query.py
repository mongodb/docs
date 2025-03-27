import pymongo
import dns

client = pymongo.MongoClient('<connection-string>')
result = client['sample_airbnb']['airbnb_mat_view'].aggregate([
    {
        '$search': {
            'index': 'date-number-fields-tutorial',
            'queryString': {
                'defaultPath': 'propertyType',
                'query': 'propertyType: (Apartment OR Condominium) AND accommodatesNumber: 4 AND lastScrapedDate: 2019'
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
