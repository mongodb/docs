# run-geo-box-metadata-query.py

# establish connection and set namespace
import pymongo

client = pymongo.MongoClient("<connection-string>")
database = client["sample_airbnb"]
collection = database["listingsAndReviews"]

# define query
query = [
  {
    "$searchMeta": {
      "facet": {
        "operator": {
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
        },
        "facets": {
          "propertyTypeFacet": {
            "type": "string",
            "path": "property_type"
          }
        }
      }
    }
  }
]

# run query and print results
results = collection.aggregate(query)
for document in results:
    print(document)
