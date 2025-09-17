from pymongo import MongoClient

# Connect to your Atlas cluster
client = MongoClient("mongodb+srv://<username>:<password>@<cluster-url>")
db = client.sample_mflix

# Create a MongoDB Search index on the objectId field
r = db.command({
    "createSearchIndexes": "<collectionName>",
    "indexes": [{
        "name": "<indexName>",
        "definition": {
            "mappings": {
                "dynamic": True | False,
                "fields": {
                    "<fieldName>": {
                        "type": "objectId"
                    }
                }
            }
        }
    }]
})

print(r)
