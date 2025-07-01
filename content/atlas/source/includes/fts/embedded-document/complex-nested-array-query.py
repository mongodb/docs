import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [
    {
        '$search': {
            'index': 'embedded-documents-tutorial',
            'embeddedDocument': {
                'path': 'clubs.sports', 
                'operator': {
                    'queryString': {
                        'defaultPath': 'clubs.sports.club_name', 
                        'query': 'dodgeball OR frisbee'
                    }
                }
            }
        }
    }, {
        '$project': {
            '_id': 1, 
            'name': 1, 
            'clubs.sports': 1, 
            'score': {
                '$meta': 'searchScore'
            }
        }
    }
]

# run pipeline
result = client['local_school_district']['schools'].aggregate(pipeline)

# print results
for i in result:
    print(i)
