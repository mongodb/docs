val filter = Filters.eq("_id", 1)
val update = Updates.combine(
    Updates.set(PaintOrder::color.name, "purple"),
    Updates.inc(PaintOrder::qty.name, 6),
    Updates.push(PaintOrder::vendor.name, "R")
)
collection.updateOne(filter, update)
