val options = BulkWriteOptions().ordered(false)
val unorderedUpdate = collection.bulkWrite(bulkOperations, options)
