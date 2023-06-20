val filter = Filters.eq("_id", 1)
val update = Updates.mul(PaintOrder::qty.name, 2)
collection.updateOne(filter, update)
