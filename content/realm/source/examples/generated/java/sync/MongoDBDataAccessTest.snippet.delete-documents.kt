val queryFilter = Document("sunlight", "full").append("type", "annual")
mongoCollection.deleteMany(queryFilter).getAsync { task ->
    if (task.isSuccess) {
        val count = task.get().deletedCount
        if (count != 0L) {
            Log.v("EXAMPLE", "successfully deleted $count documents.")
        } else {
            Log.v("EXAMPLE", "did not delete any documents.")
        }
    } else {
        Log.e("EXAMPLE", "failed to delete documents with: ${task.error}")
    }
}
