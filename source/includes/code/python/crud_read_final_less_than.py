from pymongo import MongoClient

# Replace the uri string with your MongoDB deployment's connection string.
uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority"

client = MongoClient(uri)
coll = client.sample_guides.planets

# find code goes here
cursor = coll.find({"surfaceTemperatureC.mean": {"$lt": 15}})

for doc in cursor:
    print(doc)

# Close the connection to MongoDB when you're done.
client.close()
