val filter = Filters.eq("_id", 1)
val update = Updates.unset(PaintOrder::qty.name)
collection.updateOne(filter, update)
