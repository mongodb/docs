# start-find-one
results = collection.find_one({ "<field name>" : "<value>" })

print(results)
# end-find-one
# start-find
results = collection.find({ "<field name>" : "<value>" })

for document in results:
    print(document)
# end-find
# start-count-all
count = collection.count_documents()

print(count)
#end-count-all
# start-count-query
count = collection.count_documents({ "<field name>": "<value>" })

print(count)
# end-count-query

# start-estimated-count
count = collection.estimated_document_count()

print(count)
# end-estimated-count
# start-distinct
results = collection.distinct("<field name>")

for document in results:
    print(document)
# end-distinct