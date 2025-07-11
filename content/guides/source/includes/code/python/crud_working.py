"""
This is a working file to test various code samples.
Do not include this file in blocks shown to users.
"""
from pymongo import MongoClient

# Replace the uri string with your MongoDB deployment's connection string.
# uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority"
uri = "mongodb+srv://foo:bar@cluster0.7stmv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

client = MongoClient(uri)
coll = client.sample_guides.planets

# find code goes here
# cursor = coll.find(
#     {"surfaceTemperatureC.mean": {"$lt": 15}, "surfaceTemperatureC.min": {"$gt": -100}}
# )
# cursor = coll.find(
#     {"$or": [{"orderFromSun": {"$gt": 7}}, {"orderFromSun": {"$lt": 2}}]}
# )
# cursor = coll.find(
#     {"$and": [{"orderFromSun": {"$gt": 2}}, {"orderFromSun": {"$lt": 5}}]}
# )
# cursor = coll.find({"orderFromSun": {"$gt": 2}, "orderFromSun": {"$lt": 5}})
cursor = coll.find(
    {
        "$or": [
            {"orderFromSun": {"$gt": 7}},
            {"orderFromSun": {"$lt": 2}},
        ]
    }
)
for doc in cursor:
    print(doc)

# Close the connection to MongoDB when you're done.
client.close()
