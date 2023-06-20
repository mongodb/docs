// Create a new instance of the collection with the flexible `Document` type
// to allow for the changing of the `lastModified` field to a `BsonTimestamp`
// from a `Date`.
val collection = database.getCollection<Document>("paint_orders")

val filter = Filters.eq("_id", 1)
val update = Updates.currentTimestamp(PaintOrder::lastModified.name)
collection.updateOne(filter, update)
