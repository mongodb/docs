# start-open-change-stream
database = client["sample_restaurants"]
collection = database["restaurants"]

async with await collection.watch() as stream:
    async for change in stream:
        print(change)
# end-open-change-stream

# start-update-for-change-stream
database = client["sample_restaurants"]
collection = database["restaurants"]

query_filter = { "name": "Blarney Castle" }
update_operation = { '$set' : 
    { "cuisine": "Irish" }
}

result = await collection.update_one(query_filter, update_operation)
# end-update-for-change-stream

# start-change-stream-pipeline

change_pipeline = { "$match": { "operationType": "update" }},

async with await collection.watch(pipeline=change_pipeline) as stream:
    async for change in stream:
        print(change)
# end-change-stream-pipeline

# start-change-stream-post-image
database = client["sample_restaurants"]
collection = database["restaurants"]

async with await collection.watch(full_document='updateLookup') as stream:
    async for change in stream:
        print(change)
# end-change-stream-post-image