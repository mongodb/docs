val paintOrder = PaintOrder(ObjectId(), 5, "red")
val result = collection.insertOne(paintOrder)

val insertedId = result.insertedId?.asObjectId()?.value

println("Inserted a document with the following id: $insertedId")
