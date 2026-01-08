# start-find-one
results = await collection.find_one({ "<field name>" : "<value>" })

print(results)
# end-find-one
# start-find
results = collection.find({ "<field name>" : "<value>" })

async for document in results:
    print(document)
# end-find
# start-count-all
count = await collection.count_documents({})

print(count)
#end-count-all
# start-count-query
count = await collection.count_documents({ "<field name>": "<value>" })

print(count)
# end-count-query

# start-estimated-count
count = await collection.estimated_document_count()

print(count)
# end-estimated-count
# start-distinct
results = await collection.distinct("<field name>")

for document in results:
    print(document)
# end-distinct

# start-watch-for-changes
async with await collection.watch() as stream:
    async for change in stream:
        print(change)
# end-watch-for-changes