val queryFilter = Document("_partition", "Store 47")
val updateDocument = Document("\$set", Document("_partition", "Store 51"))
mongoCollection.updateMany(queryFilter, updateDocument).getAsync { task ->
    if (task.isSuccess) {
        val count = task.get().modifiedCount
        if (count != 0L) {
            Log.v("EXAMPLE", "successfully updated $count documents.")
        } else {
            Log.v("EXAMPLE", "did not update any documents.")
        }
    } else {
        Log.e("EXAMPLE", "failed to update documents with: ${task.error}")
    }
}
