val options = BulkWriteOptions().ordered(false)
val unorderedResult = collection.bulkWrite(bulkOperations, options)
