import pymongo
from datetime import datetime

# connect to your cluster
client = pymongo.MongoClient("<connection-string>")

# define pipeline
pipeline = [
  {
    "$vectorSearch": {
      "index": "autoembed_index",
      "path": "reviews.comments",
      "filter": {
        "reviews.date": { "$gte": datetime(2010, 1, 1) }
      },
      "parentFilter": {
        "address.country": { "$in": ["United States"] },
        "bedrooms": { "$gte": 2,  "$lte": 3 }, 
        "property_type": { "$in": ["Apartment", "House"] }
      },
      "query": {
        "text": "great location close to everything"
      },
      "numCandidates": 100,
      "limit": 5,
      "nestedOptions": {
        "scoreMode": "avg"
      }
    }
  },
  {
    "$project": {
      "_id": 0,
      "name": 1,
      "address": 1,
      "neighborhood_overview": 1,
      "bedrooms": 1,
      "property_type": 1,
      "reviews.comments": 1,
      "score": { "$meta": "vectorSearchScore" }
    }
  }
]

# run pipeline
result = client["sample_airbnb"]["listingsAndReviews"].aggregate(pipeline)

# print results
for i in result:
    print(i)
 