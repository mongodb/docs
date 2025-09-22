val filter = Filters.eq("_id", 1)
val update = Updates.bitwiseOr(PaintOrder::qty.name, 10)
collection.updateOne(filter, update)
