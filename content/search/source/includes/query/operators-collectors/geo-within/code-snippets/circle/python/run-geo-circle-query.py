import pymongo
import dns.resolver

# connect to your Atlas cluster
client = pymongo.MongoClient("<connection-string>")

# define pipeline
pipeline = [
    {
        "$search": {
            "geoWithin": {
                "circle": {
                    "center": {
                        "type": "Point",
                        "coordinates": [-73.54, 45.54]
                    },
                    "radius": 1600
                },
                "path": "address.location"
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
