val filter = Filters.eq("_id", 1)
val update = Updates.max(PaintOrder::qty.name, 8)
collection.updateOne(filter, update)
