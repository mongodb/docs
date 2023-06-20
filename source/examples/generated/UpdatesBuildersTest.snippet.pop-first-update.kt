val filter = Filters.eq("_id", 1)
val update = Updates.popFirst(PaintOrder::vendor.name)
collection.updateOne(filter, update)
