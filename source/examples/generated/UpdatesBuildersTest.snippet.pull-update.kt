val filter = Filters.eq("_id", 1)
val update = Updates.pull(PaintOrder::vendor.name, "D")
collection.updateOne(filter, update)
