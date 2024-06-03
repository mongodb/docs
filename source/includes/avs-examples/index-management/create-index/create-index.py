import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.operations import SearchIndexModel

# Connect to your Atlas deployment
uri = "<connectionString>"
client = MongoClient(uri)

# Access your database and collection
database = client["<databaseName>"]
collection = database["<collectionName>"]

# Create your index model, then create the search index
search_index_model = SearchIndexModel(
  definition={
    "fields": [
      {
        "type": "vector",
        "numDimensions": <numberofDimensions>,
        "path": "<fieldToIndex>",
        "similarity": "euclidean | cosine | dotProduct"
      },
      {
        "type": "filter",
        "path": "<fieldToIndex>"
      },
      ...
    ]
  },
  name="<index name>",
  type="vectorSearch",
)

result = collection.create_search_index(model=search_index_model)
print(result)