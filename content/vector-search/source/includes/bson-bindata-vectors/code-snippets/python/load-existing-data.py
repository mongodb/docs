import pymongo  

# Connect to your MongoDB cluster
mongo_client = pymongo.MongoClient("<CONNECTION-STRING>")
db = mongo_client["<DATABASE-NAME>"]
collection = db["<COLLECTION-NAME>"]

# Filter to exclude null or empty summary fields
filter = { "<TEXT-FIELD-NAME>": {"$nin": [None, ""]} }

# Get a subset of documents in the collection
documents = collection.find(filter).limit(50)

# Initialize the count of updated documents
updated_doc_count = 0