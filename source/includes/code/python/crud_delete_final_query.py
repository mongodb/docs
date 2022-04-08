from pymongo import MongoClient

# Replace the uri string with your MongoDB deployment's connection string.
uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority"

client = MongoClient(uri)

# database and collection code goes here
db = client.sample_guides
coll = db.comets

# delete code goes here
doc = {
    "OrbitalPeriod": {
        "$gt": 5,
        "$lt": 85
    }
}
result = coll.delete_many(doc)

# amount deleted code goes here
print(result.deleted_count)

# Close the connection to MongoDB when you're done.
client.close()