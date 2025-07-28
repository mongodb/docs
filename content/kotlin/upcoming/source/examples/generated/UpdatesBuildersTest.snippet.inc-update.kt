val filter = Filters.eq("_id", 1)
val update = Updates.inc(PaintOrder::qty.name, 3)
collection.updateOne(filter, update)
