val filter = Filters.eq("_id", 1)
val update = Updates.addToSet(PaintOrder::vendor.name, Vendor("C"))
collection.updateOne(filter, update)
