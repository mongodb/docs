val watcher = mongoCollection
    .watchWithFilterAsync(Document("fullDocument._partition", "Store 42"))
watcher[{ result ->
    if (result.isSuccess) {
        Log.v("EXAMPLE", "Event type: ${result.get().operationType} full document: ${result.get().fullDocument}")
    } else {
        Log.e("EXAMPLE", "failed to subscribe to filtered changes in the collection with : ${result.error}")
    }
}]
val plants = listOf(
    Plant(
        ObjectId(),
        "triffid",
        "low",
        "green",
        "perennial",
        "Store 47"
    ),
    Plant(
        ObjectId(),
        "venomous tentacula",
        "low",
        "brown",
        "annual",
        "Store 42"
    )
)
mongoCollection.insertMany(plants).getAsync { task ->
    if (task.isSuccess) {
        val insertedCount = task.get().insertedIds.size
        Log.v("EXAMPLE", "successfully inserted $insertedCount documents into the collection.")
    } else {
        Log.e("EXAMPLE", "failed to insert documents with: ${task.error}")
    }
}
