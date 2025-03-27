import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [
    {
        '$search': {
            'index': 'geo-json-tutorial',
            'compound': {
                'must': [
                    {
                        'geoWithin': {
                            'geometry': {
                                'type': 'Polygon', 
                                'coordinates': [
                                    [
                                        [
                                            -161.323242, 22.512557
                                        ], [
                                            -152.446289, 22.065278
                                        ], [
                                            -156.09375, 17.811456
                                        ], [
                                            -161.323242, 22.512557
                                        ]
                                    ]
                                ]
                            }, 
                            'path': 'address.location'
                        }
                    }
                ], 
                'should': [
                    {
                        'text': {
                            'path': 'property_type', 
                            'query': 'Condominium'
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
            'name': 1, 
            'address': 1, 
            'property_type': 1, 
            'score': {
                '$meta': 'searchScore'
            }
        }
    }
]
# run pipeline
result = client["sample_airbnb"]["listingsAndReviews"].aggregate(pipeline)

# print results
for i in result:
    print(i)
