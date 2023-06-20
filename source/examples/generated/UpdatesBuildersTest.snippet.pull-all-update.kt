val filter = Filters.eq("_id", 1)
val update = Updates.pullAll(PaintOrder::vendor.name, listOf("A", "M"))
collection.updateOne(filter, update)
