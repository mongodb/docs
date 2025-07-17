# start-single-field
result = collection.create_index("<field name>")

print(f'Index created: {result}')
# end-single-field

# start-compound
result = collection.create_index([
    ("<field name one>", pymongo.ASCENDING),
    ("<field name two>", pymongo.ASCENDING)
])

print(f"Index created: {result}")
# end-compound

# start-multikey
result = collection.create_index("<array field name>")


print(f'Index created: {result}')
# end-multikey

# start-search-create
index = {
    "definition": {
        "mappings": {
            "dynamic": True
        }
    },
    "name": "<index name>",
}

collection.create_search_index(index)
# end-search-create

# start-search-list
results = list(collection.list_search_indexes())

print('Existing search indexes:\n')
for index in results:
    print(index)
# end-search-list

# start-search-update
new_index = {
    "definition": {
        "mappings": {
            "dynamic": True
        }
    },
    "name": "<index name>",
}

collection.update_search_index("<name of index to update>", new_index)

print(f"Search index updated: {result}")
# end-search-update

# start-search-drop
collection.drop_index("<index name>")

print(f"Search index deleted: {result}")
# end-search-drop

# start-text
result = collection.create_index(
    [( "<field name>", "text")],
    default_language="english",
    weights={ "<field name>": 10 }
)
   
print(f"Index created: {result}")
# end-text

# start-geo
result = collection.create_index([("<GeoJSON object field>", "2dsphere")])

print(f'Index created: {result}')
# end-geo

# start-unique
result = collection.create_index("<field name>", unique=True)

print(f"Index created: {result}")
# end-unique

# start-wildcard
result = collection.create_index({"$**": pymongo.ASCENDING})

print(f'Index created: {result}')
# end-wildcard

# start-clustered
collection = database.create_collection("<collection name>", clusteredIndex={
    "key": {"_id": 1}, 
    "unique": True
})
# end-clustered

# start-remove
collection.drop_index("<index_name>")
# end-remove