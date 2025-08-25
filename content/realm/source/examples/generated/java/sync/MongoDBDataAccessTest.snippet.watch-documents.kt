val watcher = mongoCollection.watchAsync()
watcher[{ result ->
    if (result.isSuccess) {
        Log.v("EXAMPLE", "Event type: ${result.get().operationType} full document: ${result.get().fullDocument}")
    } else {
        Log.e("EXAMPLE", "failed to subscribe to changes in the collection with : ${result.error}")
    }
}]
val triffid =
    Plant(
        ObjectId(),
        "triffid",
        "low",
        "green",
        "perennial",
        "Store 47"
    )
mongoCollection.insertOne(triffid).getAsync { task ->
    if (task.isSuccess) {
        val insertedId = task.get().insertedId.asObjectId()
        Log.v("EXAMPLE", "successfully inserted a document with id $insertedId")
    } else {
        Log.e("EXAMPLE", "failed to insert document with: ${task.error}")
    }
}
