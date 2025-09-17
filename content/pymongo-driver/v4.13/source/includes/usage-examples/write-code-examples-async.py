# start-insert-one
result = await collection.insert_one({ "<field name>" : "<value>" })

print(result.acknowledged)
# end-insert-one

# start-insert-multiple
document_list = [
   { "<field name>" : "<value>" },
   { "<field name>" : "<value>" }
]

result = await collection.insert_many(document_list)

print(result.acknowledged)
# end-insert-multiple

# start-update-one
query_filter = { "<field to match>" : "<value to match>" }
update_operation = { "$set" : 
    { "<field name>" : "<value>" }
}
result = await collection.update_one(query_filter, update_operation)

print(result.modified_count)
# end-update-one

# start-update-multiple
query_filter = { "<field to match>" : "<value to match>" }
update_operation = { "$set" : 
    { "<field name>" : "<value>" }
}
result = await collection.update_many(query_filter, update_operation)

print(result.modified_count)
# end-update-multiple

# start-replace-one
query_filter = { "<field to match>" : "<value to match>" }
replace_document = { "<new document field name>" : "<new document value>" }

result = await collection.replace_one(query_filter, replace_document)

print(result.modified_count)
# end-replace-one

# start-delete-one
query_filter = { "<field to match>" : "<value to match>" }

result = await collection.delete_one(query_filter)

print(result.deleted_count)
# end-delete-one

# start-delete-multiple
query_filter = { "<field to match>" : "<value to match>" }

result = await collection.delete_many(query_filter)

print(result.deleted_count)
# end-delete-multiple

# start-bulk-write
operations = [
    pymongo.InsertOne(
        {
            "<field name>" : "<value>"
        }
    ),
    pymongo.UpdateMany(
        { "<field to match>" : "<value to match>" },
        { "$set" : { "<field name>" : "<value>" }},
    ),
    pymongo.DeleteOne(
        { "<field to match>" : "<value to match>" }
    ),
]

result = await collection.bulk_write(operations)

print(result)
# end-bulk-write