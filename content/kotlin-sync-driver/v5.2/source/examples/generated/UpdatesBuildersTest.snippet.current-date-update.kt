val filter = Filters.eq("_id", 1)
val update = Updates.currentDate(PaintOrder::lastModified.name)
collection.updateOne(filter, update)
