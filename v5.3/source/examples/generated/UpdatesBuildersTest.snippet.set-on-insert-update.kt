val filter = Filters.eq("_id", 1)
val update = Updates.setOnInsert(PaintOrder::color.name, "pink")
collection.updateOne(filter, update, UpdateOptions().upsert(true))
