val queryFilter = Document("color", "green")
mongoCollection.deleteOne(queryFilter).getAsync { task ->
    if (task.isSuccess) {
        val count = task.get().deletedCount
        if (count == 1L) {
            Log.v("EXAMPLE", "successfully deleted a document.")
        } else {
            Log.v("EXAMPLE", "did not delete a document.")
        }
    } else {
        Log.e("EXAMPLE", "failed to delete document with: ${task.error}")
    }
}
