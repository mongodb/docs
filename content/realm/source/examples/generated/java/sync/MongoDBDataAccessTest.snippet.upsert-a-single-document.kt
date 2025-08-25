val queryFilter = Document("sunlight", "full")
    .append("type", "perennial")
    .append("color", "green")
    .append("_partition", "Store 47")
val updateDocument = Document("\$set", Document("name", "sweet basil"))
val updateOptions = UpdateOptions().upsert(true)
mongoCollection.updateOne(queryFilter, updateDocument, updateOptions)
    .getAsync { task ->
        if (task.isSuccess) {
            if (task.get().upsertedId != null) {
                Log.v("EXAMPLE", "successfully upserted a document with id ${task.get().upsertedId}")
            } else {
                Log.v("EXAMPLE", "successfully updated a document.")
            }
        } else {
            Log.e("EXAMPLE", "failed to update or insert document with: ${task.error}")
        }
    }
