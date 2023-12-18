val filter = Filters.eq("_id", 1)
val update = Updates.pullAll(PaintOrder::vendor.name, listOf(Vendor("A"), Vendor("M")))
collection.updateOne(filter, update)
