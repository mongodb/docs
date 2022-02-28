from pymongo import MongoClient

# Replace the uri string with your MongoDB deployment's connection string.
uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority"

client = MongoClient(uri)

# database and collection code goes here
db = client.sample_guides
coll = db.planets
# find code goes here
cursor = coll.find()
# iterate code goes here
for doc in cursor:
    print(doc)

# Close the connection to MongoDB when you're done.
client.close()
