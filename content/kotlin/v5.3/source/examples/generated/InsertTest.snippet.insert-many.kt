val paintOrders = listOf(
    PaintOrder(ObjectId(), 5, "red"),
    PaintOrder(ObjectId(), 10, "purple")
)
val result = collection.insertMany(paintOrders)

println("Inserted documents with the following ids: ${result.insertedIds.toList()}")
