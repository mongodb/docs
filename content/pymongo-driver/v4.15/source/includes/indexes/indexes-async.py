# start-index-single
await movies.create_index("title")
# end-index-single

# start-index-single-collation
from pymongo.collation import Collation

await movies.create_index("title", collation=Collation(locale='fr_CA'))
# end-index-single-collation

# start-compound-index
await movies.create_index([("type", pymongo.ASCENDING), ("genre", pymongo.ASCENDING)])
# end-compound-index

# start-compound-index-collation
from pymongo.collation import Collation

await movies.create_index([("type", pymongo.ASCENDING), ("genre", pymongo.ASCENDING)],
                    collation=Collation(locale='fr_CA'))
# end-compound-index-collation

# start-index-multikey
result = await movies.create_index("cast")
# end-index-multikey

# start-index-multikey-collation
from pymongo.collation import Collation

result = await movies.create_index("cast", collation=Collation(locale='fr_CA'))
# end-index-multikey-collation

# start-index-text-single
await movies.create_index(
    [( "plot", "text" )]
)
# end-index-text-single

# start-index-text-single-collation
from pymongo.collation import Collation

await movies.create_index(
    [( "plot", "text" )],
    collation=Collation(locale='fr_CA')
)
# end-index-text-single-collation

# start-index-text-multi
from pymongo.collation import Collation

result = await myColl.create_index(
    [("title", "text"), ("genre", "text")],
    default_language="english",
    weights={ "title": 10, "genre": 3 },
    collation=Collation(locale='fr_CA')
)
# end-index-text-multi

# start-index-geo
await theaters.create_index(
    [( "location.geo", "2dsphere" )]
)
# end-index-geo

# start-index-geo-collation
from pymongo.collation import Collation

await theaters.create_index(
    [( "location.geo", "2dsphere" )],
    collation=Collation(locale='fr_CA'))
# end-index-geo-collation

# start-index-wildcard
await movies.create_index({ "location.$**": pymongo.ASCENDING })
# end-index-wildcard

# start-index-wildcard-collation
await movies.create_index({ "location.$**": pymongo.ASCENDING },
                    collation=Collation(locale='fr_CA'))
# end-index-wildcard-collation

# start-index-unique
await theaters.create_index("theaterId", unique=True)
# end-index-unique

# start-index-unique-collation
await theaters.create_index("theaterId", unique=True, collation=Collation(locale='fr_CA'))
# end-index-unique-collation

# start-index-clustered
await sample_mflix.create_collection("movies", clusteredIndex={
    "key": { "_id": 1 }, 
    "unique": True
})
# end-index-clustered

# start-remove-index
await movies.drop_index("_title_")
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

await collection.create_search_index(index)
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

await collection.create_search_index(model=search_index_model)
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

await collection.create_search_indexes(models=indexes)
# end-create-search-indexes

# start-list-search-indexes
results = await (await collection.list_search_indexes()).to_list()

async for index in results:
    print(index)
# end-list-search-indexes

# start-update-search-indexes
new_index_definition = {
    "mappings": {
        "dynamic": False
    }
}

await collection.update_search_index("my_index", new_index)
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

await collection.update_search_index("my_vector_index", new_index_definition)
# end-update-vector-search-indexes

# start-delete-search-indexes
await collection.drop_search_index("my_index")
# end-delete-search-indexes