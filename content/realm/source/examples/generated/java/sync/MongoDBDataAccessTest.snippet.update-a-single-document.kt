val queryFilter = Document("name", "petunia")
val updateDocument = Document("\$set", Document("sunlight", "partial"))
mongoCollection.updateOne(queryFilter, updateDocument).getAsync { task ->
    if (task.isSuccess) {
        val count = task.get().modifiedCount
        if (count == 1L) {
            Log.v("EXAMPLE", "successfully updated a document.")
        } else {
            Log.v("EXAMPLE", "did not update a document.")
        }
    } else {
        Log.e("EXAMPLE", "failed to update document with: ${task.error}")
    }
}
