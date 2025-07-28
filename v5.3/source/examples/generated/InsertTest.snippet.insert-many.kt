val paintOrders = listOf(
    PaintOrder(ObjectId(), 5, "red"),
    PaintOrder(ObjectId(), 10, "purple")
)
val result = collection.insertMany(paintOrders)

println("Inserted a document with the following ids: ${result.insertedIds.toList()}")
