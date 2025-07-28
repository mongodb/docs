val filter = Filters.eq("_id", 1)
val update = Updates.push(PaintOrder::vendor.name, Vendor("Q"))
collection.updateOne(filter, update)
