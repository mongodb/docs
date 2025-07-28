val filter = Filters.eq("_id", 1)
val update = Updates.set(PaintOrder::qty.name, 11)
collection.updateOne(filter, update)
