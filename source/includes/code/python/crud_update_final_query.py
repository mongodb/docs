from pymongo import MongoClient

# Replace the uri string with your MongoDB deployment's connection string.
uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority"

client = MongoClient(uri)

# database and collection code goes here
db = client.sample_guides
coll = db.comets

# update code goes here
doc = {"$mul": {"Radius": 1.60934}}
result = coll.update_many({}, doc)

# amount updated code goes here
print(result.modified_count)

# Close the connection to MongoDB when you're done.
client.close()
