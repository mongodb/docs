from pymongo import MongoClient

# Connect to your Atlas cluster
client = MongoClient("mongodb+srv://<username>:<password>@<cluster-url>/sample_mflix")
db = client.sample_mflix

# Create a MongoDB Search index on the objectId field
r = db.command({
    "createSearchIndexes": "comments",
    "indexes": [{
        "name": "objectid_index",
        "definition": {
            "mappings": {
                "dynamic": False,
                "fields": {
                    "movie_id": {
                        "type": "objectId"
                    }
                }
            }
        }
    }]
})

print(r)
