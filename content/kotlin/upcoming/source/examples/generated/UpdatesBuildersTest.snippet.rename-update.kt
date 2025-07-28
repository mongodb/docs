val filter = Filters.eq("_id", 1)
val update = Updates.rename(PaintOrder::qty.name, "quantity")
collection.updateOne(filter, update)
