from pymongo.mongo_client import MongoClient

# Connect to your Atlas deployment
uri = "<connectionString>"
client = MongoClient(uri)

# Access your database and collection
database = client["<databaseName>"]
collection = database["<collectionName>"]

definition = {
  "fields": [
    {
      "type": "vector",
      "numDimensions": <numberofDimensions>,
      "path": "<fieldToIndex>",
      "similarity": "euclidean | cosine | dotProduct",
      "quantization": " none | scalar | binary "
    },
    {
      "type": "filter",
      "path": "<fieldToIndex>"
    },
    ...
  ]
}
    
# Update your search index
collection.update_search_index("<indexName>", definition)