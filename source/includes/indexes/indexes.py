# start-index-single
movies.create_index("title")
# end-index-single

# start-index-single-query
query = { "title": "Batman" }
sort = [("title", 1)]

cursor = movies.find(query).sort(sort)
# end-index-single-query

# start-compound-index
movies.create_index([("type", pymongo.ASCENDING), ("genre", pymongo.ASCENDING)])
# end-compound-index

# start-index-compound-query
query = { "type": "movie", "genre": "Drama" }
sort = [("type", pymongo.ASCENDING), ("genre", pymongo.ASCENDING)]

cursor = movies.find(query).sort(sort)
# end-index-compound-query

# start-index-multikey
result = movies.create_index("cast")
# end-index-multikey

# start-index-multikey-query
query = { "cast": "Viola Davis" }

cursor = movies.find(query)
# end-index-multikey-query

# start-index-text-single
movies.create_index(
    [( "plot", "text" )]
)
# end-index-text-single

# start-index-text-single-query
query = { "$text": { "$search": "a time-traveling DeLorean" } }

cursor = movies.find(query)
# end-index-text-single-query

# start-index-text-multi
result = myColl.create_index(
    [("title", "text"), ("genre", "text")],
    default_language="english",
    weights={ "title": 10, "genre": 3 }
)
# end-index-text-multi

# start-index-geo
theaters.create_index(
    [( "location.geo", "2dsphere" )]
)
# end-index-geo

# start-index-wildcard
movies.create_index({ "location.$**": pymongo.ASCENDING })
# end-index-wildcard

# start-index-unique
theaters.create_index("theaterId", unique=True)
# end-index-unique

# start-index-clustered
sample_mflix.create_collection("movies", clusteredIndex={
    "key": { "_id": 1 }, 
    "unique": True
})
# end-index-clustered

# start-remove-index
movies.drop_index("_title_")
# end-remove-index

# start-create-search-index
index = {
    "definition": {
        "mappings": {
            "dynamic": True
        }
    },
    "name": "<index name>",
}

collection.create_search_index(index)
# end-create-search-index

# start-create-vector-search-index

from pymongo.operations import SearchIndexModel

search_index_model = SearchIndexModel(
  definition={
    "fields": [
      {
        "type": "vector",
        "numDimensions": <number of dimensions>,
        "path": "<field to index>",
        "similarity":  "<select from euclidean, cosine, dotProduct>"
      }
    ]
  },
  name="<index name>",
  type="vectorSearch",
)

collection.create_search_index(model=search_index_model)

# end-create-vector-search-index

# start-create-search-indexes

search_idx = SearchIndexModel(
    definition ={
        "mappings": {
            "dynamic": True
        }
    },
    name="my_index",
)

vector_idx = SearchIndexModel(
  definition={
    "fields": [
      {
        "type": "vector",
        "numDimensions": <number of dimensions>,
        "path": "<field to index>",
        "similarity": "<select from euclidean, cosine, dotProduct>"
      }
    ]
  },
  name="my_vector_index",
  type="vectorSearch",
)

indexes = [search_idx, vector_idx]

collection.create_search_indexes(models=indexes)
# end-create-search-indexes

# start-list-search-indexes
results = list(collection.list_search_indexes())

for index in results:
    print(index)
# end-list-search-indexes

# start-update-search-indexes
new_index_definition = {
    "mappings": {
        "dynamic": False
    }
}

collection.update_search_index("my_index", new_index)
# end-update-search-indexes

# start-update-vector-search-indexes
new_index_definition = {
    "fields": [
        {
            "type": "vector",
            "numDimensions": 1536,
            "path": "<field to index>",
            "similarity": "euclidean"
        },
    ]
}

collection.update_search_index("my_vector_index", new_index_definition)
# end-update-vector-search-indexes

# start-delete-search-indexes
collection.drop_search_index("my_index")
# end-delete-search-indexes