import pymongo
import dns.resolver

# connect to your Atlas cluster
client = pymongo.MongoClient("<connection-string>")

# define pipeline
pipeline = [
    {
        "$search": {
            "geoWithin": {
                "path": "address.location",
                "box": {
                    "bottomLeft": {
                        "type": "Point",
                        "coordinates": [112.467, -55.050]
                    },
                    "topRight": {
                        "type": "Point",
                        "coordinates": [168.000, -9.133]
                    }
                }
            }
        }
    },
    {
        "$limit": 3
    },
    {
        "$project": {
            "_id": 0,
            "name": 1,
            "address": 1
        }
    }
]

# run pipeline
result = client.sample_airbnb.listingsAndReviews.aggregate(pipeline)

# print results
for i in result:
    print(i)
