import pymongo

mongo_client = pymongo.MongoClient("<CONNECTION-STRING>")
# Insert documents into a new database and collection
db = mongo_client["<DATABASE-NAME>"]
collection_name = "<COLLECTION-NAME>"
db.create_collection(collection_name)
collection = db[collection_name]

collection.insert_many(documents)