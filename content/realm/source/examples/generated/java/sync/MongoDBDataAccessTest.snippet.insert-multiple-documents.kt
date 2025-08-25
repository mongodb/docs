val plants = listOf(
    Plant(
        ObjectId(),
        "rhubarb",
        "full",
        "red",
        "perennial",
        "Store 47"
    ),
    Plant(
        ObjectId(),
        "wisteria lilac",
        "partial",
        "purple",
        "perennial",
        "Store 42"
    ),
    Plant(
        ObjectId(),
        "daffodil",
        "full",
        "yellow",
        "perennial",
        "Store 42"
    )
)
mongoCollection.insertMany(plants).getAsync { task ->
    if (task.isSuccess) {
        val insertedCount = task.get().insertedIds.size
        Log.v(
            "EXAMPLE",
            "successfully inserted $insertedCount documents into the collection."
        )
    } else {
        Log.e("EXAMPLE", "failed to insert documents with: ${task.error}")
    }
}
